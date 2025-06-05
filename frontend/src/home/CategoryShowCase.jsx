import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const title = "Popular Products";

function CategoryShowCase() {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchPopularItems() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/popular-products`
        );
        setAllItems(res.data.items);
        setItems(res.data.items);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      }
    }

    fetchPopularItems();
  }, []);

  function filterItem(category) {
    const filtered = allItems.filter(
      (product) => product.PRODUCT_CATEGORY.toLowerCase() === category.toLowerCase()
    );
    setItems(filtered);
  }

  return (
    <div className="course-section style-3 padding-tb">
      <div className="course-shape one">
        <img src="/src/assets/images/shape-img/icon/01.png" alt="" />
      </div>
      <div className="course-shape two">
        <img src="/src/assets/images/shape-img/icon/02.png" alt="" />
      </div>

      <div className="container">
        <div className="section-header">
          <h2 className="title">{title}</h2>
          <div className="course-filter-group">
            <ul className="lab-ul">
              <li onClick={() => setItems(allItems)}>All</li>
              <li onClick={() => filterItem("Shoes")}>Shoes</li>
              <li onClick={() => filterItem("Bags")}>Bags</li>
              <li onClick={() => filterItem("Caps")}>Caps</li>
              <li onClick={() => filterItem("Pants")}>Pants</li>
              <li onClick={() => filterItem("Shirts")}>Shirts</li>
            </ul>
          </div>
        </div>

        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 course-filter">
            {items.map((product) => {
              const category = product.PRODUCT_CATEGORY?.toLowerCase() || "unknown";
              return (
                <div key={product.PRODUCT_ID} className="col">
                  <div className="course-item style-4">
                    <div className="course-inner">
                      <div className="course-thumb">
                        <img src={product.PRODUCT_IMAGE || "/images/default.jpg"} alt="" />
                        <div className="course-category">
                          <div className="course-cate">
                            <a href={`/shop/${category}`}>
                              {product.PRODUCT_CATEGORY || "Unknown"}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="course-content">
                        <Link to={`/shop/${category}/${product.PRODUCT_ID}`}>
                          <h6>{product.PRODUCT_TITLE || "Unnamed"}</h6>
                        </Link>
                        <div className="course-footer">
                          <div className="course-price">
                            ${product.PRODUCT_PRICE || 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryShowCase;
