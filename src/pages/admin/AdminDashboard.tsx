import AdminLayout from "@/components/admin/AdminLayout";
import {
  Users,
  GraduationCap,
  UserCheck,
  BookOpen,
  CalendarCheck,
  DollarSign,
  Clock,
  Activity,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";

const summaryCards = [
  {
    label: "Total Users",
    value: "2,847",
    change: "+12%",
    up: true,
    icon: Users,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    label: "Total Teachers",
    value: "384",
    change: "+5%",
    up: true,
    icon: GraduationCap,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    label: "Total Learners",
    value: "2,463",
    change: "+14%",
    up: true,
    icon: UserCheck,
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    label: "Total Skills",
    value: "142",
    change: "+3%",
    up: true,
    icon: BookOpen,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    label: "Total Bookings",
    value: "7,291",
    change: "+8%",
    up: true,
    icon: CalendarCheck,
    color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    label: "Total Revenue",
    value: "$48,320",
    change: "+18%",
    up: true,
    icon: DollarSign,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Pending Approvals",
    value: "23",
    change: "-4%",
    up: false,
    icon: Clock,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    label: "Active Sessions",
    value: "61",
    change: "+9%",
    up: true,
    icon: Activity,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
];

const recentActivity = [
  { type: "New User", description: "Priya Sharma registered as a Learner", time: "2 min ago", dot: "bg-green-500" },
  { type: "Teacher Approval", description: "Raj Patel submitted teaching application", time: "15 min ago", dot: "bg-orange-500" },
  { type: "Booking", description: "Session booked: React Advanced — Sarah Chen", time: "34 min ago", dot: "bg-blue-500" },
  { type: "Payment", description: "Revenue received: $120 from session #4820", time: "1 hr ago", dot: "bg-emerald-500" },
  { type: "Skill Added", description: "New skill 'Rust Programming' submitted", time: "2 hr ago", dot: "bg-violet-500" },
  { type: "User Suspended", description: "User @fakementor99 was deactivated", time: "3 hr ago", dot: "bg-rose-500" },
  { type: "Booking Cancelled", description: "Session #4811 cancelled by learner", time: "5 hr ago", dot: "bg-amber-500" },
];

const topTeachers = [
  { name: "Sarah Chen", skill: "React / Frontend", sessions: 148, rating: 4.9 },
  { name: "Marcus Johnson", skill: "UI/UX Design", sessions: 132, rating: 4.8 },
  { name: "Aisha Patel", skill: "Data Science", sessions: 119, rating: 4.9 },
  { name: "Luca Ferrara", skill: "Node.js / Backend", sessions: 97, rating: 4.7 },
  { name: "Kim Jae-won", skill: "Machine Learning", sessions: 88, rating: 4.8 },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-extrabold text-foreground">Dashboard Overview</h2>
          <p className="text-sm text-muted-foreground">System-wide summary — February 24, 2026</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    card.up ? "text-green-600 dark:text-green-400" : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {card.up ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {card.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-card-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-card-foreground">Recent Activity</h3>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Live
              </span>
            </div>
            <ol className="relative border-l border-border ml-3 space-y-4">
              {recentActivity.map((item, i) => (
                <li key={i} className="ml-4">
                  <span
                    className={`absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-card ${item.dot}`}
                  />
                  <div>
                    <span className="text-xs font-semibold text-primary">{item.type}</span>
                    <p className="text-sm text-foreground">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Top Teachers */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-card-foreground">Top Teachers</h3>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-semibold uppercase text-muted-foreground">
                  <th className="pb-2">Teacher</th>
                  <th className="pb-2">Skill</th>
                  <th className="pb-2 text-right">Sessions</th>
                  <th className="pb-2 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {topTeachers.map((t) => (
                  <tr key={t.name} className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 font-medium text-foreground">{t.name}</td>
                    <td className="py-3 text-muted-foreground">{t.skill}</td>
                    <td className="py-3 text-right font-semibold">{t.sessions}</td>
                    <td className="py-3 text-right">
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        ★ {t.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
