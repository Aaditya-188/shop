import express from "express";
import { db } from "../server.js";
const router = express.Router();

// GET all products
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      P.PRODUCT_ID,
      P.NAME,
      P.PRICE,
      P.CATEGORY,
      P.STOCK,
      P.RATINGS,
      PI.IMAGE_URL AS IMAGE
    FROM PRODUCTS P
    JOIN PRODUCT_IMAGES PI ON P.PRODUCT_ID = PI.PRODUCT_ID
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send("MySQL error: " + err);
    res.json(result);
  });
});

// GET popular products
router.get("/popular-products", async (req, res) => {
  const categories = ["shoes", "pants", "bags", "caps", "shirts"];
  const items = [];

  try {
    await Promise.all(
      categories.map(async (category) => {
        const [results] = await db.promise().query(
          `SELECT 
             P.PRODUCT_ID,
             P.NAME AS PRODUCT_TITLE,
             P.PRICE AS PRODUCT_PRICE,
             P.CATEGORY AS PRODUCT_CATEGORY,
             PI.IMAGE_URL AS PRODUCT_IMAGE
           FROM PRODUCTS P
           JOIN PRODUCT_IMAGES PI ON P.PRODUCT_ID = PI.PRODUCT_ID
           WHERE P.CATEGORY = ? LIMIT 2`,
          [category]
        );
        items.push(...results);
      })
    );
    res.status(200).json({ items, message: "Popular products retrieved" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
