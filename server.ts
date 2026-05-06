import express from "express";
import { createServer as createViteServer } from "vite";
import Razorpay from "razorpay";
import path from "path";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

let razorpayClient: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (!razorpayClient) {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_id || !key_secret) {
      console.warn("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Payment creation will fail.");
    }
    // Will throw if missing, or we can just pass them and let Razorpay SDK throw later
    razorpayClient = new Razorpay({ 
      key_id: key_id || 'dummy_key', 
      key_secret: key_secret || 'dummy_secret' 
    });
  }
  return razorpayClient;
}

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  // Socket.IO logic
  const connectedUsers = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userData) => {
      connectedUsers.set(socket.id, { ...userData, id: socket.id });
      io.emit("users_update", Array.from(connectedUsers.values()));
    });

    socket.on("call_user", (data) => {
      // Mark caller as in call
      const caller = connectedUsers.get(socket.id);
      if (caller) {
        caller.inCall = true;
        connectedUsers.set(socket.id, caller);
        io.emit("users_update", Array.from(connectedUsers.values()));
      }

      io.to(data.userToCall).emit("incoming_call", {
        signal: data.signalData,
        from: data.from,
        name: data.name
      });
    });

    socket.on("answer_call", (data) => {
      // Mark receiver as in call
      const receiver = connectedUsers.get(socket.id);
      if (receiver) {
        receiver.inCall = true;
        connectedUsers.set(socket.id, receiver);
        io.emit("users_update", Array.from(connectedUsers.values()));
      }
      io.to(data.to).emit("call_accepted", data.signal);
    });

    socket.on("ice_candidate", (data) => {
      io.to(data.to).emit("ice_candidate", data.candidate);
    });

    socket.on("end_call", () => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        user.inCall = false;
        connectedUsers.set(socket.id, user);
        io.emit("users_update", Array.from(connectedUsers.values()));
      }
    });

    socket.on("disconnect", () => {
      connectedUsers.delete(socket.id);
      io.emit("users_update", Array.from(connectedUsers.values()));
      console.log("User disconnected:", socket.id);
    });
  });

  // Use JSON parser for all non-webhook routes
  app.use((req, res, next) => {
    if (req.originalUrl === '/api/webhook') {
      next();
    } else {
      express.json()(req, res, next);
    }
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/payments/history", (req, res) => {
    res.json([
      { id: '1', date: new Date().toISOString(), amount: 0, status: 'Active', plan: 'Free Plan' }
    ]);
  });

  app.post("/api/razorpay/subscribe", (req, res) => {
    res.json({ mock: true });
  });

  app.post("/api/cashfree/subscribe", (req, res) => {
    res.json({ mock: true });
  });

  app.post("/api/payments/cancel", (req, res) => {
    res.json({ success: true });
  });

  app.post("/api/create-razorpay-order", async (req, res) => {
    try {
      const { amount, currency = 'INR', receipt } = req.body;
      
      const key_id = process.env.RAZORPAY_KEY_ID;
      
      const rzp = getRazorpay();
      const options = {
        amount: amount * 100, // amount in smallest currency unit (paise)
        currency,
        receipt: receipt || `receipt_${Date.now()}`
      };
      
      const order = await rzp.orders.create(options);
      res.json({
        ...order,
        key_id // Send key_id to frontend
      });
    } catch (err: any) {
      console.error("Razorpay error:", err);
      const errorMsg = err?.error?.description || err?.description || err?.message || JSON.stringify(err);
      res.status(500).json({ error: errorMsg });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
