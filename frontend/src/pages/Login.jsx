import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="min-h-screen bg-[#FAF9F6] text-stone-800 flex items-center justify-center p-4 antialiased">
      <div className="max-w-sm w-full bg-white rounded-3xl p-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)]">
        <div className="text-center mb-8">
          <span className="inline-block w-3 h-3 rounded-full bg-stone-900 mb-4"></span>
          <h1 className="text-xl font-semibold text-stone-900 tracking-tight">Sign in</h1>
          <p className="text-xs text-stone-400 mt-1">Welcome back to TaskSpace</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50/60 text-rose-600 text-xs rounded-2xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full text-xs px-4 py-3 bg-[#F5F4F0] rounded-2xl border-none focus:outline-none focus:ring-1 focus:ring-stone-300 transition-all placeholder:text-stone-400 text-stone-800"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full text-xs px-4 py-3 bg-[#F5F4F0] rounded-2xl border-none focus:outline-none focus:ring-1 focus:ring-stone-300 transition-all placeholder:text-stone-400 text-stone-800"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs py-3 rounded-2xl transition-all shadow-sm mt-2"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-xs text-stone-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-stone-800 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}