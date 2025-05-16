"use client";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
export default function CourseForm() {
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    duration: "",
    prerequisites: "",
    instructor: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`http://localhost:3000/api/courses`, form);

      if (res.status !== 201) {
        const { message } = res.request.message;
        throw new Error(message || "Something went wrong");
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "You have created post successfully.",
        confirmButtonColor: "#3085d6",
      });
      setForm({
        title: "",
        shortDescription: "",
        fullDescription: "",
        duration: "",
        prerequisites: "",
        instructor: "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        Create a New Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="title"
          type="text"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />

        <input
          name="shortDescription"
          type="text"
          placeholder="Short Description"
          value={form.shortDescription}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />

        <textarea
          name="fullDescription"
          placeholder="Full Description"
          value={form.fullDescription}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2 h-28"
        />

        <input
          name="duration"
          type="text"
          placeholder="Duration (e.g., 4 weeks)"
          value={form.duration}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />

        <input
          name="prerequisites"
          type="text"
          placeholder="Prerequisites (optional)"
          value={form.prerequisites}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />

        <input
          name="instructor"
          type="text"
          placeholder="Instructor Name"
          value={form.instructor}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
