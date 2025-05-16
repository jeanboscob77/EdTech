import { ReactNode } from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppInitializer from "./user/login/LoginStarter";
import ReduxProvider from "./store/ReduxProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
          <AppInitializer />
        </ReduxProvider>
      </body>
    </html>
  );
}
