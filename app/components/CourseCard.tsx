import Link from "next/link";
import { Course } from "../types";

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
      <p className="text-gray-700 mb-2">{course.shortDescription}</p>
      <p className="text-sm text-gray-500 mb-4">Duration: {course.duration}</p>
      <Link
        href={`/courses/${course._id}`}
        className="text-blue-500 hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
};

export default CourseCard;
