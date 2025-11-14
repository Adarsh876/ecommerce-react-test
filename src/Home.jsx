import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home({ products }) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setAllProducts([...response.data, ...products]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [products]);

  const handleDelete = (id) => {
    setAllProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    toast.success('Product deleted successfully')
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative">
        <h2 className="text-5xl font-lg mb-[50px]">Products</h2>

        <Link to={'/addProduct'}>
          <button
            className="fixed top-[100px] right-[10px] md:right-8 bg-red-700 px-4 py-2 text-white font-medium rounded-lg shadow-md hover:bg-green-800 transition duration-300"
          >
            + Add Product
          </button>
        </Link>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {allProducts.map((item) => (
            <div
              key={item.id}
              className="group p-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <Link to={`${item.id}`}>
                <img
                  alt=""
                  src={item.image}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
                <h3 className="mt-4 text-sm text-gray-700 line-clamp-2 h-10">
                  {item.title}
                </h3>
              </Link>
              <p className="text-lg font-medium text-gray-900">$ {item.price}</p>


              <div className="flex justify-between items-center mt-3">
                <div className="flex space-x-3 justify-center align-center">
                  <Link to={`${item.id}`}>
                    <button className="bg-green-700 px-3 py-1 text-white rounded hover:bg-green-800 text-sm">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 px-3 py-1 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
