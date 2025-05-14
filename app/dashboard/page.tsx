'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import { logout } from '../store/userSlice'; // Make sure this exists

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);

  const handleLogout = () => {
    
    localStorage.removeItem('token');

    dispatch(logout()); // Clear user state
    router.push('/user/login'); // Redirect to login
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Create Post Link */}
        <div className="mb-4">
          <Link
            href="/create-post"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Create New Post
          </Link>
        </div>

        {/* Greeting */}
        <div className="bg-white shadow rounded p-4">
          <p>
            {user && (
              <span className="text-lg text-gray-600 pr-4">Hi, {user.name}</span>
            )}
            Use the link above to create a new post.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
