'use client';
import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';

import { FaHome, FaInfoCircle, FaEnvelope, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state: RootState) => state.users.user);
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      // Redirect to login if no user
      router.push('/user/login');
    }
  }, [user, router])

  const handleClick = ()=>{
    user? router.push('/dashboard'):router.push('/user/login')
  }
  
  const handleClickMobile = ()=>{
    user? router.push('/dashboard'):router.push('/user/login')
     setMenuOpen(false)
  }
  
  
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
          <button className="flex items-center gap-1 hover:text-blue-600"
          onClick={handleClick}
          >
            <FaUser /> <span>Dashboard</span>
          </button>
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
          <Link href="/user/login" className="block py-2  border-b" onClick={() => setMenuOpen(false)}>
            <FaUser className="inline mr-2" /> User
          </Link>
                    <button 
                     className="block py-2" onClick={handleClickMobile}>
            <FaUser className="inline mr-2" /> Dashboard
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
