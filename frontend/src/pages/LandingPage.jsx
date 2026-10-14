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
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-200 font-sans antialiased selection:bg-neutral-200 dark:selection:bg-neutral-800 flex flex-col transition-colors duration-300">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-20 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100"></span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100 tracking-[0.12em] text-sm uppercase">TaskSpace</span>
          </div>

          {/* กลุ่มปุ่มฝั่งขวา: DarkModeToggle + Action Button */}
          <div className="flex items-center space-x-3">
            <DarkModeToggle />
            <button
              onClick={() => navigate(token ? "/dashboard" : "/login")}
              className="bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-100 dark:hover:bg-neutral-300 text-white dark:text-neutral-900 text-[11px] font-medium uppercase tracking-[0.12em] px-5 py-3 rounded-sm transition-colors"
            >
              {token ? "Go to Workspace" : "Sign In"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero & Preview Area */}
      <main className="flex-1 max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 flex flex-col items-center text-center">
        {/* Badge */}
        <span className="text-[10px] uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400 font-medium border-y border-neutral-300 dark:border-neutral-700 px-4 py-2 mb-8">
          A considered workspace
        </span>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-5xl font-light text-neutral-950 dark:text-neutral-50 tracking-[0.035em] leading-[1.2] max-w-3xl">
          Organize your projects & tasks with quiet focus.
        </h1>

        

        {/* CTA Button */}
        <div className="mt-10">
          <button
            onClick={handleGetStarted}
            className="bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-100 dark:hover:bg-neutral-300 text-white dark:text-neutral-900 text-[11px] sm:text-xs font-medium uppercase tracking-[0.14em] px-7 py-4 rounded-sm transition-colors"
          >
            {token ? "Open Workspace →" : "Get Started Free →"}
          </button>
        </div>

        {/* UI Mockup Preview Card */}
        <div className="w-full max-w-4xl mt-20 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm p-6 sm:p-10 text-left transition-colors">
          <div className="flex items-center justify-between pb-5 mb-8 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-stone-200 dark:bg-stone-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-stone-200 dark:bg-stone-800"></div>
            </div>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-[0.16em]">Interface Preview</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Mock Projects Sidebar */}
            <div className="md:col-span-4 bg-neutral-50 dark:bg-neutral-950 p-4 rounded-sm space-y-2">
              <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.16em] block px-1 mb-2">Projects</span>
              <div className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm text-xs font-medium text-neutral-900 dark:text-neutral-100 flex justify-between items-center">
                <span>📁 Website Redesign</span>
                <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-1.5 py-0.5 rounded-sm font-mono">3</span>
              </div>
              <div className="p-3 text-xs text-neutral-500 dark:text-neutral-400 font-normal">📁 Mobile App Launch</div>
              <div className="p-3 text-xs text-neutral-500 dark:text-neutral-400 font-normal">📁 Personal Goals</div>
            </div>

            {/* Mock Workspace Tasks */}
            <div className="md:col-span-8 space-y-2">
              <div className="flex justify-between items-center pb-2 px-1">
                <h3 className="text-sm font-medium tracking-wide text-neutral-900 dark:text-neutral-100">Website Redesign</h3>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">2/3 Done</span>
              </div>

              <div className="flex items-center justify-between p-3 border-b border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400 dark:text-neutral-600 line-through">
                <div className="flex items-center space-x-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-stone-300 dark:bg-stone-700 flex items-center justify-center text-[8px] text-white dark:text-stone-900">✓</span>
                  <span>Draft initial UI wireframes</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-200 font-normal">
                <div className="flex items-center space-x-2.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-stone-300 dark:border-stone-600"></span>
                  <span>Apply Eggshell Minimalist Palette</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border-b border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400 dark:text-neutral-600 line-through">
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
      <footer className="py-8 text-center text-[10px] uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-500">
        TaskSpace — Project management, with room to think
      </footer>
    </div>
  );
}