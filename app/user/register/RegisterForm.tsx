"use client";
import Swal from "sweetalert2";
import { useState } from "react";
import { FiUser, FiMail, FiLock, FiCalendar } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
const Register = () => {
  const router = useRouter();

  const showSuccessMessage = () => {
    Swal.fire({
      title: "Success!",
      text: "You registered Successful.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleError = (msg: string) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: msg || "Something went wrong!",
      confirmButtonColor: "#d33",
    });
  };

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    setIsValid(emailRegex.test(value));
  };

  const handleConfirmPasswordChange = (e: any) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setMatch(password === newConfirmPassword);
  };

  const { firstname, lastname, dateOfBirth, email, password } = formData;
  const [message, setMessage] = useState("");

  const criteria = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[!@#$%^&*]/.test(password),
  };

  const isStrongPassword = Object.values(criteria).every(Boolean);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (
        firstname == "" ||
        lastname.trim() == "" ||
        dateOfBirth == "" ||
        email.trim() == "" ||
        password.trim() == "" ||
        confirmPassword.trim() == ""
      ) {
        setMessage("Please Fill out all fields!!!");
        return;
      } else if (password !== confirmPassword) {
        return;
      } else {
        const res = await axios.post(
          `http://localhost:3000/api/users`,
          formData
        );
        if (res.status == 200 || res.status == 201) {
          showSuccessMessage();
          router.push("/user/login");
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.msg) {
        handleError(error.response.data.msg);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-3">
      <form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="firstname"
            className="text-sm font-medium text-gray-700"
          >
            Firstname
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiUser className="text-gray-400 mr-2" />
            <input
              id="firstname"
              type="text"
              placeholder="Enter firstname..."
              className="flex-1 bg-transparent focus:outline-none text-gray-800"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="lastname"
            className="text-sm font-medium text-gray-700"
          >
            Lastname
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiUser className="text-gray-400 mr-2" />
            <input
              id="lastname"
              type="text"
              placeholder="Enter lastname..."
              className="flex-1 bg-transparent focus:outline-none text-gray-800"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="dob" className="text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiCalendar className="text-gray-400 mr-2" />
            <input
              id="dob"
              type="date"
              className="flex-1 bg-transparent focus:outline-none text-gray-800"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiMail className="text-gray-400 mr-2" />
            <input
              id="email"
              type="email"
              placeholder="Enter email..."
              className={`flex-1 bg-transparent focus:outline-none text-gray-800 ${
                isValid ? "border-gray-300" : "border-red-500"
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {!isValid && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email address.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="new-password"
            className="text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiLock className="text-gray-400 mr-2" />
            <input
              id="new-password"
              type="password"
              placeholder="Enter new password..."
              className="flex-1 bg-transparent focus:outline-none text-gray-800"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FiLock className="text-gray-400 mr-2" />
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              className="flex-1 bg-transparent focus:outline-none text-gray-800"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {!match && <p className="text-red-500">Passwords do not match</p>}
          </div>
        </div>

        <p className="text-sm mt-2">
          <span className={criteria.length ? "text-green-600" : "text-red-500"}>
            {criteria.length ? "✔" : "✖"} 8+ chars,
          </span>{" "}
          <span
            className={criteria.lowercase ? "text-green-600" : "text-red-500"}
          >
            {criteria.lowercase ? "✔" : "✖"} 1 lowercase,
          </span>{" "}
          <span
            className={criteria.uppercase ? "text-green-600" : "text-red-500"}
          >
            {criteria.uppercase ? "✔" : "✖"} 1 uppercase,
          </span>{" "}
          <span className={criteria.number ? "text-green-600" : "text-red-500"}>
            {criteria.number ? "✔" : "✖"} 1 number,
          </span>{" "}
          <span className={criteria.symbol ? "text-green-600" : "text-red-500"}>
            {criteria.symbol ? "✔" : "✖"} 1 special (!@#$%^&*)
          </span>
        </p>

        {password && (
          <p
            className={`mt-4 font-semibold ${
              isStrongPassword ? "text-green-600" : "text-red-500"
            }`}
          >
            {isStrongPassword
              ? "✅ Strong password"
              : "❌ Password is not strong"}
          </p>
        )}

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Register
          </button>
          <p className="text-red-400">{message}</p>
        </div>
      </form>
    </div>
  );
};

export default Register;
