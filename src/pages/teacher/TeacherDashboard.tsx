import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useSessions } from "@/context/SessionsContext";
import {
  PlusCircle,
  LayoutList,
  Users,
  DollarSign,
  Settings,
  CheckCircle2,
  XCircle,
  HourglassIcon,
  Pencil,
  Trash2,
  Eye,
  TrendingUp,
  Info,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// ─── Mock Data ──────────────────────────────────────────────────────────────

interface TeacherSession {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: "Free" | "Paid";
  price?: number;
  category: string;
  enrolled: number;
  maxSeats: number;
  status: "Active" | "Completed" | "Draft";
}

const TEACHER_SESSIONS: TeacherSession[] = [
  { id: "ts1", title: "React Advanced Patterns", date: "Mar 10, 2026", time: "10:00 AM", duration: "90 min", type: "Paid", price: 29, category: "Web Development", enrolled: 14, maxSeats: 20, status: "Active" },
  { id: "ts2", title: "Responsive Web Design with Tailwind CSS", date: "Mar 20, 2026", time: "3:00 PM", duration: "75 min", type: "Free", category: "Web Development", enrolled: 28, maxSeats: 40, status: "Active" },
  { id: "ts3", title: "Tailwind Responsive Design", date: "Feb 20, 2026", time: "3:00 PM", duration: "75 min", type: "Free", category: "Web Development", enrolled: 35, maxSeats: 40, status: "Completed" },
  { id: "ts4", title: "TypeScript Deep Dive", date: "Mar 25, 2026", time: "11:00 AM", duration: "90 min", type: "Paid", price: 25, category: "Web Development", enrolled: 0, maxSeats: 25, status: "Draft" },
];

interface BookingRequest {
  id: string;
  learner: string;
  email: string;
  session: string;
  requestDate: string;
  type: "Free" | "Paid";
  price?: number;
  status: "Pending" | "Approved" | "Rejected";
}

const BOOKING_REQUESTS: BookingRequest[] = [
  { id: "br1", learner: "Alex Learner", email: "learner@demo.com", session: "React Advanced Patterns", requestDate: "Mar 2, 2026", type: "Paid", price: 29, status: "Approved" },
  { id: "br2", learner: "Priya Sharma", email: "learner2@demo.com", session: "React Advanced Patterns", requestDate: "Mar 3, 2026", type: "Paid", price: 29, status: "Pending" },
  { id: "br3", learner: "Daniel Park", email: "dpark@example.com", session: "Responsive Web Design with Tailwind CSS", requestDate: "Mar 4, 2026", type: "Free", status: "Pending" },
  { id: "br4", learner: "Maria Santos", email: "msantos@example.com", session: "React Advanced Patterns", requestDate: "Mar 1, 2026", type: "Paid", price: 29, status: "Rejected" },
];

const EARNINGS = [
  { month: "January 2026", sessions: 3, learners: 28, revenue: 812 },
  { month: "February 2026", sessions: 4, learners: 37, revenue: 1073 },
  { month: "March 2026", sessions: 2, learners: 14, revenue: 406 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Completed: "bg-slate-100 text-slate-600 border-slate-200",
    Draft: "bg-blue-100 text-blue-700 border-blue-200",
    Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Rejected: "bg-rose-100 text-rose-700 border-rose-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
};

// ─── Tabs ────────────────────────────────────────────────────────────────────

type Tab = "create" | "sessions" | "bookings" | "earnings" | "profile";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "create", label: "Create Session", icon: PlusCircle },
  { id: "sessions", label: "Manage Sessions", icon: LayoutList },
  { id: "bookings", label: "Booking Requests", icon: Users },
  { id: "earnings", label: "Earnings", icon: DollarSign },
  { id: "profile", label: "Profile Settings", icon: Settings },
];

// ─── Tab Panels ──────────────────────────────────────────────────────────────

