"use client";

import AdminDashboard from "./Admin";
import StudentDashboard from "./Student";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dash() {
  const user = useSelector((state: RootState) => state.users.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/user/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const role = user.role;

  return (
    <div>
      {role === "admin" ? (
        <AdminDashboard />
      ) : role === "student" ? (
        <StudentDashboard />
      ) : (
        <p className="text-center text-red-500">Unknown role: {role}</p>
      )}
    </div>
  );
}
