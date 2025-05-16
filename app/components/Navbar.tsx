"use client";
import Logo from "../../public/Logo.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import Link from "next/link";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.users.user);

  const router = useRouter();

  const handleUser = () => {
    user ? router.push("/user/dashboard") : router.push("/user/login");
  };

  const handleUserOnMobile = () => {
    user ? router.push("/user/dashboard") : router.push("/user/login");
    setMenuOpen(false);
  };

  console.log(user);

  return (
    <nav className="bg-white shadow-md border-b-gray-300">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          <Image
            src={Logo}
            alt="Logo"
            width={60}
            height={60}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>

        <div className="hidden md:flex space-x-6 items-center text-gray-700">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <FaHome /> <span>Home</span>
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <FaInfoCircle /> <span>About</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <FaEnvelope /> <span>Contact</span>
          </Link>
          <button
            onClick={handleUser}
            className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"
          >
            <FaUser /> <span>User</span>
          </button>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {/*mobile view */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700 bg-white">
          <Link
            href="/"
            className="block py-2 border-b"
            onClick={() => setMenuOpen(false)}
          >
            <FaHome className="inline mr-2" /> Home
          </Link>
          <Link
            href="/about"
            className="block py-2 border-b"
            onClick={() => setMenuOpen(false)}
          >
            <FaInfoCircle className="inline mr-2" /> About
          </Link>
          <Link
            href="/contact"
            className="block py-2 border-b"
            onClick={() => setMenuOpen(false)}
          >
            <FaEnvelope className="inline mr-2" /> Contact
          </Link>
          <button className="block py-2  border-b" onClick={handleUserOnMobile}>
            <FaUser className="inline mr-2" /> User
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
