import Contact from "./contact";
export const metadata = {
  title: "Contact | EdTech",
  description:
    "Get in touch with EdTech for support, inquiries, or partnership opportunities.",
  keywords: [
    "contact EdTech",
    "support",
    "customer service",
    "inquiries",
    "EdTech contact",
  ],
  openGraph: {
    title: "Contact EdTech - We're Here to Help",
    description:
      "Have questions or need help? Reach out to EdTech for support or more information.",
    url: "https://your-domain.com/contact",
    siteName: "EdTech",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Contact />
    </>
  );
}
