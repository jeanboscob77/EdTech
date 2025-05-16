import Dash from "./dash";

export const metadata = {
  title: "Dashboard | EdTech",
  description:
    "Access your personalized dashboard to view enrolled courses, progress, and learning resources.",
  keywords: [
    "EdTech dashboard",
    "user dashboard",
    "student profile",
    "learning progress",
    "course tracking",
  ],
  openGraph: {
    title: "Your Dashboard - EdTech",
    description:
      "Manage your learning journey with your personal dashboard. Track your courses and progress.",
    url: "https://your-domain.com/dashboard",
    siteName: "EdTech",
    type: "website",
  },
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Dash />
    </div>
  );
};

export default Dashboard;
