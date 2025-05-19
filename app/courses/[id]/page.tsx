// app/courses/[id]/page.tsx

import { notFound } from "next/navigation";
import EnrollButton from "@/app/components/sub_components/EnrollButton";
import { Course } from "@/app/types";

export default async function CourseDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses?id=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) notFound();

  const course: Course = await res.json();
  if (!course || course.error) notFound();

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
}
