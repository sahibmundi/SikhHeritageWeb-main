import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border shadow-3d glow-border"
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
            data-testid="link-home"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-sidebar-foreground shadow-lg glow-border bg-sidebar-accent flex items-center justify-center"
              whileHover={{ rotate: 360, borderColor: "#f97316" }}
              transition={{ duration: 0.6 }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-6 h-6 md:w-8 md:h-8 fill-sidebar-foreground"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="50"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  ੴ
                </text>
              </svg>
            </motion.div>
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors">
              ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ
            </span>
          </motion.button>

          <nav className="hidden md:flex items-center gap-2">
            {location === "/" ? (
              <>
                <motion.button
                  onClick={() => scrollToSection("biography")}
                  className="text-base font-medium text-sidebar-foreground hover:text-sidebar-accent-foreground transition-all px-4 py-2 rounded-lg relative overflow-hidden group shadow-3d-hover"
                  data-testid="link-biography"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">ਜੀਵਨੀ</span>
                  <motion.div 
                    className="absolute inset-0 bg-sidebar-accent rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("baani")}
                  className="text-base font-medium text-sidebar-foreground hover:text-sidebar-accent-foreground transition-all px-4 py-2 rounded-lg relative overflow-hidden group shadow-3d-hover"
                  data-testid="link-baani"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">ਬਾਣੀ</span>
                  <motion.div 
                    className="absolute inset-0 bg-sidebar-accent rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("audio")}
                  className="text-base font-medium text-sidebar-foreground hover:text-sidebar-accent-foreground transition-all px-4 py-2 rounded-lg relative overflow-hidden group shadow-3d-hover"
                  data-testid="link-audio"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">ਬਾਣੀ ਆਡੀਓ</span>
                  <motion.div 
                    className="absolute inset-0 bg-sidebar-accent rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("gurdwaras")}
                  className="text-base font-medium text-sidebar-foreground hover:text-sidebar-accent-foreground transition-all px-4 py-2 rounded-lg relative overflow-hidden group shadow-3d-hover"
                  data-testid="link-gurdwaras"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">ਗੁਰਦੁਆਰਾ ਸਾਹਿਬ</span>
                  <motion.div 
                    className="absolute inset-0 bg-sidebar-accent rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("resources")}
                  className="text-base font-medium text-sidebar-foreground hover:text-sidebar-accent-foreground transition-all px-4 py-2 rounded-lg relative overflow-hidden group shadow-3d-hover"
                  data-testid="link-resources"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">ਸਰੋਤ</span>
                  <motion.div 
                    className="absolute inset-0 bg-sidebar-accent rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </>
            ) : (
              <Link href="/">
                <motion.button 
                  className="text-base font-medium text-sidebar-foreground hover:text-sidebar-accent-foreground transition-all px-4 py-2 rounded-lg shadow-3d-hover" 
                  data-testid="link-home-nav"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ਮੁੱਖ ਪੰਨਾ
                </motion.button>
              </Link>
            )}
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-2 text-sidebar-foreground hover:text-sidebar-accent-foreground"
                data-testid="button-theme-toggle"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </motion.div>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-sidebar-foreground"
              data-testid="button-theme-toggle-mobile"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-sidebar-foreground"
              data-testid="button-menu-toggle"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden pb-4 space-y-2" 
              data-testid="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {location === "/" ? (
                <>
                  <motion.button
                    onClick={() => scrollToSection("biography")}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors shadow-3d-hover"
                    data-testid="link-biography-mobile"
                    whileHover={{ x: 8 }}
                  >
                    ਜੀਵਨੀ
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection("baani")}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors shadow-3d-hover"
                    data-testid="link-baani-mobile"
                    whileHover={{ x: 8 }}
                  >
                    ਬਾਣੀ
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection("audio")}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors shadow-3d-hover"
                    data-testid="link-audio-mobile"
                    whileHover={{ x: 8 }}
                  >
                    ਬਾਣੀ ਆਡੀਓ
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection("gurdwaras")}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors shadow-3d-hover"
                    data-testid="link-gurdwaras-mobile"
                    whileHover={{ x: 8 }}
                  >
                    ਗੁਰਦੁਆਰਾ ਸਾਹਿਬ
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection("resources")}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors shadow-3d-hover"
                    data-testid="link-resources-mobile"
                    whileHover={{ x: 8 }}
                  >
                    ਸਰੋਤ
                  </motion.button>
                </>
              ) : (
                <Link href="/">
                  <motion.button 
                    className="block w-full text-left px-4 py-3 text-base font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors shadow-3d-hover" 
                    data-testid="link-home-mobile"
                    whileHover={{ x: 8 }}
                  >
                    ਮੁੱਖ ਪੰਨਾ
                  </motion.button>
                </Link>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
