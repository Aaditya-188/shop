import fs from "fs";
import { db } from "./server.js";

// Read both product files
const products1 = JSON.parse(fs.readFileSync("product.json", "utf8"));
const products2 = JSON.parse(fs.readFileSync("product2.json", "utf8"));
const allProducts = [...products1, ...products2];

// Insert all products
allProducts.forEach((product) => {
  const { id, category, name, seller, price, stock, ratings, images = [] } = product;

  db.beginTransaction((err) => {
    if (err) throw err;

    const sqlInsertProduct = `
      INSERT INTO PRODUCTS (PRODUCT_ID, CATEGORY, NAME, SELLER, PRICE, STOCK, RATINGS)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sqlInsertProduct,
      [id, category, name, seller, price, stock, ratings],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            console.warn(`⚠️ Skipped duplicate product ID ${id}: ${name}`);
            return db.rollback(() => {});
          }
          return db.rollback(() => console.error("❌ Product insert error:", err));
        }

        if (Array.isArray(images) && images.length > 0) {
          const imageSql = `INSERT INTO PRODUCT_IMAGES (PRODUCT_ID, IMAGE_URL) VALUES ?`;
          const imageValues = images.map((url) => [id, url]);

          db.query(imageSql, [imageValues], (err) => {
            if (err) {
              return db.rollback(() => console.error("❌ Image insert error:", err));
            }

            db.commit((err) => {
              if (err) return db.rollback(() => console.error("❌ Commit error:", err));
              console.log(`✅ Inserted with images: ${name}`);
            });
          });
        } else {
          db.commit((err) => {
            if (err) return db.rollback(() => console.error("❌ Commit error:", err));
            console.log(`✅ Inserted (no images): ${name}`);
          });
        }
      }
    );
  });
});
