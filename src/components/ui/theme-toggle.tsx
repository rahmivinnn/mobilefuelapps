
import React from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:bg-gray-800 hover:border-green-500/50 transition-all duration-300 hover:rotate-12 group"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 group-hover:text-yellow-400" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 group-hover:text-green-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-fade-in bg-gray-900 border-gray-800">
        <DropdownMenuItem 
          onClick={() => setTheme("light")} 
          className="cursor-pointer group flex items-center gap-2 hover:bg-gray-800"
        >
          <Sun className="h-4 w-4 text-yellow-500 group-hover:rotate-90 transition-transform duration-300" />
          <span className="group-hover:text-yellow-500 transition-colors">Light</span>
          {theme === 'light' && <Sparkles className="h-3 w-3 text-yellow-500 ml-1 animate-pulse" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")} 
          className="cursor-pointer group flex items-center gap-2 hover:bg-gray-800"
        >
          <Moon className="h-4 w-4 text-green-500 group-hover:rotate-12 transition-transform duration-300" />
          <span className="group-hover:text-green-500 transition-colors">Dark</span>
          {theme === 'dark' && <Sparkles className="h-3 w-3 text-green-500 ml-1 animate-pulse" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className="cursor-pointer group flex items-center gap-2 hover:bg-gray-800"
        >
          <span className="h-4 w-4 flex items-center justify-center">💻</span>
          <span className="group-hover:text-green-500 transition-colors">System</span>
          {theme === 'system' && <Sparkles className="h-3 w-3 text-green-500 ml-1 animate-pulse" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
