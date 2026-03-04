import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth, UserRole } from "@/context/AuthContext";
import { toast } from "sonner";

const DASHBOARD_MAP: Record<UserRole, string> = {
  learner: "/learner/dashboard",
  teacher: "/teacher/dashboard",
  admin: "/admin",
};

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? "Login failed.");
      return;
    }
    // Re-read user from localStorage to get role for redirect
    const stored = localStorage.getItem("mentorhive_user");
    if (stored) {
      const u = JSON.parse(stored);
      toast.success(`Welcome back, ${u.name}!`);
      navigate(from ?? DASHBOARD_MAP[u.role as UserRole], { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 hero-gradient items-center justify-center lg:flex">
        <div className="max-w-md px-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/15">
            <BookOpen className="h-8 w-8 text-gold" />
          </div>
          <h2 className="mb-4 text-3xl font-extrabold text-primary-foreground">Welcome Back</h2>
          <p className="text-primary-foreground/60">
            Continue your learning journey and connect with expert mentors.
          </p>
          <div className="mt-8 rounded-xl bg-white/10 p-4 text-left text-sm text-white/80">
            <p className="mb-2 font-bold text-white">Demo accounts:</p>
            <p>learner@demo.com</p>
            <p>teacher@demo.com</p>
            <p>admin@demo.com</p>
            <p className="mt-1 text-white/60">(any password works)</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-4 w-4 text-gold" />
            </div>
            <span className="font-bold">SkillBridge</span>
          </Link>

          <h1 className="mb-2 text-2xl font-extrabold text-foreground">Sign In</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button variant="gold" className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-gold-dark hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
