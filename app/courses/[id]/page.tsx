// app/courses/[id]/page.tsx
import { notFound } from 'next/navigation';
import { Course } from '@/app/types';
import EnrollButton from '@/app/components/sub_components/EnrollButton';
import EnrollmentMessage from '@/app/components/sub_components/EnrollMessage';

const CourseDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch the course data directly inside the component
  const res = await fetch(`${process.env.BASE_URL}/api/courses?id=${id}`, {
    cache: 'no-store', // Always fetch fresh data
  });

  if (!res.ok) {
    notFound(); // Trigger a 404 page if the course is not found
  }

  const course: Course = await res.json();

  if (!course || course.error) {
    notFound(); // Trigger a 404 page if the course data is invalid
  }
//display success message on 



  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-screen-lg mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-700 mb-4">{course.fullDescription}</p>
        <p className="mb-2"><strong>Instructor:</strong> {course.instructor}</p>
        <p className="mb-2"><strong>Prerequisites:</strong> {course.prerequisites || "None"}</p>
        <p className="mb-6"><strong>Duration:</strong> {course.duration}</p>

        <EnrollButton courseId={course._id} isEnrolled={course.isEnrolled} 
        buttonText={course.isEnrolled ? '✅ Enrolled' : 'Enroll'}  />
      </main>
    </div>
  );
};

export default CourseDetails;
