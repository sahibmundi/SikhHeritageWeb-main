import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/jeevni", label: "ਜੀਵਨੀ", testId: "link-jeevni" },
  { href: "/baani", label: "ਬਾਣੀ", testId: "link-baani" },
  { href: "/gurdwara-sahib", label: "ਗੁਰਦੁਆਰਾ ਸਾਹਿਬ", testId: "link-gurdwaras" },
  { href: "/srot", label: "ਸਰੋਤ", testId: "link-srot" },
];

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

          <Link href="/">
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              data-testid="link-home"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-sidebar-foreground shadow-lg glow-border bg-sidebar-accent flex items-center justify-center"
                whileHover={{ borderColor: "#f97316" }}
                transition={{ duration: 0.3 }}
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
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={`text-base font-medium px-4 py-2 rounded-lg relative overflow-hidden cursor-pointer transition-all shadow-3d-hover ${
                      isActive
                        ? "text-sidebar-accent-foreground bg-sidebar-accent"
                        : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                    }`}
                    data-testid={link.testId}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-sidebar-accent rounded-lg"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
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
              className="md:hidden pb-4 space-y-1"
              data-testid="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      onClick={() => setIsMenuOpen(false)}
                      className={`block w-full text-left px-4 py-3 text-base font-medium rounded-md transition-colors cursor-pointer shadow-3d-hover ${
                        isActive
                          ? "text-sidebar-accent-foreground bg-sidebar-accent"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                      data-testid={`${link.testId}-mobile`}
                      whileHover={{ x: 8 }}
                    >
                      {link.label}
                    </motion.div>
                  </Link>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
