import { useState } from "react";
import { Link } from "react-router-dom";

function Search({ products = [], GridList }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product?.PRODUCT_TITLE &&
      product.PRODUCT_TITLE.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="widget widget-search">
      <form
        className="search-wrapper mb-3"
        onSubmit={(e) => e.preventDefault()} // prevent page reload on submit
      >
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <i className="icofont-search-2"></i>
        </button>
      </form>

      {/* Show search results */}
      <div>
        {searchTerm &&
          filteredProducts.map((product) => (
            <Link key={product.PRODUCT_ID} to={`/shop/${product.PRODUCT_CATEGORY?.toLowerCase()}/${product.PRODUCT_ID}`}>
              <div className="d-flex gap-3 p-2">
                <div className="pro-thumb h-25">
                  <img
                    src={product.PRODUCT_IMAGE}
                    alt={product.PRODUCT_TITLE}
                    width={70}
                    className="flex-shrink-0"
                  />
                </div>

                <div className="product-content">
                  <p>{product.PRODUCT_TITLE}</p>
                  <h6>${product.PRODUCT_PRICE}</h6>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Search;
