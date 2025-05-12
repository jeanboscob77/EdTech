'use client';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { enroll as enrollCourse } from '@/app/store/coursesSlice';
import { ExtendedEnrollButtonProps} from '@/app/types';



function EnrollButton({ courseId, isEnrolled: initialEnrolled }: ExtendedEnrollButtonProps) {
  const dispatch = useDispatch();
  const [enrolled, setEnrolled] = useState(initialEnrolled);
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (enrolled || loading) return;

    setLoading(true);
    try {
      await axios.patch(`/api/courses?id=${courseId}`, { isEnrolled: true });
      dispatch(enrollCourse(courseId));
      setEnrolled(true); // update UI instantly
    } catch (error: any) {
      console.error('Enrollment failed:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const buttonLabel = enrolled ? '✅ Enrolled' : loading ? 'Enrolling...' : 'Enroll';

  return (
    <button
      onClick={handleEnroll}
      disabled={enrolled || loading}
      className={`px-6 py-2 rounded-md text-white transition ${
        enrolled || loading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {buttonLabel}
    </button>
  );
}

export default EnrollButton;
