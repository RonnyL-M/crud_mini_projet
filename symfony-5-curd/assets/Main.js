import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList"
import ProductCreate from "./pages/ProductCreate"
import ProductEdit from "./pages/ProductEdit"
import ProductShow from "./pages/ProductShow"
    
function Main() {
    return (
        <Router>
            <Routes>
                <Route exact path="/"  element={<ProductList/>} />
                <Route path="/create"  element={<ProductCreate/>} />
                <Route path="/edit/:id"  element={<ProductEdit/>} />
                <Route path="/product/:id"  element={<ProductShow/>} />
            </Routes>
        </Router>
    );
}
    
export default Main;
    
if (document.getElementById('app')) {
    const rootElement = document.getElementById("app");
    const root = createRoot(rootElement);
  
    root.render(
        
            <Main />
        
    );
}