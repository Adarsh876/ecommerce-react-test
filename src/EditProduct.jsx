import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditProduct({ products, updateProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const existingProduct = products.find((p) => p.id === Number(id));

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (existingProduct) {
      setForm(existingProduct);
    } else {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          setForm(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error("Failed to load product details.");
        }
      };
      fetchProduct();
    }
  }, [existingProduct, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://fakestoreapi.com/products/${id}`, form);
      updateProduct(Number(id), form);
      toast.success("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
