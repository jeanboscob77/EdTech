'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaInfoCircle, FaEnvelope, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b-gray-300">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TrainingPortal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-gray-700">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600">
            <FaHome /> <span>Home</span>
          </Link>
          <Link href="/about" className="flex items-center gap-1 hover:text-blue-600">
            <FaInfoCircle /> <span>About</span>
          </Link>
          <Link href="/contact" className="flex items-center gap-1 hover:text-blue-600">
            <FaEnvelope /> <span>Contact</span>
          </Link>
          <Link href="/user/login" className="flex items-center gap-1 hover:text-blue-600">
            <FaUser /> <span>User</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700 bg-white">
          <Link href="/" className="block py-2 border-b" onClick={() => setMenuOpen(false)}>
            <FaHome className="inline mr-2" /> Home
          </Link>
          <Link href="/about" className="block py-2 border-b" onClick={() => setMenuOpen(false)}>
            <FaInfoCircle className="inline mr-2" /> About
          </Link>
          <Link href="/contact" className="block py-2 border-b" onClick={() => setMenuOpen(false)}>
            <FaEnvelope className="inline mr-2" /> Contact
          </Link>
          <Link href="/user" className="block py-2" onClick={() => setMenuOpen(false)}>
            <FaUser className="inline mr-2" /> User
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
