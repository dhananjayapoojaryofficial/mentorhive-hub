import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Eye, EyeOff, GraduationCap, BookMarked, AlertCircle, Info } from "lucide-react";
import { useAuth, UserRole } from "@/context/AuthContext";
import { toast } from "sonner";

const roles = [
  { value: "learner" as UserRole, label: "Learner", icon: GraduationCap, desc: "Find mentors and learn new skills" },
  { value: "teacher" as UserRole, label: "Teacher", icon: BookMarked, desc: "Share expertise, pending admin approval" },
] as const;

const DASHBOARD_MAP: Record<UserRole, string> = {
  learner: "/learner/dashboard",
  teacher: "/teacher/dashboard",
  admin: "/admin",
};

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<UserRole>("learner");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 hero-gradient items-center justify-center lg:flex">
        <div className="max-w-md px-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/15">
            <BookOpen className="h-8 w-8 text-gold" />
          </div>
          <h2 className="mb-4 text-3xl font-extrabold text-primary-foreground">Join SkillBridge</h2>
          <p className="text-primary-foreground/60">
            Start your journey as a learner or share your expertise as a mentor.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-4 w-4 text-gold" />
            </div>
            <span className="font-bold">SkillBridge</span>
          </Link>

          <h1 className="mb-2 text-2xl font-extrabold text-foreground">Create Account</h1>
          <p className="mb-6 text-sm text-muted-foreground">Choose your role and get started</p>

          {/* Role selector */}
          <div className="mb-6 grid grid-cols-2 gap-2">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all ${
                  role === r.value
                    ? "border-gold bg-gold/5 text-gold-dark"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30"
                }`}
              >
                <r.icon className="h-5 w-5" />
                <span className="text-xs font-semibold">{r.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
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
            <Button variant="gold" className="w-full" type="submit" disabled={loading} onClick={async (e) => {
              e.preventDefault();
              setError("");
              if (!name || !email || !password) { setError("Please fill in all fields."); return; }
              setLoading(true);
              const result = await register(name, email, password, role);
              setLoading(false);
              if (!result.success) { setError(result.error ?? "Registration failed."); return; }
              toast.success(role === "teacher"
                ? "Account created! Your teacher account is pending admin approval."
                : "Account created! Welcome to SkillBridge.");
              navigate(DASHBOARD_MAP[role], { replace: true });
            }}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {error && (
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />{error}
            </div>
          )}

          {role === "teacher" && (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Teacher accounts require admin approval before you can create sessions.
            </div>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-gold-dark hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
