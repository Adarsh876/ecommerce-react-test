import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProductDetails({ products, deleteProduct }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localProduct = products.find((p) => p.id === Number(id));

    if (localProduct) {
      setProduct(localProduct);
    } else {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id, products]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      deleteProduct(Number(id));
      toast.success("Product deleted (simulated)!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex">
        <div className="md:w-1/2 flex justify-center items-center bg-gray-100 p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h2>
          <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold text-blue-600">$ {product.price}</span>
          </div>

          <div className="flex space-x-3 mt-3">
            <button
              onClick={() => navigate(`/edit/${product.id}`)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 px-3 py-1 text-white rounded hover:bg-red-700 text-sm"
            >
              Delete
            </button>
          </div>

          <Link
            to="/"
            className="block mt-4 text-blue-500 hover:underline text-sm font-medium"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
