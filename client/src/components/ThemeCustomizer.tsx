import { useState } from "react";
import { useTheme, type ThemeColor } from "@/hooks/useTheme";
import { Palette, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const themeColors = {
  purple: 'bg-purple-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500'
};

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, changeTheme, availableThemes } = useTheme();

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40 bg-accent hover:bg-accent-secondary p-3 rounded-xl shadow-lg"
        size="icon"
      >
        <Palette className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-4 right-4 z-50 bg-slate-800 p-4 rounded-xl shadow-2xl border border-slate-700 min-w-[200px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-white">Theme Colors</h3>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-2">Accent Color</label>
                <div className="flex gap-2">
                  {availableThemes.map((theme) => (
                    <button
                      key={theme}
                      onClick={() => changeTheme(theme)}
                      className={`w-8 h-8 rounded-full ${themeColors[theme]} border-2 transition-all duration-200 ${
                        currentTheme === theme 
                          ? 'border-white scale-110' 
                          : 'border-transparent hover:scale-105'
                      }`}
                      title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
