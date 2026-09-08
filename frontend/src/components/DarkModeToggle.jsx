import { useState, useEffect } from "react";

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const roof = document.documentElement;
        if (isDark) {
            roof.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            roof.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark])


    return (
        <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all text-xs flex items-center gap-2 border border-stone-200 dark:border-stone-700"
            aria-label="Toggle Theme">
                {isDark ? "☀️" :"🌙"}
        </button>
    )
}