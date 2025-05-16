import Register from "./RegisterForm";

function RegisterPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow px-4 py-6">
          <Register />
        </main>
      </div>
    </>
  );
}

export default RegisterPage;
