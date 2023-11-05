const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/",
    });

    return res.status(201).json(session);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen("4000", () => console.log("Server is running on port 4000"));
