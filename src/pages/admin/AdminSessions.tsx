import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, Eye, XCircle, CheckCircle2, Video, Clock, Users, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface AdminSession {
  id: string;
  title: string;
  teacher: string;
  teacherEmail: string;
  date: string;
  time: string;
  duration: string;
  type: "Free" | "Paid";
  price?: number;
  category: string;
  enrolled: number;
  maxSeats: number;
  status: "Active" | "Completed" | "Cancelled" | "Draft";
}

const SESSIONS: AdminSession[] = [
  { id: "s1", title: "React Advanced Patterns", teacher: "Sarah Chen", teacherEmail: "sarah@example.com", date: "Mar 10, 2026", time: "10:00 AM", duration: "90 min", type: "Paid", price: 29, category: "Web Development", enrolled: 14, maxSeats: 20, status: "Active" },
  { id: "s2", title: "UI/UX Design Fundamentals", teacher: "Marcus Johnson", teacherEmail: "marcus@example.com", date: "Mar 12, 2026", time: "2:00 PM", duration: "60 min", type: "Free", category: "Design", enrolled: 22, maxSeats: 30, status: "Active" },
  { id: "s3", title: "Python for Data Science", teacher: "Dr. Priya Kapoor", teacherEmail: "priya@example.com", date: "Mar 14, 2026", time: "11:00 AM", duration: "120 min", type: "Paid", price: 39, category: "Data Science", enrolled: 18, maxSeats: 25, status: "Active" },
  { id: "s4", title: "Node.js REST API Masterclass", teacher: "James Liu", teacherEmail: "james@example.com", date: "Mar 16, 2026", time: "4:00 PM", duration: "90 min", type: "Paid", price: 35, category: "Backend", enrolled: 10, maxSeats: 15, status: "Active" },
  { id: "s5", title: "Introduction to Machine Learning", teacher: "Dr. Priya Kapoor", teacherEmail: "priya@example.com", date: "Mar 18, 2026", time: "9:00 AM", duration: "60 min", type: "Free", category: "Data Science", enrolled: 41, maxSeats: 50, status: "Active" },
  { id: "s6", title: "Tailwind Responsive Design", teacher: "Sarah Chen", teacherEmail: "sarah@example.com", date: "Feb 20, 2026", time: "3:00 PM", duration: "75 min", type: "Free", category: "Web Development", enrolled: 35, maxSeats: 40, status: "Completed" },
  { id: "s7", title: "TypeScript Deep Dive", teacher: "Sarah Chen", teacherEmail: "sarah@example.com", date: "Mar 25, 2026", time: "11:00 AM", duration: "90 min", type: "Paid", price: 25, category: "Web Development", enrolled: 0, maxSeats: 25, status: "Draft" },
  { id: "s8", title: "Spam Crypto Scheme", teacher: "Fake Mentor99", teacherEmail: "fakementor99@example.com", date: "Mar 5, 2026", time: "8:00 PM", duration: "30 min", type: "Paid", price: 500, category: "Other", enrolled: 2, maxSeats: 100, status: "Active" },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Completed: "bg-slate-100 text-slate-600 border-slate-200",
  Cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  Draft: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function AdminSessions() {
  const [sessions, setSessions] = useState<AdminSession[]>(SESSIONS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = sessions.filter((s) => {
    const q = search.toLowerCase();
    return (
      (s.title.toLowerCase().includes(q) || s.teacher.toLowerCase().includes(q)) &&
      (statusFilter === "All" || s.status === statusFilter) &&
      (typeFilter === "All" || s.type === typeFilter)
    );
  });

  const cancelSession = (id: string) => {
    setSessions((prev) => prev.map((s) => s.id === id ? { ...s, status: "Cancelled" as const } : s));
    toast.success("Session cancelled.");
  };

  const stats = [
    { label: "Total Sessions", value: sessions.length, icon: Video, color: "text-violet-600 bg-violet-100" },
    { label: "Active Now", value: sessions.filter(s => s.status === "Active").length, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-100" },
    { label: "Completed", value: sessions.filter(s => s.status === "Completed").length, icon: Clock, color: "text-blue-600 bg-blue-100" },
    { label: "Total Enrolled", value: sessions.reduce((a, s) => a + s.enrolled, 0), icon: Users, color: "text-amber-600 bg-amber-100" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-foreground">Session Monitoring</h2>
          <p className="text-sm text-muted-foreground">Monitor and manage all platform sessions</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4">
              <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${s.color}`}>
                <s.icon className="h-4.5 w-4.5" />
              </div>
              <p className="text-xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search sessions or teachers..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            {["All", "Active", "Completed", "Cancelled", "Draft"].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}>{s}</button>
            ))}
          </div>
          <div className="flex gap-2">
            {["All", "Free", "Paid"].map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${typeFilter === t ? "bg-gold text-white" : "bg-muted text-muted-foreground hover:bg-gold/10"}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Session</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Teacher</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden lg:table-cell">Date / Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Enrollment</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.category} · {s.type === "Paid" ? `$${s.price}` : "Free"}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-foreground">{s.teacher}</p>
                    <p className="text-xs text-muted-foreground">{s.teacherEmail}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{s.date} · {s.time}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round((s.enrolled / s.maxSeats) * 100)}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{s.enrolled}/{s.maxSeats}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[s.status]}`}>{s.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => toast.info("Session details (coming soon)")}><Eye className="h-3.5 w-3.5" /></Button>
                      {s.status === "Active" && (
                        <Button variant="outline" size="sm" className="text-rose-500 hover:text-rose-600" onClick={() => cancelSession(s.id)}><XCircle className="h-3.5 w-3.5" /></Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">No sessions match the current filters.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
