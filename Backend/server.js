import express, { json } from "express";
import cors from "cors";
import { createConnection } from "mysql2";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(json());

// ✅ MySQL Connection (with port 3307)
const db = createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3307, // 👈 important fix
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// Routes
import productRoute from "./controllers/product.controller.js";
import customerRoute from "./controllers/customer.controller.js";
import reviewRoute from "./controllers/review.controller.js";
import orderRoute from "./controllers/orders.controller.js";
import paymentRoute from "./controllers/payments.controller.js";
import authRoutes from "./controllers/auth.js";

// Register routes
app.use("/api/products", productRoute);
app.use("/api/customers", customerRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/auth", authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❗ Internal Error:", err);
  res.status(err.status || 500).send("Something went wrong");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// ✅ Export db for use in other files (like importProducts.js)
export { db };
