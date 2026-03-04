import AdminLayout from "@/components/admin/AdminLayout";
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  TrendingUp,
  Calendar,
  Star,
  Activity,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MONTHLY_STATS = [
  { month: "Oct 2025", users: 1820, teachers: 210, sessions: 18, revenue: 3240 },
  { month: "Nov 2025", users: 2010, teachers: 248, sessions: 24, revenue: 4120 },
  { month: "Dec 2025", users: 2200, teachers: 280, sessions: 30, revenue: 5650 },
  { month: "Jan 2026", users: 2420, teachers: 310, sessions: 36, revenue: 6980 },
  { month: "Feb 2026", users: 2680, teachers: 342, sessions: 44, revenue: 8350 },
  { month: "Mar 2026", users: 2847, teachers: 384, sessions: 52, revenue: 9680 },
];

const TOP_TEACHERS = [
  { name: "Sarah Chen", category: "Web Development", sessions: 148, learners: 1240, revenue: 3604, rating: 4.9 },
  { name: "Marcus Johnson", category: "UI/UX Design", sessions: 132, learners: 1089, revenue: 0, rating: 4.8 },
  { name: "Aisha Patel", category: "Data Science", sessions: 119, learners: 987, revenue: 4641, rating: 4.9 },
  { name: "James Liu", category: "Backend", sessions: 94, learners: 772, revenue: 3290, rating: 4.7 },
  { name: "Dr. Priya Kapoor", category: "Data Science", sessions: 86, learners: 703, revenue: 3354, rating: 4.8 },
];

const TOP_SESSIONS = [
  { title: "Introduction to Machine Learning", teacher: "Dr. Priya Kapoor", enrollments: 320, rating: 4.9, type: "Free" },
  { title: "React Advanced Patterns", teacher: "Sarah Chen", enrollments: 280, rating: 4.9, type: "Paid" },
  { title: "UI/UX Design Fundamentals", teacher: "Marcus Johnson", enrollments: 260, rating: 4.8, type: "Free" },
  { title: "Python for Data Science", teacher: "Dr. Priya Kapoor", enrollments: 240, rating: 4.8, type: "Paid" },
];

const maxRevenue = Math.max(...MONTHLY_STATS.map(s => s.revenue));

export default function AdminReports() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">System Reports</h2>
            <p className="text-sm text-muted-foreground">Platform analytics and performance overview</p>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1.5" onClick={() => toast.info("Export feature coming soon.")}>
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>

        {/* KPI Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600 bg-blue-100" },
            { label: "Active Teachers", value: "384", change: "+5%", icon: GraduationCap, color: "text-violet-600 bg-violet-100" },
            { label: "Total Sessions", value: "204", change: "+18%", icon: BookOpen, color: "text-emerald-600 bg-emerald-100" },
            { label: "Platform Revenue", value: "$9,680", change: "+16%", icon: DollarSign, color: "text-amber-600 bg-amber-100" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-border bg-card p-5">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${kpi.color}`}>
                <kpi.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-extrabold text-card-foreground">{kpi.value}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                  <TrendingUp className="h-3 w-3" />{kpi.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart (visual bar chart) */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-5 font-bold text-foreground">Monthly Revenue Trend</h3>
          <div className="flex items-end gap-2 h-40">
            {MONTHLY_STATS.map((s) => (
              <div key={s.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-semibold text-foreground">${(s.revenue / 1000).toFixed(1)}k</span>
                <div
                  className="w-full rounded-t-lg bg-primary/80 hover:bg-primary transition-colors"
                  style={{ height: `${Math.round((s.revenue / maxRevenue) * 100)}%` }}
                />
                <span className="text-xs text-muted-foreground rotate-[-45deg] origin-left mt-2 hidden sm:block" style={{ fontSize: "0.6rem" }}>{s.month.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border bg-muted/30 px-4 py-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2"><Calendar className="h-4 w-4" /> Monthly Breakdown</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Month</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Users</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Teachers</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Sessions</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MONTHLY_STATS.map((m) => (
                <tr key={m.month} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{m.month}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.users.toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.teachers}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.sessions}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">${m.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top teachers & sessions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Teachers */}
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border bg-muted/30 px-4 py-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2"><Star className="h-4 w-4 text-amber-500" /> Top Performing Teachers</h3>
            </div>
            <div className="divide-y divide-border">
              {TOP_TEACHERS.map((t, i) => (
                <div key={t.name} className="flex items-center gap-3 px-4 py-3">
                  <span className="w-5 text-center text-xs font-bold text-muted-foreground">#{i + 1}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{t.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.category} · {t.sessions} sessions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{t.learners} learners</p>
                    <p className="flex items-center gap-0.5 justify-end text-xs text-amber-600"><Star className="h-3 w-3 fill-amber-400" />{t.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Sessions */}
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border bg-muted/30 px-4 py-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2"><Activity className="h-4 w-4 text-blue-500" /> Most Popular Sessions</h3>
            </div>
            <div className="divide-y divide-border">
              {TOP_SESSIONS.map((s, i) => (
                <div key={s.title} className="flex items-center gap-3 px-4 py-3">
                  <span className="w-5 text-center text-xs font-bold text-muted-foreground">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.teacher}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{s.enrollments} enrolled</p>
                    <div className="flex items-center gap-1 justify-end">
                      <span className={`rounded-full px-1.5 py-0 text-xs font-medium ${s.type === "Free" ? "text-emerald-600" : "text-amber-600"}`}>{s.type}</span>
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-amber-600">{s.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
