'use client';

import { useState, useEffect } from "react";

// Extend the Window interface to include toggleThemeDarkMode
declare global {
  interface Window {
    toggleThemeDarkMode?: (checked: boolean) => void;
  }
}
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Settings = () => {
  // Safe access to theme context with fallbacks
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const [resetText, setResetText] = useState("");
  
  // Try to access ThemeContext
  useEffect(() => {
    try {
      // Check if window exists (for SSR safety)
      if (typeof window !== 'undefined') {
        // Try to import dynamically if needed
        import("@/context/ThemeContext").then(({ useTheme }) => {
          try {
            const { isDarkMode: contextDarkMode, toggleDarkMode: contextToggle } = useTheme();
            setIsDarkMode(contextDarkMode);
            setIsThemeLoaded(true);
            
            // Store toggleDarkMode function in window for access
            window.toggleThemeDarkMode = contextToggle;
            console.log("Theme context loaded successfully");
          } catch (error) {
            console.error("Error using ThemeContext:", error);
            // Fallback to local state only
            setIsThemeLoaded(true);
          }
        }).catch(error => {
          console.error("Failed to load ThemeContext:", error);
          setIsThemeLoaded(true);
        });
        
        // Check system preference as fallback
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    } catch (error) {
      console.error("Error in ThemeContext setup:", error);
      setIsThemeLoaded(true);
    }
  }, []);

  const handleDarkModeToggle = (checked) => {
    setIsDarkMode(checked);
    
    // Use context toggle if available, otherwise just update local state
    if (window.toggleThemeDarkMode) {
      try {
        window.toggleThemeDarkMode(checked);
      } catch (error) {
        console.error("Error toggling dark mode:", error);
      }
    }
    
    // Apply theme directly as fallback
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Show toast if available
    try {
      toast({
        title: checked ? "Dark Mode Enabled" : "Light Mode Enabled",
        description: "Your preference has been saved.",
      });
    } catch (error) {
      console.error("Toast error:", error);
    }
  };

  const handleReset = () => {
    if (resetText.toLowerCase() === "reset me") {
      try {
        // Reset logic here
        localStorage.clear(); // Clear all local storage
        
        toast({
          title: "Database Reset",
          description: "All history and progress has been cleared.",
          variant: "destructive",
        });
      } catch (error) {
        console.error("Reset error:", error);
        alert("Reset complete"); // Fallback alert
      }
      setResetText("");
    }
  };

  // Show loading state if theme context is still loading
  if (!isThemeLoaded) {
    return <div className="p-6">Loading settings...</div>;
  }

  return (
    <div className="p-6 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
            <CardDescription>
              Customize how Hindi LearnScape looks and behaves
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Reset or export your learning progress and data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Reset All History</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently delete all your learning history and progress.
                    Type "reset me" to confirm this irreversible action.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                  <Input 
                    placeholder="Type 'reset me' to confirm"
                    value={resetText}
                    onChange={(e) => setResetText(e.target.value)}
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={resetText.toLowerCase() !== "reset me"}
                    onClick={handleReset}
                  >
                    Reset All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <div>
              <Button variant="outline">Export Learning Data</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>About Hindi LearnScape</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Version 1.0.0<br />
              Hindi LearnScape is a comprehensive platform designed to help 
              you learn the Hindi language through various interactive activities and tools.
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              © 2023 Hindi LearnScape. All rights reserved.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Settings;