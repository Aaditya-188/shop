import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { Link } from "react-router-dom";

function CartPage() {
  const { email } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart items on mount
  useEffect(() => {
    if (email) {
      const storedCart = JSON.parse(localStorage.getItem(email)) || [];
      setCartItems(storedCart);
    }
  }, [email]);

  // ✅ Calculate total price
  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.PRICE || 0) * (item.quantity || 1),
      0
    );
  };

  return (
    <div className="cart-page container py-5">
      <h2 className="mb-4">🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-warning">
          Your cart is empty. <Link to="/shop">Go shopping →</Link>
        </div>
      ) : (
        <>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Product</th>
                <th scope="col">Qty</th>
                <th scope="col">Price</th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.PRODUCT_ID}>
                  <td>
                    <img
                      src={item.IMAGE || "/images/default.jpg"}
                      alt={item.NAME}
                      width="80"
                      height="80"
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.NAME}</td>
                  <td>{item.quantity || 1}</td>
                  <td>${item.PRICE}</td>
                  <td>${(item.PRICE * (item.quantity || 1)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end mt-4">
            <h4>Total: ${getTotal().toFixed(2)}</h4>
            <button className="btn btn-success mt-2">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
