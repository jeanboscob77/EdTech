"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/Store";
import { logout } from "../../store/userSlice";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const user = useSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/user/login");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">
            {getGreeting()}, {user?.name || "Student"}!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-700 text-lg">
          Welcome to your learning dashboard. Here, you can explore courses,
          track your progress, and grow your skills. Start learning at your own
          pace and achieve your educational goals.
        </p>
        <Link
          href="/user/my-course"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to My Courses
        </Link>
      </div>
    </div>
  );
}
