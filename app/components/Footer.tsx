const Footer = () => {
  return (
    <footer className="bg-gray-50 py-4 mt-8">
      <div className="max-w-screen-lg mx-auto px-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} EdTech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
