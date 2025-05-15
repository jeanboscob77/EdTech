'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { RootState } from '../../store/Store';
import { clearMessage } from '@/app/store/coursesSlice';

const EnrollmentMessage = () => {
  const message = useSelector((state: RootState) => state.courses.message);
  const dispatch = useDispatch();
useEffect(() => {
  if (message) {
    Swal.fire({
      icon: 'success',
      title: message.toLowerCase().includes('unenroll') ? 'Unenrolled' : 'Success!',
      text: message,
      confirmButtonColor: '#3085d6',
    });

    dispatch(clearMessage());
  }
}, [message]); // ✅ dispatch removed to avoid unstable dependency issue

  return null;
};

export default EnrollmentMessage;
