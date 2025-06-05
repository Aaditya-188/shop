import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const title = <h2>Search Your One From Thousand of Products</h2>;
const desc = "We have the largest collection of products";

function Banner() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/products/`;
        const response = await axios.get(apiUrl);
        setProductsData(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function handleSearch(e) {
    const value = e.target.value;
    setSearchInput(value);

    const filtered = productsData.filter((product) =>
      product.PRODUCT_TITLE?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(filtered);
  }

  return (
    <div className="banner-section style-4">
      <div className="container">
        <div className="banner-content">
          {title}
          <form>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search your product"
              value={searchInput}
              onChange={handleSearch}
            />
            <button type="submit">
              <i className="icofont-search"></i>
            </button>
          </form>
          <p>{desc}</p>

          <ul className="lab-ul">
            {searchInput &&
              filteredProducts.map((product, index) => {
                const category = product.PRODUCT_CATEGORY?.toLowerCase();
                const id = product.PRODUCT_ID;
                const title = product.PRODUCT_TITLE;

                if (!category || !id || !title) return null;

                return (
                  <li key={index}>
                    <Link to={`/shop/${category}/${id}`}>{title}</Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Banner;
