// insertImages.js
import fs from "fs";
import { db } from "./server.js";

// Load the JSON file (adjust the path as needed)
const products = JSON.parse(fs.readFileSync("./product.json", "utf-8"));

// Loop through each product and insert into PRODUCT_IMAGES
products.forEach((product) => {
  const productId = product.id;
  const imageUrl = product.img;

  if (productId && imageUrl) {
    const sql = "INSERT INTO PRODUCT_IMAGES (PRODUCT_ID, IMAGE_URL) VALUES (?, ?)";
    db.query(sql, [productId, imageUrl], (err, result) => {
      if (err) {
        console.error(`❌ Error inserting image for ID ${productId}: ${err.message}`);
      } else {
        console.log(`✅ Inserted image for ID ${productId}`);
      }
    });
  } else {
    console.warn(`⚠️ Skipped product with ID ${productId}: Missing image or ID.`);
  }
});

// Optional: Close DB when done after delay (to allow async inserts to finish)
setTimeout(() => {
  db.end((err) => {
    if (err) {
      console.error("❌ Error closing DB:", err.message);
    } else {
      console.log("✅ DB connection closed.");
    }
  });
}, 2000);
