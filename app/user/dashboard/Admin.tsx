'use client';
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/Store';
import { logout } from '../../store/userSlice'; // Ensure this exists and clears user state

const AdminDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);


  
    useEffect(() => {
  if (!user) return; // wait until user is defined

  if (user.role !== 'admin') {
    router.push('/user/login');
  }
}, [user, router]);

   if (!user || user.role !== 'admin') {
  return null; // You can replace with a loader if you want
}

   const role = user.role;


  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    router.push('/user/login');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">
            {getGreeting()}, {user?.name || 'Admin'}!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-700 mb-6 text-lg">
          Welcome to the admin dashboard. Here, you can manage posts, oversee platform content,
          and help shape the learning experience for our students.
        </p>

        {/* Create Post */}
        <div>
          {
            role === 'admin' &&  <Link
            href="/user/dashboard/create-post"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition font-medium inline-block"
          >
            ➕ Create New Post
          </Link>
          }
         
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
