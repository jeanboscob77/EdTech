import { ReactNode } from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReduxProvider from "./store/ReduxProvider";

// export const metadata = {
//   title: {
//     default: "EdTech - Empower Your Learning",
//     template: "%s | EdTech",
//   },
//   description:
//     "A platform for students and employees to enroll in courses and grow their skills.",
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
