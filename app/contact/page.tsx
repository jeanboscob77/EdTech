"use client";
import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    console.log("Contact Submission:");

    // Here you can send contactData to your API via axios.post
    alert("Message sent successfully!");
    setForm({ fullname: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Contact Us</h2>

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={form.fullname}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
