import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import axios from "axios";
import Modal from "./Modal";
import "./temp.css";

export default function SingleProductDisplay({ items, category }) {
  const {
    PRODUCT_ID: id,
    PRODUCT_TITLE: name,
    PRODUCT_IMAGE: img,
    PRODUCT_PRICE: price,
    ratingsCount,
  } = items[0];

  const colors = [...new Set(items.map((item) => item.COLOR))];
  const sizes = items.map((item) => item.SIZE);
  const [prequantity, setQuantity] = useState(0);
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");
  const [error, setError] = useState(0);
  const [desc, setDesc] = useState("");
  const { email } = useContext(AuthContext);

  useEffect(() => {
    setDesc(category);
  }, [category]);

  function hasSize(category) {
    return ["Shoes", "Pants", "Shirts"].includes(category);
  }

  function handleSizeChange(e) {
    setSize(e.target.value);
  }

  function handleColorChange(e) {
    setColor(e.target.value);
  }

  function handleDecrease() {
    if (prequantity > 1) setQuantity(prequantity - 1);
  }

  function handleIncrease() {
    setQuantity(prequantity + 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      color === "Select Color" ||
      parseInt(prequantity) === 0 ||
      (hasSize(category) && size === "Select Size")
    ) {
      alert("Please fill all fields");
      return;
    }

    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    const availableQty = res.data[0]?.QUANTITY ?? 0;

    if (prequantity > availableQty) {
      setError(1);
      return;
    }

    const product = {
      id,
      img,
      name,
      price,
      quantity: prequantity,
      ...(hasSize(category) ? { size } : {}),
      color,
      category,
    };

    const cartKey = email || "guest";
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingIndex = existingCart.findIndex(
      (item) =>
        item.id === id && item.color === color && item.size === product.size
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += prequantity;
    } else {
      existingCart.push(product);
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));

    setQuantity(0);
    setSize("Select Size");
    setColor("Select Color");
    setError(0);
  }

  return (
    <div>
      <h4>{name}</h4>
      <p className="rating">
        {[...Array(5)].map((_, i) => (
          <i key={i} className="icofont-star"></i>
        ))}
        <span>{ratingsCount}</span>
      </p>
      <h4>${price}</h4>
      <p>{desc}</p>

      <form onSubmit={handleSubmit}>
        {hasSize(category) && (
          <div className="select-product size">
            <select value={size} onChange={handleSizeChange}>
              <option>Select Size</option>
              {sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
        )}

        <div
          className={`select-product ${
            !hasSize(category) ? "select-product-full" : ""
          }`}
        >
          <select value={color} onChange={handleColorChange}>
            <option>Select Color</option>
            {colors.map((color) => (
              <option key={color}>{color}</option>
            ))}
          </select>
          <i className="icofont-rounded-down"></i>
        </div>

        <div className="cart-plus-minus">
          <div className="dec qtybutton" onClick={handleDecrease}>
            -
          </div>
          <input
            type="text"
            className="cart-plus-minus-box cart-plus-minus-box-2"
            name="qtybutton"
            value={prequantity}
            onChange={(e) => {
              const value = e.target.value;
              if (!/^\d*$/.test(value)) return;
              setQuantity(parseInt(value || 0));
            }}
          />
          <div className="inc qtybutton" onClick={handleIncrease}>
            +
          </div>
        </div>

        {error === 1 && <Modal setError={setError} />}

        <button type="submit" className="lab-btn">
          <span>Add to Cart</span>
        </button>
        <Link to="/cart-page" className="lab-btn bg-primary">
          <span>Check Out</span>
        </Link>
      </form>
    </div>
  );
}
