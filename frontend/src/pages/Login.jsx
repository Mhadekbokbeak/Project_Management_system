import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] dark:bg-stone-950 text-stone-800 dark:text-stone-100 flex items-center justify-center p-4 antialiased transition-colors duration-200">
      
      {/* 1. วางปุ่ม DarkModeToggle ไว้มุมขวาบน */}
      <div className="absolute top-4 right-4 z-10">
        <DarkModeToggle />
      </div>

      {/* 2. เพิ่ม class dark: ให้กล่อง Card */}
      <div className="max-w-sm w-full bg-white dark:bg-stone-900 border border-transparent dark:border-stone-800 rounded-3xl p-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors duration-200">
        <div className="text-center mb-8">
          <span className="inline-block w-3 h-3 rounded-full bg-stone-900 dark:bg-stone-100 mb-4"></span>
          <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100 tracking-tight">Sign in</h1>
          <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">Welcome back to TaskSpace</p>
        </div>

        {/* 3. ปรับสี Error Message ใน Dark Mode */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50/60 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40 text-xs rounded-2xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            {/* 4. ปรับสี Input ใน Dark Mode */}
            <input
              type="email"
              placeholder="Email address"
              className="w-full text-xs px-4 py-3 bg-[#F5F4F0] dark:bg-stone-800 rounded-2xl border-none focus:outline-none focus:ring-1 focus:ring-stone-300 dark:focus:ring-stone-600 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500 text-stone-800 dark:text-stone-100"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full text-xs px-4 py-3 bg-[#F5F4F0] dark:bg-stone-800 rounded-2xl border-none focus:outline-none focus:ring-1 focus:ring-stone-300 dark:focus:ring-stone-600 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500 text-stone-800 dark:text-stone-100"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* 5. ปรับสีปุ่ม Submit (Light Mode ดำ / Dark Mode ขาว) */}
          <button
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 font-medium text-xs py-3 rounded-2xl transition-all shadow-sm mt-2"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-xs text-stone-400 dark:text-stone-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-stone-800 dark:text-stone-200 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}