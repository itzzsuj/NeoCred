import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Landing/Main";
import Login from "./Landing/Login";
import CustomerPage from "./Landing/CustomerPage"; // ✅ Customer List Page
import CustomerDashboard from "./Landing/CustomerDashboard";
import LoanEligibility from "./Landing/LoanEligibility"; // ✅ New Customer Dashboard
import "./App.css"; // Ensure styles are correctly imported

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer" element={<CustomerPage />} /> 
        <Route path="/dashboard/:customerId" element={<CustomerDashboard />} /> 
        <Route path="/loan-eligibility/:customerId" element={<LoanEligibility />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
