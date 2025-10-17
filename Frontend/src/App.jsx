import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from './context/CartContext';
import { UserProvider } from "./context/UserContext";

import { ProtectedRoute } from "./context/ProtectedRoute";
import { PublicRoute } from "./context/PublicRoute";

function App() {
  return (
    <>
    <UserProvider>
     <CartProvider>
     <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
          path="/login"
          element={
          <PublicRoute redirectTo="/profile">
          <Login />
          </PublicRoute>
          }
          />
          <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
          <Route path="/cart" element={<Cart />} />
          <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
          {/* <Route path="/pizza/p001" element={<Pizza />} /> reemplazampos este que esta hardcodeado el id */}
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Home /> */}
      {/* <Pizza /> */}
      {/* <Cart /> */}
      <Footer />
      </BrowserRouter>
      </CartProvider>
      </UserProvider>
    </>
  );
}
export default App;