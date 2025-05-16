import { notFound } from "next/navigation";
import { Course } from "@/app/types";
import EnrollButton from "@/app/components/sub_components/EnrollButton";

const CourseDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const res = await fetch(`${process.env.BASE_URL}/api/courses?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const course: Course = await res.json();

  if (!course || course.error) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-screen-lg mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-700 mb-4">{course.fullDescription}</p>
        <p className="mb-2">
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p className="mb-2">
          <strong>Prerequisites:</strong> {course.prerequisites || "None"}
        </p>
        <p className="mb-6">
          <strong>Duration:</strong> {course.duration}
        </p>

        <EnrollButton courseId={course._id} isEnrolled={course.isEnrolled} />
      </main>
    </div>
  );
};

export default CourseDetails;
