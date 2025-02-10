import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Landing/Main";
import Login from "./Landing/Login";
import CustomerPage from "./Landing/CustomerPage"; // Import new Customer Page component
import "./App.css"; // Ensure styles are correctly imported

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer" element={<CustomerPage />} /> {/* ✅ Added CustomerPage route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
