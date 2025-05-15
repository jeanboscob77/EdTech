'use client';
import { RootState } from '@/app/store/Store';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { enroll as enrollCourse } from '@/app/store/coursesSlice';
import { ExtendedEnrollButtonProps} from '@/app/types';



function EnrollButton({ courseId, isEnrolled: initialEnrolled }: ExtendedEnrollButtonProps) {
  const dispatch = useDispatch();
  const [enrolled, setEnrolled] = useState(initialEnrolled);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState)=>state.users.user)
  const message = useSelector((state: RootState) => state.courses.message);

  const handleEnroll = async () => {
    if (enrolled || loading) return;

    setLoading(true);
    try {
      await axios.patch(`/api/courses?id=${courseId}`, { isEnrolled: true, userId: user.id });
      dispatch(enrollCourse(courseId));
      setEnrolled(true); // update UI instantly
       Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: message,
              confirmButtonColor: '#3085d6',
            });
    } catch (error: any) {
       Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "You are not Logged in????",
          confirmButtonColor: '#d33',
        });
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
