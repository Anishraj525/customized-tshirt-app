import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import "./App.css"   // ✅ IMPORTANT

import Header from "./Header"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import HomeScreen from "./screens/HomeScreen"
import CartScreen from "./screens/CartScreen"
import ProductScreen from "./screens/ProductScreen"
import CheckoutScreen from "./screens/CheckoutScreen"
import OrderSuccessScreen from "./screens/OrderSuccessScreen"

function App() {
  const location = useLocation()

  const authPages = ["/", "/login", "/register"]
  const hideHeader = authPages.includes(location.pathname)

  return (
    <div className="app">
      {!hideHeader && <Header />}

      <div className="page-content">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/order-success" element={<OrderSuccessScreen />} />
        </Routes>
      </div>
    </div>
  )
}

export default App