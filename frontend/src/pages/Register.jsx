import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="min-h-screen bg-[#FAF9F6] text-stone-800 flex items-center justify-center p-4 antialiased">
      <div className="max-w-sm w-full bg-white rounded-3xl p-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)]">
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <span className="inline-block w-3 h-3 rounded-full bg-stone-900 mb-4"></span>
          <h1 className="text-xl font-semibold text-stone-900 tracking-tight">Create account</h1>
          <p className="text-xs text-stone-400 mt-1">Start organizing with TaskSpace</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50/60 text-rose-600 text-xs rounded-2xl text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Full name"
              className="w-full text-xs px-4 py-3 bg-[#F5F4F0] rounded-2xl border-none focus:outline-none focus:ring-1 focus:ring-stone-300 transition-all placeholder:text-stone-400 text-stone-800"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

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
            Sign up
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-stone-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-stone-800 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}