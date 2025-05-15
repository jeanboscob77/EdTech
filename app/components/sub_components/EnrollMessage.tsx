'use client';
import { clearMessage } from '@/app/store/coursesSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { RootState } from '../../store/Store';
import { useDispatch } from 'react-redux';

const EnrollmentMessage = () => {
  const message = useSelector((state: RootState) => state.courses.message);
  const dispatch = useDispatch()
  useEffect(() => {
    if (message) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: message,
        confirmButtonColor: '#3085d6',
      });
    }
     dispatch(clearMessage()); 
  }, [message]);

  return null; // no need to render a div if you're using SweetAlert only
};

export default EnrollmentMessage;
