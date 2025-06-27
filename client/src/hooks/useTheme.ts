import { useState, useEffect } from 'react';

export type ThemeColor = 'purple' | 'blue' | 'green' | 'red' | 'yellow';

const themeColors = {
  purple: { primary: 'hsl(262, 80%, 60%)', secondary: 'hsl(258, 74%, 63%)' },
  blue: { primary: 'hsl(217, 91%, 60%)', secondary: 'hsl(224, 76%, 58%)' },
  green: { primary: 'hsl(166, 74%, 37%)', secondary: 'hsl(168, 85%, 31%)' },
  red: { primary: 'hsl(0, 84%, 60%)', secondary: 'hsl(0, 73%, 57%)' },
  yellow: { primary: 'hsl(32, 95%, 44%)', secondary: 'hsl(32, 85%, 50%)' }
};

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>('purple');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeColor;
    if (savedTheme && themeColors[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const colors = themeColors[currentTheme];
    
    root.style.setProperty('--accent', colors.primary);
    root.style.setProperty('--accent-secondary', colors.secondary);
    
    localStorage.setItem('portfolio-theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (theme: ThemeColor) => {
    setCurrentTheme(theme);
  };

  return {
    currentTheme,
    changeTheme,
    availableThemes: Object.keys(themeColors) as ThemeColor[]
  };
}
