import { Outlet, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Menu, X, Lock, Home, BookOpen, Zap, Gamepad2, Shield } from "lucide-react";

const navItems = [
  { path: "/", label: "Início", icon: Home, emoji: "🏠" },
  { path: "/criptografia", label: "O que é?", icon: BookOpen, emoji: "📚" },
  { path: "/cifra-cesar", label: "Cifra de César", icon: Zap, emoji: "🔤" },
  { path: "/simulador", label: "Simulador", icon: Lock, emoji: "🔐" },
  { path: "/desafios", label: "Desafios", icon: Gamepad2, emoji: "🎮" },
  { path: "/forca-bruta", label: "Quebrando Cifras", icon: Shield, emoji: "🔓" },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentIndex = navItems.findIndex((item) => item.path === location.pathname);
  const progress = currentIndex >= 0 ? ((currentIndex) / (navItems.length - 1)) * 100 : 0;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg" style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
                🔐
              </div>
              <span className="hidden sm:block" style={{ color: "#7C3AED", fontWeight: 800, fontSize: "1.25rem" }}>
                CriptoKids
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm"
                    style={{
                      background: isActive ? "linear-gradient(135deg, #7C3AED, #EC4899)" : "transparent",
                      color: isActive ? "white" : "#6B7280",
                      fontWeight: isActive ? 700 : 500,
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: "#7C3AED" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full rounded-full mb-1" style={{ background: "#E5E7EB" }}>
            <div
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #7C3AED, #EC4899, #F59E0B)",
              }}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: "#E5E7EB" }}>
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{
                      background: isActive ? "linear-gradient(135deg, #7C3AED, #EC4899)" : "#F9FAFB",
                      color: isActive ? "white" : "#374151",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center" style={{ background: "rgba(0,0,0,0.2)" }}>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
          🔐 CriptoKids — Aprendendo criptografia com diversão! 🎉
        </p>
      </footer>
    </div>
  );
}
