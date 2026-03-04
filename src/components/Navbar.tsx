import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, MessageSquare, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAuth, UserRole } from "@/context/AuthContext";
import { toast } from "sonner";

const DASHBOARD_MAP: Record<UserRole, string> = {
  learner: "/learner/dashboard",
  teacher: "/teacher/dashboard",
  admin: "/admin",
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/");
    setOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-gold" />
          </div>
          <span className="text-lg font-bold text-foreground">SkillBridge</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/sessions" className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
            Browse Sessions
          </Link>
          <Link to="/mentors" className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
            Find Mentors
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
            How It Works
          </Link>
          {isAuthenticated && (
            <Link to="/chat" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
              <MessageSquare className="h-4 w-4" />
              Messages
            </Link>
          )}

          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 rounded-xl border border-border bg-card shadow-lg py-1 z-50">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <Link
                    to={DASHBOARD_MAP[user.role]}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted/50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button variant="gold" size="sm" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3">
          <Link to="/sessions" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Browse Sessions</Link>
          <Link to="/mentors" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Find Mentors</Link>
          <Link to="/how-it-works" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>How It Works</Link>
          {isAuthenticated ? (
            <>
              <Link to={DASHBOARD_MAP[user!.role]} className="flex items-center gap-1.5 text-sm font-medium text-foreground" onClick={() => setOpen(false)}>
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
              <Link to="/chat" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>
                <MessageSquare className="h-4 w-4" /> Messages
              </Link>
              <button onClick={handleLogout} className="flex w-full items-center gap-1.5 text-sm font-medium text-rose-600">
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-2">
              <Button variant="ghost" size="sm" asChild><Link to="/login">Log in</Link></Button>
              <Button variant="gold" size="sm" asChild><Link to="/register">Get Started</Link></Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
