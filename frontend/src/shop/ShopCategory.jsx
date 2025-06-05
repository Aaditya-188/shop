import React from "react";
import { Link, useParams } from "react-router-dom";

function ShopCategory({ categories, selectedCategory }) {
  const { category } = useParams();
  const current = category
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : "All";

  return (
    <>
      <div className="widget-header">
        <h5 className="ms-2">All Categories</h5>
      </div>

      <div>
        <Link
          to="/shop"
          className={`btn m-2 ${
            current === "All" ? "bg-warning" : "btn-outline-secondary"
          }`}
        >
          All
        </Link>

        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/shop/${cat}`}
            className={`btn m-2 ${
              current === cat ? "bg-warning" : "btn-outline-secondary"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>
    </>
  );
}

export default ShopCategory;
