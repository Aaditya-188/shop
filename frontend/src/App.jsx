import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { LoginContext } from "./Contexts/LoginContext";

function App() {
  const [data, setData] = useState("Shiv");

  useEffect(() => {
    console.log("User (LoginContext):", data);
  }, [data]);

  return (
    <div>
      <LoginContext.Provider value={{ data, setData }}>
        <NavBar />
        <main className="min-vh-100">
          <Outlet />
        </main>
        <Footer />
      </LoginContext.Provider>
    </div>
  );
}

export default App;
