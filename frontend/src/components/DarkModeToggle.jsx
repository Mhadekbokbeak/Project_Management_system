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
        <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-sm bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-xs flex items-center gap-2 border border-neutral-200 dark:border-neutral-700"
            aria-label="Toggle Theme">
                {isDark ? "☀️" :"🌙"}
        </button>
    )
}