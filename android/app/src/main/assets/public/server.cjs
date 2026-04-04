var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  getStripe: () => getStripe
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_vite = require("vite");
var import_stripe = __toESM(require("stripe"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var stripeClient = null;
function getStripe() {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY environment variable is required");
    }
    stripeClient = new import_stripe.default(key, {
      apiVersion: "2025-02-24.acacia"
    });
  }
  return stripeClient;
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use((req, res, next) => {
    if (req.originalUrl === "/api/webhook") {
      next();
    } else {
      import_express.default.json()(req, res, next);
    }
  });
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const stripe = getStripe();
      const { priceId, productName, amount } = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: productName || "Pro Subscription"
              },
              unit_amount: amount || 2e3
              // Amount in cents ($20.00)
            },
            quantity: 1
          }
        ],
        mode: "payment",
        success_url: `${process.env.APP_URL || `http://localhost:${PORT}`}/?success=true`,
        cancel_url: `${process.env.APP_URL || `http://localhost:${PORT}`}/?canceled=true`
      });
      res.json({ id: session.id, url: session.url });
    } catch (err) {
      console.error("Stripe error:", err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  });
  app.post("/api/webhook", import_express.default.raw({ type: "application/json" }), (request, response) => {
    const sig = request.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
      if (!endpointSecret) {
        throw new Error("STRIPE_WEBHOOK_SECRET is not set");
      }
      const stripe = getStripe();
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log("Payment successful for session:", session.id);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getStripe
});
