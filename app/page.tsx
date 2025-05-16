import SearchBar from "./components/SearchBar";
import { Course } from "./types";
import EnrollmentMessage from "./components/sub_components/EnrollMessage";

export const metadata = {
  title: "Home | EdTech",
  description:
    "Browse available courses and enroll to advance your skills with EdTech.",
  keywords: [
    "EdTech",
    "online courses",
    "student learning",
    "skills development",
    "education platform",
  ],
  openGraph: {
    title: "Welcome to EdTech - Learn Something New Today",
    description:
      "Discover and enroll in top-quality courses tailored for students and professionals.",
    url: "https://your-domain.com",
    siteName: "EdTech",
    type: "website",
  },
};

async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${process.env.BASE_URL}/api/courses`, {
    cache: "no-store",
  });
  console.log(res);

  if (!res.ok) {
    console.error("Failed to fetch courses");
    return [];
  }

  return res.json();
}

export default async function Home() {
  const initialCourses = await getCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow px-4 py-6">
        <EnrollmentMessage />
        <SearchBar initialCourses={initialCourses} />
      </main>
    </div>
  );
}
