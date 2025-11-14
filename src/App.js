import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import AddProduct from "./AddProduct";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from "./EditProduct";
import Navbar from "./Navbar";


function App() {

  const [products, setProduct] = useState([])

  const addProduct = (pro) => {
    setProduct([...products, { id: Date.now(), ...pro }])
  }

  const deleteProduct = (id)=> {
    setProduct(products.filter((p)=> p.id !== id))
  }

  const updateProduct = (id, updatedProduct) => {
    setProduct((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/:id" element={<ProductDetails deleteProduct={deleteProduct} products={products} />} />
          <Route path="/addProduct" element={<AddProduct addProduct={addProduct} />} />
          <Route path="/edit/:id" element={<EditProduct updateProduct={updateProduct} products={products} setProduct={setProduct} />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
