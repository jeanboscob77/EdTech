"use client";
import { RootState } from "@/app/store/Store";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import {
  enroll as enrollCourse,
  unenroll as unenrollCourse,
} from "@/app/store/coursesSlice";
import { ExtendedEnrollButtonProps } from "@/app/types";

function EnrollButton({
  courseId,
  isEnrolled: initialEnrolled,
}: ExtendedEnrollButtonProps) {
  const dispatch = useDispatch();
  const [enrolled, setEnrolled] = useState(initialEnrolled);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.users.user);
  const handleEnrollToggle = async () => {
    if (loading) return;

    setLoading(true);
    const nextEnrollState = !enrolled;

    try {
      await axios.patch(`/api/courses?id=${courseId}`, {
        isEnrolled: nextEnrollState,
        userId: user?.id,
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
          ? "The course has been successfully enrolled."
          : "You have been successfully unenrolled from the course.",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: user
          ? "Something went wrong. Please try again."
          : "You must be logged in!",
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

  return (
    <>
      {user && user?.role == "student" && (
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
      )}
    </>
  );
}

export default EnrollButton;
