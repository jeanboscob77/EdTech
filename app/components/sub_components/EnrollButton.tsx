"use client";
import { RootState } from "@/app/store/Store";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  enroll as enrollCourse,
  unenroll as unenrollCourse,
} from "@/app/store/coursesSlice";
import { ExtendedEnrollButtonProps } from "@/app/types";

function EnrollButton({ courseId }: ExtendedEnrollButtonProps) {
  const dispatch = useDispatch();
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true); // new

  const user = useSelector((state: RootState) => state.users.user);

  // ✅ On mount: fetch enrollment status from backend
  useEffect(() => {
    const fetchEnrollmentStatus = async () => {
      if (!user || user.role !== "student") return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_UR}/api/users/${user.id}/enrollments`
        );

        const enrolledCourses = res.data.enrolledCourses || [];

        const isEnrolled = enrolledCourses.includes(courseId);
        setEnrolled(isEnrolled);
      } catch (err) {
        console.error("Error fetching enrollment status", err);
      } finally {
        setCheckingStatus(false);
      }
    };

    fetchEnrollmentStatus();
  }, [user, courseId]);

  const handleEnrollToggle = async () => {
    if (!user || user.role !== "student") {
      Swal.fire({
        icon: "error",
        title: "Not allowed",
        text: "You must be logged in as a student to enroll.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setLoading(true);
    const nextEnrollState = !enrolled;

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_BASE_UR}/api/users`, {
        userId: user.id,
        courseId,
        enroll: nextEnrollState,
      });

      if (nextEnrollState) {
        dispatch(enrollCourse(courseId));
      } else {
        dispatch(unenrollCourse(courseId));
      }

      setEnrolled(nextEnrollState);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: nextEnrollState
          ? "You have successfully enrolled in the course."
          : "You have successfully unenrolled from the course.",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const buttonLabel = loading
    ? enrolled
      ? "Unenrolling..."
      : "Enrolling..."
    : enrolled
    ? "Unenroll"
    : "Enroll";

  if (user?.role == "admin") return null;

  return (
    <button
      onClick={handleEnrollToggle}
      disabled={loading}
      className={`px-6 py-2 rounded-md text-white transition font-semibold
        ${
          enrolled
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-600 hover:bg-blue-700"
        }
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
      `}
    >
      {buttonLabel}
    </button>
  );
}

export default EnrollButton;
