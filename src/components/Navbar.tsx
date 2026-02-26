import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";
import { User } from "lucide-react";
// import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-gold" />
          </div>
          <span className="text-lg font-bold text-foreground">SkillBridge</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/skills" className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
            Browse Skills
          </Link>
          <Link to="/mentors" className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
            Find Mentors
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
            How It Works
          </Link>
          <Link to="/chat" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
            <MessageSquare className="h-4 w-4" />
            Messages
          </Link>
          <Button variant="gold" size="sm" asChild>
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="gold" size="sm" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3">
          <Link to="/skills" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Browse Skills</Link>
          <Link to="/mentors" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Find Mentors</Link>
          <Link to="/how-it-works" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>How It Works</Link>
          <Link to="/chat" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}><MessageSquare className="h-4 w-4" /> Messages</Link>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" size="sm" asChild><Link to="/login">Log in</Link></Button>
            <Button variant="gold" size="sm" asChild><Link to="/register">Get Started</Link></Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
