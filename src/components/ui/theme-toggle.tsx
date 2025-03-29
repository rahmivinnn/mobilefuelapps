
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
import { useToast } from "@/hooks/use-toast";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} theme activated`,
      description: `The application theme has been set to ${newTheme}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-background backdrop-blur-sm border-border hover:bg-card hover:border-green-500/50 transition-all duration-300 hover:rotate-12 group"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 group-hover:text-yellow-400" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 group-hover:text-green-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-fade-in bg-card border-border">
        <DropdownMenuItem 
          onClick={() => handleThemeChange("light")} 
          className="cursor-pointer group flex items-center gap-2 hover:bg-muted/50"
        >
          <Sun className="h-4 w-4 text-yellow-500 group-hover:rotate-90 transition-transform duration-300" />
          <span className="group-hover:text-yellow-500 transition-colors">Light</span>
          {theme === 'light' && <Sparkles className="h-3 w-3 text-yellow-500 ml-1 animate-pulse" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("dark")} 
          className="cursor-pointer group flex items-center gap-2 hover:bg-muted/50"
        >
          <Moon className="h-4 w-4 text-green-500 group-hover:rotate-12 transition-transform duration-300" />
          <span className="group-hover:text-green-500 transition-colors">Dark</span>
          {theme === 'dark' && <Sparkles className="h-3 w-3 text-green-500 ml-1 animate-pulse" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("system")} 
          className="cursor-pointer group flex items-center gap-2 hover:bg-muted/50"
        >
          <span className="h-4 w-4 flex items-center justify-center">💻</span>
          <span className="group-hover:text-green-500 transition-colors">System</span>
          {theme === 'system' && <Sparkles className="h-3 w-3 text-green-500 ml-1 animate-pulse" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
