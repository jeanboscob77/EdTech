// app/components/EnrollmentMessage.tsx
'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';

const EnrollmentMessage = () => {
  const message = useSelector((state: RootState) => state.courses.message);

  if (!message) return null;

  return (
    <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
      {message}
    </div>
  );
};

export default EnrollmentMessage;
