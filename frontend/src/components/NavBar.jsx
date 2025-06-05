import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { AuthContext } from "../Contexts/AuthProvider";

const NavBar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { email, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  // ✅ Update cart count based on localStorage
  useEffect(() => {
    const updateCartCount = () => {
      if (email) {
        const cartItems = JSON.parse(localStorage.getItem(email)) || [];
        const totalItems = cartItems.reduce(
          (acc, item) => acc + (item.quantity || 1),
          0
        );
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, [email]);

  // ✅ Handle sticky header
  useEffect(() => {
    const handleScroll = () => {
      setHeaderFixed(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""}`}>
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            {!email ? (
              <>
                <Link to="/sign-up" className="lab-btn me-3"><span>Create Account</span></Link>
                <Link to="/login"><span>Login</span></Link>
              </>
            ) : (
              <>
                <Link to="/orders" className="lab-btn me-3"><span>Orders</span></Link>
                <button onClick={handleLogout} className="btn btn-warning">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-search-acte">
              <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>

            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/shop">Shop</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>

              <div className="d-flex align-items-center gap-3">
                {email && (
                  <Link to="/cart-page" className="position-relative me-3">
                    <i className="icofont-cart-alt" style={{ fontSize: "20px" }}></i>
                    {cartCount > 0 && (
                      <span style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-10px",
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "12px",
                      }}>
                        {cartCount}
                      </span>
                    )}
                  </Link>
                )}

                {!email ? (
                  <>
                    <Link to="/sign-up" className="lab-btn me-2 d-none d-md-block">Create Account</Link>
                    <Link to="/login" className="d-none d-md-block">Login</Link>
                  </>
                ) : (
                  <>
                    <Link to="/orders" className="lab-btn me-2 d-none d-md-block">Orders</Link>
                    <button onClick={handleLogout} className="btn btn-warning d-none d-md-block">Logout</button>
                  </>
                )}
              </div>

              <div onClick={() => setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}>
                <span></span><span></span><span></span>
              </div>

              <div className="ellepsis-bar d-md-none" onClick={() => setSocialToggle(!socialToggle)}>
                <i className="icofont-info-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
