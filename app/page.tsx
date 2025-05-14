// app/page.tsx
import SearchBar from "./components/SearchBar"; // will handle filtering
import { Course } from "./types";
import EnrollmentMessage from "./components/sub_components/EnrollMessage";

async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${process.env.BASE_URL}/api/courses`, {
    cache: "no-store",
  });

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
        {/* SearchBar now includes course list and filter */}
        <EnrollmentMessage/>
        <SearchBar initialCourses={initialCourses} />
        
      </main>
    </div>
  );
}
