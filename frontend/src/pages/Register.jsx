import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 flex items-center justify-center p-6 antialiased transition-colors duration-200">
      
      {/* Dark Mode Toggle Position */}
      <div className="absolute top-4 right-4 z-10 ">
        <DarkModeToggle className="cursor-pointer" />
      </div>

      {/* Card Container */}
      <div className="max-w-sm w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm p-8 sm:p-10 transition-colors duration-200">
        
        {/* Header / Logo */}
        <div className="text-center mb-10">
          <span className="inline-block w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100 mb-6"></span>
          <h1 className="text-xl font-light text-neutral-950 dark:text-neutral-50 tracking-[0.14em] uppercase">Create account</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3 tracking-wide">Start organizing with TaskSpace</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 p-3 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 text-xs rounded-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full name"
              className="w-full text-xs px-4 py-4 bg-white dark:bg-neutral-900 rounded-sm border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300 transition-colors placeholder:text-neutral-500 dark:placeholder:text-neutral-400 text-neutral-800 dark:text-neutral-100"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full text-xs px-4 py-4 bg-white dark:bg-neutral-900 rounded-sm border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300 transition-colors placeholder:text-neutral-500 dark:placeholder:text-neutral-400 text-neutral-800 dark:text-neutral-100"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full text-xs px-4 py-4 bg-white dark:bg-neutral-900 rounded-sm border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300 transition-colors placeholder:text-neutral-500 dark:placeholder:text-neutral-400 text-neutral-800 dark:text-neutral-100"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-100 dark:hover:bg-neutral-300 text-white dark:text-neutral-900 font-medium text-[10px] uppercase tracking-[0.16em] py-4 rounded-sm transition-colors mt-3 cursor-pointer"
          >
            Sign up
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-current">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}