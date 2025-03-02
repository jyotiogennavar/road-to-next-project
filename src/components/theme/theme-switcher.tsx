"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="bg-primary text-white px-4 py-2 rounded-md"
    >
      <Sun
        className="h-4 w-4 rotate-0 scale-100 transition-all 
      dark:-rotate-90 dark:scale-0 "
      />

      <Moon
        className="absolute h-4 w-4 rotate-90 scale-0 transition-transform
      dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">toggle theme</span>
    </Button>
  );
};


export { ThemeSwitcher };
