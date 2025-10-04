import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin";
import AdminLogin from "./Pages/AdminLogin";

export const backend_url = 'http://localhost:4000';
export const currency = '₹';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('admin-auth'));

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('admin-auth'));
    };

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/*" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
