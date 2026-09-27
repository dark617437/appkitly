"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ label }: { label: string }) {
  function toggleTheme() {
    const root = document.documentElement;
    // Switch colors instantly instead of animating every element's transition.
    root.classList.add("theme-switching");
    const isDark = root.classList.toggle("dark");
    void getComputedStyle(root).color;
    requestAnimationFrame(() => root.classList.remove("theme-switching"));
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this page.
    }
  }

  // Icons swap via CSS so the server render never mismatches the client theme.
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={label} title={label}>
      <Sun className="hidden dark:block" aria-hidden="true" />
      <Moon className="dark:hidden" aria-hidden="true" />
    </Button>
  );
}
