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
      throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables are required');
    }
    razorpayClient = new Razorpay({ key_id, key_secret });
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

  app.post("/api/create-razorpay-order", async (req, res) => {
    try {
      const { amount, currency = 'INR', receipt } = req.body;
      
      const key_id = process.env.RAZORPAY_KEY_ID;
      const key_secret = process.env.RAZORPAY_KEY_SECRET;
      
      if (!key_id || !key_secret) {
        // Return mock order if keys are missing
        return res.json({
          id: `order_mock_${Date.now()}`,
          amount: amount * 100,
          currency,
          receipt: receipt || `receipt_${Date.now()}`,
          status: 'created',
          key_id: 'rzp_test_mock123',
          mock: true
        });
      }

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
      
      // If authentication fails (invalid keys), fallback to mock order
      if (typeof errorMsg === 'string' && (errorMsg.includes('Authentication failed') || errorMsg.includes('BAD_REQUEST_ERROR') || errorMsg.includes('invalid api key'))) {
        const { amount, currency = 'INR', receipt } = req.body;
        return res.json({
          id: `order_mock_${Date.now()}`,
          amount: amount * 100,
          currency,
          receipt: receipt || `receipt_${Date.now()}`,
          status: 'created',
          key_id: 'rzp_test_mock123',
          mock: true
        });
      }
      
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
