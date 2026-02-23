import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
            <Button variant="gold" className="w-full" type="submit">Sign In</Button>
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
