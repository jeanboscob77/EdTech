// app/components/SearchBar.tsx
"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";
import { Course } from "../types";
import { Props } from "../types";


export default function SearchBar({ initialCourses }: Props) {
  const [query, setQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(initialCourses);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const lower = query.toLowerCase();
    const filtered = initialCourses.filter((course) =>
      course.title.toLowerCase().includes(lower) ||
      course.shortDescription.toLowerCase().includes(lower)
    );
    setFilteredCourses(filtered);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-6 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search by title or description..."
  className="w-full sm:w-96 border border-gray-300 rounded-full p-3 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-lg mx-auto">
        {filteredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}
