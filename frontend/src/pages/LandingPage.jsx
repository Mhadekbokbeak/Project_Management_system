import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

export default function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleGetStarted = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-stone-950 text-stone-800 dark:text-stone-100 font-sans antialiased selection:bg-stone-200 dark:selection:bg-stone-800 flex flex-col transition-colors duration-300">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-20 bg-[#FAF9F6]/80 dark:bg-stone-950/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-800 dark:bg-stone-200"></span>
            <span className="font-semibold text-stone-900 dark:text-stone-100 tracking-tight text-base">TaskSpace</span>
          </div>

          {/* กลุ่มปุ่มฝั่งขวา: DarkModeToggle + Action Button */}
          <div className="flex items-center space-x-3">
            <DarkModeToggle />
            <button
              onClick={() => navigate(token ? "/dashboard" : "/login")}
              className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 text-xs font-medium px-4 py-2 rounded-2xl transition-all shadow-sm"
            >
              {token ? "Go to Workspace" : "Sign In"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero & Preview Area */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center text-center">
        {/* Badge */}
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-400 dark:text-stone-400 font-semibold bg-stone-200/40 dark:bg-stone-800/50 px-3.5 py-1 rounded-full mb-6">
          Minimalist Workspace
        </span>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-5xl font-semibold text-stone-900 dark:text-stone-100 tracking-tight leading-tight max-w-2xl">
          Organize your projects & tasks with quiet focus.
        </h1>

        

        {/* CTA Button */}
        <div className="mt-8">
          <button
            onClick={handleGetStarted}
            className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 text-xs sm:text-sm font-medium px-6 py-3 rounded-2xl transition-all shadow-md shadow-stone-900/10 hover:scale-[1.02]"
          >
            {token ? "Open Workspace →" : "Get Started Free →"}
          </button>
        </div>

        {/* UI Mockup Preview Card */}
        <div className="w-full max-w-3xl mt-14 bg-white dark:bg-stone-900 border border-transparent dark:border-stone-800/80 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.03)] text-left transition-all">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-stone-200 dark:bg-stone-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-stone-200 dark:bg-stone-800"></div>
            </div>
            <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider">Interface Preview</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Mock Projects Sidebar */}
            <div className="md:col-span-4 bg-[#F5F4F0] dark:bg-stone-950/60 p-3.5 rounded-2xl space-y-2">
              <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block px-1 mb-1">Projects</span>
              <div className="p-2.5 bg-white dark:bg-stone-800 rounded-xl text-xs font-semibold text-stone-900 dark:text-stone-100 shadow-sm flex justify-between items-center">
                <span>📁 Website Redesign</span>
                <span className="text-[10px] bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-1.5 py-0.5 rounded-md font-mono">3</span>
              </div>
              <div className="p-2.5 text-xs text-stone-400 font-medium px-3">📁 Mobile App Launch</div>
              <div className="p-2.5 text-xs text-stone-400 font-medium px-3">📁 Personal Goals</div>
            </div>

            {/* Mock Workspace Tasks */}
            <div className="md:col-span-8 space-y-2">
              <div className="flex justify-between items-center pb-2 px-1">
                <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200">Website Redesign</h3>
                <span className="text-[10px] text-stone-400 font-mono">2/3 Done</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#FAFAFA] dark:bg-stone-950/40 rounded-2xl text-xs text-stone-300 dark:text-stone-600 line-through">
                <div className="flex items-center space-x-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-stone-300 dark:bg-stone-700 flex items-center justify-center text-[8px] text-white dark:text-stone-900">✓</span>
                  <span>Draft initial UI wireframes</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#FBFBF9] dark:bg-stone-800/50 rounded-2xl text-xs text-stone-700 dark:text-stone-200 font-medium border border-stone-100/50 dark:border-stone-700/30">
                <div className="flex items-center space-x-2.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-stone-300 dark:border-stone-600"></span>
                  <span>Apply Eggshell Minimalist Palette</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#FAFAFA] dark:bg-stone-950/40 rounded-2xl text-xs text-stone-300 dark:text-stone-600 line-through">
                <div className="flex items-center space-x-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-stone-300 dark:bg-stone-700 flex items-center justify-center text-[8px] text-white dark:text-stone-900">✓</span>
                  <span>Deploy App to Vercel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-stone-300 dark:text-stone-600">
        TaskSpace — Modern Minimalist Task Management
      </footer>
    </div>
  );
}