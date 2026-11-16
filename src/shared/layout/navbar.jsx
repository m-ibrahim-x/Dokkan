import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X, ArrowUpRight, User } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../ui/logo";
import useTheme from "../hooks/useTheme";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/products" },
  { label: "My Orders", path: "/profile/orders" },
  { label: "Carts", path: "/cart" },
  { label: "Wishlist", path: "/wishlist" },
];

export default function Navbar({
  isLoggedIn = false,
  user = null,
  onLogout,
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkIsActive = (targetPath) => {
    const currentPath = location.pathname.toLowerCase();
    const target = targetPath.toLowerCase();

    if (target === "/") {
      return currentPath === "/";
    }

    return currentPath === target || currentPath.startsWith(`${target}/`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-bg-main/70 backdrop-blur-lg shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      {/* Container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="flex items-center cursor-pointer"
          aria-label="Dokkan Home"
        >
          <Logo markClassName="h-10" textClassName="h-6" />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-border-main/60 bg-bg-main/80 dark:bg-card-bg/80 dark:border-border-main p-1.5 backdrop-blur-md shadow-sm transition-colors">
          {navLinks.map((tab) => {
            const isActive = checkIsActive(tab.path);

            return (
              <NavLink
                key={tab.label}
                to={tab.path}
                className="relative px-6 py-2.5 text-xs font-semibold tracking-wide transition-colors duration-300"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 pointer-events-none"
                    transition={{
                      type: "spring",
                      duration: 0.5,
                      bounce: 0.2,
                    }}
                  >
                    <div className="absolute -top-[1.5px] left-1/2 h-[3.5px] w-6 -translate-x-1/2 rounded-full bg-brand-active shadow-[0_0_10px_var(--theme-brand-active)] z-20" />

                    <div
                      className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 z-10"
                      style={{
                        clipPath:
                          "polygon(35% 0%, 65% 0%, 95% 100%, 5% 100%)",
                        background:
                          "linear-gradient(to bottom, color-mix(in srgb, var(--theme-brand-active) 70%, transparent) 0%, color-mix(in srgb, var(--theme-brand-active) 15%, transparent) 75%, transparent 100%)",
                      }}
                    />

                    <div className="absolute inset-0 rounded-full bg-brand-active/15 blur-md z-0" />
                  </motion.div>
                )}

                <span
                  className={`relative z-20 ${
                    isActive
                      ? "text-text-primary font-bold drop-shadow-[0_0_10px_var(--theme-brand-active)]"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {tab.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-main bg-bg-main/70 dark:bg-card-bg/70 text-text-primary hover:bg-input-bg dark:hover:bg-active-bg transition-all shadow-sm backdrop-blur-sm cursor-pointer"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-brand-active" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* User Profile / Login */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2 rounded-full border border-border-main bg-bg-main/70 dark:bg-card-bg/70 px-4 py-2 text-xs font-semibold text-text-primary shadow-sm">
              <NavLink
                to="/profile"
                className="flex items-center gap-1.5 hover:underline"
              >
                <User className="h-3.5 w-3.5 text-brand-active" />
                <span className="max-w-[100px] truncate">
                  {user?.name || "Profile"}
                </span>
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="ms-2 text-[11px] text-status-danger hover:underline cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="group flex items-center gap-2 rounded-full bg-text-primary px-5 py-2.5 text-xs font-medium text-bg-main hover:opacity-90 transition-all shadow-md cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <span>Login</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-main bg-bg-main dark:bg-card-bg text-text-primary cursor-pointer"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-brand-active" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-text-primary text-bg-main cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border-main bg-bg-main/95 dark:bg-card-bg/95 backdrop-blur-xl px-6 py-4 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-sm font-semibold text-text-primary hover:text-brand-active transition-colors"
                >
                  {link.label}
                </NavLink>
              ))}

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-text-primary py-3 text-xs font-semibold text-bg-main cursor-pointer"
                >
                  <span>Logout</span>
                  <User className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-text-primary py-3 text-xs font-semibold text-bg-main cursor-pointer"
                >
                  <span>Login</span>
                  <User className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
