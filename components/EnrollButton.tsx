'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { enroll as enrollCourse } from '@/app/store/coursesSlice';
import { RootState } from '@/app/store/Store';
import { EnrollButtonProps } from '@/app/types';

function EnrollButton({ courseId, initialIsEnrolled = false }: EnrollButtonProps & { initialIsEnrolled?: boolean }) {
  const dispatch = useDispatch();

  const isEnrolledRedux = useSelector((state: RootState) =>
    state.courses.enrolledCourseIds.includes(courseId)
  );

  const [isEnrolled, setIsEnrolled] = useState(initialIsEnrolled || isEnrolledRedux);
  const [loading, setLoading] = useState(true);

  // Fetch actual enrollment status from backend on mount
  useEffect(() => {
    const fetchEnrollmentStatus = async () => {
      try {
        const res = await axios.get(`/api/courses?id=${courseId}`);
        setIsEnrolled(res.data.isEnrolled);
      } catch (err) {
        console.error("Failed to fetch enrollment status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentStatus();
  }, [courseId]);

  useEffect(() => {
    setIsEnrolled(isEnrolledRedux);
  }, [isEnrolledRedux]);

  const handleEnroll = async () => {
    try {
      await axios.patch(`/api/courses?id=${courseId}`, { isEnrolled: true });
      dispatch(enrollCourse(courseId));
      setIsEnrolled(true);
    } catch (error: any) {
      console.error("Enrollment failed:", error.response?.data || error.message);
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={loading || isEnrolled}
      className={`px-6 py-2 rounded-md text-white transition ${
        isEnrolled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
    {  isEnrolled ? "Enrolled": "Enroll"}
    </button>
  );
}

export default EnrollButton;
