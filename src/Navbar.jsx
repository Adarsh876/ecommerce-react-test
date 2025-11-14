import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-md transition-all duration-500">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">E-commerce Store</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li><Link to="/" className="hover:text-gray-200 transition">Home</Link></li>
          <li><Link to="" className="hover:text-gray-200 transition">Products</Link></li>
          <li><Link to="" className="hover:text-gray-200 transition">About</Link></li>
          <li><Link to="" className="hover:text-gray-200 transition">Contact</Link></li>
        </ul>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <IoClose size={28} /> : <IoMdMenu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white overflow-hidden transition-all duration-500 ${
          open ? "max-h-60 py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 px-6 text-lg">
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="" className="hover:text-gray-200">Products</Link></li>
          <li><Link to="" className="hover:text-gray-200">About</Link></li>
          <li><Link to="" className="hover:text-gray-200">Contact</Link></li>
        </ul>
      </div>

    </nav>
  );
}

export default Navbar;
