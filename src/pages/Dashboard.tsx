import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, BookOpen, Star, Award, Clock, CreditCard, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: BookOpen, label: "Enrolled Sessions", value: "12" },
  { icon: Clock, label: "Hours Learned", value: "34" },
  { icon: Award, label: "Certificates", value: "3" },
  { icon: Star, label: "Avg Rating Given", value: "4.8" },
];

const upcomingSessions = [
  { title: "React Advanced Patterns", mentor: "Sarah Chen", date: "Feb 25, 2026", time: "10:00 AM", status: "confirmed" },
  { title: "UI/UX Design Review", mentor: "Marcus Johnson", date: "Feb 27, 2026", time: "2:00 PM", status: "pending" },
];

const Dashboard = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's your learning overview.</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold text-card-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-bold text-card-foreground">Upcoming Sessions</h2>
        <div className="space-y-3">
          {upcomingSessions.map((s) => (
            <div key={s.title} className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
              <div>
                <h3 className="font-semibold text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground">with {s.mentor} · {s.date} at {s.time}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  s.status === "confirmed" ? "bg-success/15 text-success" : "bg-gold/15 text-gold-dark"
                }`}>
                  {s.status}
                </span>
                <Button variant="outline" size="sm">Join</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Dashboard;
