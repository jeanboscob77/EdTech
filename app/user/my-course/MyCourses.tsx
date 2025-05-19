"use client";
import CourseCard from "@/app/components/CourseCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { RootState } from "@/app/store/Store";
import { useSelector } from "react-redux";
import { Course } from "@/app/types";

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const user = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user || user.role !== "student") return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/courses?userId=${user.id}`
      );
      const data = response.data;
      setCourses(data);
    };
    fetchCourses();
  }, [user]);

  return (
    <>
      {courses.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg text-gray-700 mb-4">
            You have not enrolled in any course yet.
          </p>
          <p className="text-gray-600 mb-6">
            Visit the course catalog to find something that interests you.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Browse Courses
          </a>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </>
  );
}
