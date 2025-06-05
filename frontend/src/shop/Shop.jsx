import React, { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import PageHeader from "../components/PageHeader";
import ProductCards from "./ProductCards";
import Search from "./Search";
import ShopCategory from "./ShopCategory";
import Pagination from "./Pagination";
import categoriesData from "../categories.json";

import { AuthContext } from "../Contexts/AuthProvider";

function Shop() {
  const [GridList, setGridList] = useState(true);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { email } = useContext(AuthContext);
  const { category } = useParams();
  const navigate = useNavigate();

  const productsPerPage = 12;
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  const menuItems = ["Shoes", "Pants", "Bags", "Caps", "Shirts"];

  // ✅ Validate category from URL
  useEffect(() => {
    if (!category) return;

    const isValid = categoriesData.some(
      (cat) => cat.category.toUpperCase() === category.toUpperCase()
    );

    if (!isValid) {
      navigate("/404", { replace: true });
    }
  }, [category, navigate]);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/products/`;
        const response = await axios.get(apiUrl);
        setData(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ Filter products by category
  const filterItem = useCallback(
    (curCat) => {
      if (curCat === "All") {
        setSelectedCategory(curCat);
        setProducts(data);
        return;
      }

      const filtered = data.filter(
        (product) =>
          product.PRODUCT_CATEGORY &&
          curCat &&
          product.PRODUCT_CATEGORY.toLowerCase() === curCat.toLowerCase()
      );

      setSelectedCategory(curCat);
      setCurrentPage(1);
      setProducts(filtered);
    },
    [data]
  );

  // ✅ Apply URL category filter on load
  useEffect(() => {
    if (!category) {
      setSelectedCategory("All");
      setProducts(data);
      return;
    }

    const formatted =
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    setSelectedCategory(formatted);
    filterItem(formatted);
  }, [filterItem, category, data]);

  // ✅ Pagination handler
  const paginate = (pageNum) => setCurrentPage(pageNum);

  // ✅ Add to cart handler (with user-based key and quantity)
  const addToCart = (product) => {
    if (!email) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const cartKey = email;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingItemIndex = existingCart.findIndex(
      (item) => item.PRODUCT_ID === product.PRODUCT_ID
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    window.dispatchEvent(new Event("storage")); // 🔄 Trigger update for NavBar count
    alert(`${product.NAME} added to cart!`);
  };

  return (
    <div>
      <PageHeader title={"Our Shop Page"} currentPage={"Shop"} />

      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-12">
              <Search products={products} GridList={GridList} />
              <ShopCategory
                categories={menuItems}
                filterItem={filterItem}
                selectedCategory={selectedCategory}
              />
            </div>

            <div className="col-lg-12 col-12">
              <article>
                <div className="shop-title d-flex flex-wrap justify-content-between align-items-center mb-4">
                  <p>{`Showing ${products.length} results of ${data.length}`}</p>

                  <div className={`product-view-mode ${GridList ? "gridActive" : "listActive"}`}>
                    <button className="grid" onClick={() => setGridList(true)}>
                      <i className="icofont-ghost"></i>
                    </button>
                    <button className="list" onClick={() => setGridList(false)}>
                      <i className="icofont-listine-dots"></i>
                    </button>
                  </div>
                </div>

                <ProductCards
                  GridList={GridList}
                  products={currentProducts}
                  addToCart={addToCart}
                />

                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                  activePage={currentPage}
                />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
