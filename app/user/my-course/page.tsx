import MyCourses from "./MyCourses";

export const metadata = {
  title: "My Courses | EdTech",
  description: "View and manage all the courses you have enrolled in.",
  keywords: ["courses", "education", "learning", "EdTech"],
  openGraph: {
    title: "My Courses - EdTech Platform",
    description: "Check out all the courses you've enrolled in on EdTech.",
    url: "https://your-domain.com/my-courses",
    siteName: "EdTech",
    type: "website",
  },
};

export default function MyCoursePage() {
  return (
    <div className="flex-grow px-4 py-6 m-3">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        My Courses
      </h2>
      <MyCourses />
    </div>
  );
}
