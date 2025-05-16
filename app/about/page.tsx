import Link from "next/link";
import Image from "next/image";
import About from "../../public/edtech.jpg";

export const metadata = {
  title: "About | EdTech",
  description:
    "Learn more about EdTech, our mission, and how we empower students and professionals through quality education.",
  keywords: [
    "about EdTech",
    "mission",
    "education platform",
    "online learning",
    "who we are",
  ],
  openGraph: {
    title: "About EdTech - Our Mission and Vision",
    description:
      "Discover how EdTech helps learners grow through accessible and high-quality online education.",
    url: "https://your-domain.com/about",
    siteName: "EdTech",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About EdTech</h1>
          <p className="text-lg text-gray-600">
            Empowering students and professionals through accessible, quality
            learning.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              EdTech is a modern learning platform designed to help students and
              employees grow their skills through flexible online courses.
              Whether you're advancing your career or starting a new path, we
              make learning simple, effective, and accessible to all.
            </p>
          </div>

          <Image
            src={About}
            alt="Learning"
            className="w-full rounded-xl shadow-md object-cover"
          />
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our mission is to bridge the gap between education and opportunity
            by providing a platform where individuals can explore, learn, and
            enroll in high-quality courses that match their needs and goals.
          </p>

          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              Wide range of curated courses for students and professionals
            </li>
            <li>User-friendly navigation and enrollment system</li>
            <li>Mobile-responsive and accessible design</li>
            <li>Opportunities for skill growth and certification</li>
          </ul>
        </section>

        <section className="text-center mt-16">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
          >
            Browse Courses
          </Link>
        </section>
      </div>
    </main>
  );
}
