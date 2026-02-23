import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-4 w-4 text-gold" />
            </div>
            <span className="font-bold text-foreground">SkillBridge</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Connecting learners with expert mentors for meaningful skill development.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Platform</h4>
          <div className="space-y-2">
            <Link to="/skills" className="block text-sm text-muted-foreground hover:text-foreground">Browse Skills</Link>
            <Link to="/mentors" className="block text-sm text-muted-foreground hover:text-foreground">Find Mentors</Link>
            <Link to="/how-it-works" className="block text-sm text-muted-foreground hover:text-foreground">How It Works</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
          <div className="space-y-2">
            <span className="block text-sm text-muted-foreground">About</span>
            <span className="block text-sm text-muted-foreground">Careers</span>
            <span className="block text-sm text-muted-foreground">Contact</span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
          <div className="space-y-2">
            <span className="block text-sm text-muted-foreground">Privacy Policy</span>
            <span className="block text-sm text-muted-foreground">Terms of Service</span>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 SkillBridge. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