const CreateSessionTab = () => {
  const { addSession } = useSessions();
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "60",
    category: "Web Development",
    type: "Free" as "Free" | "Paid",
    price: "",
    maxSeats: "20",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Format "2026-03-10" → "Mar 10, 2026"
    const dateObj = new Date(form.date + "T00:00:00");
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Format "14:00" → "2:00 PM"
    const [h, m] = form.time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedTime = `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;

    addSession({
      title: form.title,
      teacher: user?.name ?? "Teacher",
      teacherId: user?.id ?? "0",
      date: formattedDate,
      time: formattedTime,
      duration: `${form.duration} min`,
      type: form.type,
      price: form.type === "Paid" && form.price ? Number(form.price) : undefined,
      category: form.category,
      description: form.description || "No description provided.",
      maxSeats: Number(form.maxSeats),
    });

    toast.success(`Session "${form.title}" created and published successfully!`);
    setForm({ title: "", description: "", date: "", time: "", duration: "60", category: "Web Development", type: "Free", price: "", maxSeats: "20" });
  };

  return (
    <div className="max-w-2xl">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-5 text-lg font-bold text-foreground">Create New Session</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Session Title *</Label>
            <Input placeholder="e.g. React Advanced Patterns" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea placeholder="What will learners gain from this session?" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Date *</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Time *</Label>
              <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Duration (minutes)</Label>
              <Input type="number" min="15" max="360" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Max Seats</Label>
              <Input type="number" min="1" max="500" value={form.maxSeats} onChange={(e) => setForm({ ...form, maxSeats: e.target.value })} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {["Web Development", "Design", "Data Science", "Backend", "Mobile", "DevOps"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Session Type</Label>
              <div className="flex gap-3">
                {(["Free", "Paid"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, type: t })}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                      form.type === t
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {form.type === "Paid" && (
            <div className="space-y-1.5">
              <Label>Price (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input className="pl-7" type="number" min="1" placeholder="29" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
            </div>
          )}
          <Button type="submit" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Session
          </Button>
        </form>
      </div>
    </div>
  );
};

const ManageSessionsTab = () => {
  const [sessions, setSessions] = useState<TeacherSession[]>(TEACHER_SESSIONS);
  return (
    <div className="space-y-3">
      {sessions.map((s) => (
        <div key={s.id} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground">{s.title}</h3>
              <StatusBadge status={s.status} />
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium border ${s.type === "Free" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                {s.type === "Paid" ? `$${s.price}` : "Free"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{s.category} · {s.date} at {s.time} · {s.duration}</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.round((s.enrolled / s.maxSeats) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{s.enrolled}/{s.maxSeats} enrolled</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.info("Edit session (coming soon)")}><Pencil className="h-3.5 w-3.5" /></Button>
            <Button variant="outline" size="sm" onClick={() => setSessions(sessions.filter(x => x.id !== s.id))} className="text-rose-500 hover:text-rose-600"><Trash2 className="h-3.5 w-3.5" /></Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const BookingRequestsTab = () => {
  const [requests, setRequests] = useState<BookingRequest[]>(BOOKING_REQUESTS);

  const updateStatus = (id: string, status: "Approved" | "Rejected") => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    toast.success(`Request ${status.toLowerCase()} successfully.`);
  };

  return (
    <div className="space-y-3">
      {requests.map((r) => (
        <div key={r.id} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {r.learner.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground">{r.learner}</p>
                <p className="text-xs text-muted-foreground">{r.email}</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-foreground">{r.session}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium border ${r.type === "Free" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                {r.type === "Paid" ? `$${r.price}` : "Free"}
              </span>
              <span className="text-xs text-muted-foreground">Requested {r.requestDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={r.status} />
            {r.status === "Pending" && (
              <>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => updateStatus(r.id, "Approved")}>
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />Approve
                </Button>
                <Button size="sm" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50" onClick={() => updateStatus(r.id, "Rejected")}>
                  <XCircle className="mr-1.5 h-3.5 w-3.5" />Reject
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const EarningsTab = () => {
  const totalRevenue = EARNINGS.reduce((a, e) => a + e.revenue, 0);
  const totalSessions = EARNINGS.reduce((a, e) => a + e.sessions, 0);
  const totalLearners = EARNINGS.reduce((a, e) => a + e.learners, 0);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600 bg-emerald-100" },
          { label: "Total Sessions", value: totalSessions, icon: LayoutList, color: "text-violet-600 bg-violet-100" },
          { label: "Total Learners", value: totalLearners, icon: Users, color: "text-blue-600 bg-blue-100" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold text-card-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border bg-muted/30 px-4 py-3">
          <h3 className="font-semibold text-foreground">Monthly Breakdown</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Month</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Sessions</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Learners</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {EARNINGS.map((e) => (
              <tr key={e.month} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{e.month}</td>
                <td className="px-4 py-3 text-muted-foreground">{e.sessions}</td>
                <td className="px-4 py-3 text-muted-foreground">{e.learners}</td>
                <td className="px-4 py-3 font-semibold text-emerald-600">${e.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProfileSettingsTab = ({ name, email, approvalStatus }: { name: string; email: string; approvalStatus?: string }) => {
  const [form, setForm] = useState({
    name,
    email,
    bio: "Expert web developer with 8+ years of experience in React and modern JavaScript ecosystems.",
    expertise: "React, TypeScript, Node.js, Tailwind CSS",
    phone: "+1 (555) 123-4567",
  });
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-3xl font-extrabold text-white">
            {name.charAt(0).toUpperCase()}
          </div>
          <h3 className="font-bold text-foreground">{name}</h3>
          <p className="text-xs text-muted-foreground">{email}</p>
          <div className="mt-2 flex justify-center gap-2">
            <Badge className="bg-violet-100 text-violet-700 border-violet-200">Teacher</Badge>
            <Badge className={approvalStatus === "approved" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-amber-100 text-amber-700 border-amber-200"}>
              {approvalStatus === "approved" ? "Approved" : "Pending Approval"}
            </Badge>
          </div>
          {approvalStatus !== "approved" && (
            <div className="mt-3 flex items-start gap-1.5 rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs text-amber-700 text-left dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
              <HourglassIcon className="mt-0.5 h-3 w-3 shrink-0" />
              Your account is awaiting admin approval before you can create sessions.
            </div>
          )}
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 font-bold text-foreground">Profile Settings</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Expertise / Skills</Label>
              <Input value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} />
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            <Label>Bio</Label>
            <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} />
          </div>
          <Button className="mt-5" onClick={() => toast.success("Profile updated!")}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("sessions");
  const { user } = useAuth();

  const isApproved = user?.approvalStatus === "approved";

  const stats = [
    { label: "Total Sessions", value: TEACHER_SESSIONS.filter(s => s.status !== "Draft").length, color: "text-violet-600 bg-violet-100" },
    { label: "Active Sessions", value: TEACHER_SESSIONS.filter(s => s.status === "Active").length, color: "text-blue-600 bg-blue-100" },
    { label: "Total Learners", value: TEACHER_SESSIONS.reduce((a, s) => a + s.enrolled, 0), color: "text-emerald-600 bg-emerald-100" },
    { label: "Total Earnings", value: `$${EARNINGS.reduce((a, e) => a + e.revenue, 0).toLocaleString()}`, color: "text-amber-600 bg-amber-100" },
  ];

  const renderTab = () => {
    if (!isApproved && activeTab !== "profile") {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-12 text-center dark:border-amber-800 dark:bg-amber-950">
          <HourglassIcon className="mb-4 h-10 w-10 text-amber-500" />
          <h3 className="text-lg font-bold text-amber-700 dark:text-amber-300">Pending Admin Approval</h3>
          <p className="mt-1 text-sm text-amber-600 dark:text-amber-400 max-w-sm">
            Your teacher account is under review. Once an admin approves your account, you'll be able to create and manage sessions.
          </p>
        </div>
      );
    }
    switch (activeTab) {
      case "create": return <CreateSessionTab />;
      case "sessions": return <ManageSessionsTab />;
      case "bookings": return <BookingRequestsTab />;
      case "earnings": return <EarningsTab />;
      case "profile": return <ProfileSettingsTab name={user?.name ?? ""} email={user?.email ?? ""} approvalStatus={user?.approvalStatus} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-extrabold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">Welcome, {user?.name}</h1>
              <p className="text-sm text-muted-foreground">
                Teacher Dashboard ·{" "}
                <span className={isApproved ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>
                  {isApproved ? "Approved" : "Pending Approval"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <p className="text-2xl font-extrabold text-card-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === t.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <t.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {renderTab()}
      </div>
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
