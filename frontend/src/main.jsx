import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Swiper styles
import "swiper/css";

// Bootstrap CSS & JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// Fonts and Icons
import "./assets/css/icofont.min.css";
import "./assets/css/animate.css";
import "./assets/css/style.min.css";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages and Components
import { Home } from "./home/Home.jsx";
import Blog from "./blog/Blog.jsx";
import Shop from "./shop/Shop.jsx";
import SingleProduct from "./shop/SingleProduct.jsx";
import CartPage from "./shop/CartPage.jsx";
import Admin from "./admin/Admin.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import OrdersPage from "./orders/OrdersPage.jsx";
import About from "./about/About.jsx";
import Contact from "./contact/Contact.jsx";
import ErrorNotFound from "./not-found.jsx";
import PaymentCancel from "./paymentCancel.jsx";
import PaymentConfirmationPage from "./shop/PaymentConfirmationPage.jsx";

// Context & Auth
import AuthProvider from "./Contexts/AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },

      { path: "/shop", element: <Shop /> },
      { path: "/shop/:category", element: <Shop /> },
      {
        path: "/shop/:category/:id",
        element: (
          <PrivateRoute>
            <SingleProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/cart-page",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/shop/cart-page",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-confirmation",
        element: <PaymentConfirmationPage />,
      },
      {
        path: "/cancel",
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },

      { path: "/admin", element: <Admin /> },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> },

      { path: "/404", element: <ErrorNotFound /> },
      { path: "*", element: <ErrorNotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
