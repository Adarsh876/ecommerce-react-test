import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddProduct({ addProduct }) {

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    addProduct({ title, price, category, description, image })
    setTitle('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImage('');
    toast.success('Product added successfully')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Add New Product
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Product
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-3 w-full border border-gray-400 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default AddProduct