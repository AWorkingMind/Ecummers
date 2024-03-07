import React from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Components/Admin/Admin";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route>
                <Route path="/" element={<Main/>} />
            </Route>
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/admin" element={<AdminDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
