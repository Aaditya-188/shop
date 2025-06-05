import React from "react";
import { Link } from "react-router-dom";

function ProductCards({ GridList, products, addToCart }) {
  function getCategoryName(category) {
    if (!category || typeof category !== "string") return "unknown";
    return category.charAt(0).toLowerCase() + category.slice(1);
  }

  return (
    <div>
      <div className={`shop-product-wrap row justify-content-left ${GridList ? "grid" : "list"}`}>
        {products.map((product) => (
          <div key={product.PRODUCT_ID} className="col-lg-4 col-md-6 col-12">
            <div className="product-item">
              <div className="product-thumb">
                <div className="pro-thumb">
                  <img
                    src={product.IMAGE || "/images/default.jpg"}
                    alt={product.NAME || "Product"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/default.jpg";
                    }}
                  />
                </div>

                <div className="product-action-link">
                  <Link
                    to={`/shop/${getCategoryName(product.CATEGORY)}/${product.PRODUCT_ID}`}
                    title="View Product"
                  >
                    <i className="icofont-eye"></i>
                  </Link>

                  <button
                    type="button"
                    title="Add to Cart"
                    onClick={() => addToCart(product)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <i className="icofont-cart-alt"></i>
                  </button>
                </div>
              </div>

              <div className="product-content">
                <h5>
                  <Link to={`/shop/${getCategoryName(product.CATEGORY)}/${product.PRODUCT_ID}`}>
                    {product.NAME || "Unknown Product"}
                  </Link>
                </h5>
                <p className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="icofont-star"></i>
                  ))}
                </p>
                <h6>${product.PRICE?.toFixed(2) || "0.00"}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCards;
