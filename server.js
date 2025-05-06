import { createRequire } from "module";
const require = createRequire(import.meta.url);
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/user.js";
import cors from "cors";
import authRoutes from './authRoutes.js'; 

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/vacationary";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});



dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const coupon = await stripe.coupons.create({
  id: "FLY",
  percent_off: 10,
  duration: 'once',
});

const promotionCode = await stripe.promotionCodes.create({
  coupon: 'FLY',
  code: 'FLY10',
});

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable JSON body parsing

app.use(express.json());
app.use(cors())




// Serve static files from the React app
app.use(express.static(path.join(__dirname, "dist")));

// API routes
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Catch-all route to serve React app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//Checkout session route
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body; // Items should be sent from the frontend

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
             // Optional: Add a description for the product
             // e.g., "Flight to Paris"
          },
          unit_amount: item.price * 100, // Stripe expects the amount in cents
        },
        quantity: item.quantity,
      })),

    
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.post("/signin", (req, res) => {
  const {email, password} = req.body;
  User.findOne({email : email})
  .then(user => {
      if(user) {
          if(user.password === password){
              res.json("Success")
          }else{
              res.json("The password is incorrect")
          }
      }else{
          res.json("No record existed")
      }
  })
})

app.post("/signup", (req, res) => {
  User.create(req.body)
  .then(employees => res.json(employees))
  .catch(err => res.json(err))
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});