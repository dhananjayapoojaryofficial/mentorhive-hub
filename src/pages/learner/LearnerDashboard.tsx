import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen,
  Clock,
  Award,
  CreditCard,
  User,
  Calendar,
  CheckCircle2,
  XCircle,
  HourglassIcon,
  Download,
  Star,
  Play,
  ChevronRight,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const BOOKING_REQUESTS = [
  { id: "b1", session: "React Advanced Patterns", teacher: "Sarah Chen", date: "Mar 10, 2026", time: "10:00 AM", type: "Paid", price: 29, status: "Approved" },
  { id: "b2", session: "UI/UX Design Fundamentals", teacher: "Marcus Johnson", date: "Mar 12, 2026", time: "2:00 PM", type: "Free", status: "Pending" },
  { id: "b3", session: "Python for Data Science", teacher: "Dr. Priya Kapoor", date: "Mar 14, 2026", time: "11:00 AM", type: "Paid", price: 39, status: "Rejected" },
  { id: "b4", session: "Node.js REST API Masterclass", teacher: "James Liu", date: "Mar 16, 2026", time: "4:00 PM", type: "Paid", price: 35, status: "Approved" },
];

const MY_SESSIONS = [
  { id: "ms1", session: "React Advanced Patterns", teacher: "Sarah Chen", date: "Mar 10, 2026", time: "10:00 AM", duration: "90 min", status: "Upcoming" },
  { id: "ms2", session: "Node.js REST API Masterclass", teacher: "James Liu", date: "Mar 16, 2026", time: "4:00 PM", duration: "90 min", status: "Upcoming" },
  { id: "ms3", session: "Tailwind Responsive Design", teacher: "Sarah Chen", date: "Feb 20, 2026", time: "3:00 PM", duration: "75 min", status: "Completed" },
  { id: "ms4", session: "Git & GitHub Basics", teacher: "James Liu", date: "Feb 10, 2026", time: "11:00 AM", duration: "60 min", status: "Completed" },
];

const PAYMENTS = [
  { id: "p1", session: "React Advanced Patterns", teacher: "Sarah Chen", date: "Mar 1, 2026", amount: 29, status: "Paid", txId: "TXN-2026-001" },
  { id: "p2", session: "Node.js REST API Masterclass", teacher: "James Liu", date: "Mar 3, 2026", amount: 35, status: "Paid", txId: "TXN-2026-002" },
  { id: "p3", session: "Python for Data Science", teacher: "Dr. Priya Kapoor", date: "Feb 28, 2026", amount: 39, status: "Refunded", txId: "TXN-2026-003" },
];

const CERTIFICATES = [
  { id: "c1", course: "Tailwind Responsive Design", teacher: "Sarah Chen", issueDate: "Feb 21, 2026", grade: "A" },
  { id: "c2", course: "Git & GitHub Basics", teacher: "James Liu", issueDate: "Feb 11, 2026", grade: "A+" },
];

// ─── Status Badge ────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Rejected: "bg-rose-100 text-rose-700 border-rose-200",
    Paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Refunded: "bg-blue-100 text-blue-700 border-blue-200",
    Upcoming: "bg-violet-100 text-violet-700 border-violet-200",
    Completed: "bg-slate-100 text-slate-600 border-slate-200",
  };
  const icons: Record<string, JSX.Element> = {
    Approved: <CheckCircle2 className="mr-1 h-3 w-3" />,
    Pending: <HourglassIcon className="mr-1 h-3 w-3" />,
    Rejected: <XCircle className="mr-1 h-3 w-3" />,
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? "bg-muted text-muted-foreground"}`}>
      {icons[status]}
      {status}
    </span>
  );
};

// ─── Tabs ────────────────────────────────────────────────────────────────────

type Tab = "bookings" | "sessions" | "payments" | "certificates" | "profile";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "bookings", label: "Booking Requests", icon: Calendar },
  { id: "sessions", label: "My Sessions", icon: Video },
  { id: "payments", label: "Payment History", icon: CreditCard },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "profile", label: "Profile", icon: User },
];

// ─── Individual tab panels ────────────────────────────────────────────────────

const BookingsTab = () => (
  <div className="space-y-3">
    {BOOKING_REQUESTS.map((b) => (
      <div key={b.id} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{b.session}</h3>
          <p className="text-xs text-muted-foreground">with {b.teacher} · {b.date} at {b.time}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium border ${b.type === "Free" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
              {b.type === "Paid" ? `$${b.price}` : "Free"}
            </span>
          </div>
        </div>
        <StatusBadge status={b.status} />
      </div>
    ))}
  </div>
);

const SessionsTab = () => (
  <div className="space-y-3">
    {MY_SESSIONS.map((s) => (
      <div key={s.id} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate">{s.session}</h3>
          </div>
          <p className="text-xs text-muted-foreground">with {s.teacher} · {s.date} at {s.time} · {s.duration}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={s.status} />
          {s.status === "Upcoming" && (
            <Button size="sm" className="flex items-center gap-1.5">
              <Play className="h-3.5 w-3.5" /> Join
            </Button>
          )}
        </div>
      </div>
    ))}
  </div>
);

const PaymentsTab = () => (
  <div className="overflow-hidden rounded-xl border border-border bg-card">
    <table className="w-full text-sm">
      <thead className="border-b border-border bg-muted/30">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Session</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Date</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Amount</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Tx ID</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {PAYMENTS.map((p) => (
          <tr key={p.id} className="hover:bg-muted/20 transition-colors">
            <td className="px-4 py-3">
              <p className="font-medium text-foreground">{p.session}</p>
              <p className="text-xs text-muted-foreground">{p.teacher}</p>
            </td>
            <td className="px-4 py-3 text-muted-foreground">{p.date}</td>
            <td className="px-4 py-3 font-semibold text-foreground">${p.amount}</td>
            <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
            <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.txId}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="border-t border-border bg-muted/10 px-4 py-3 text-right text-sm">
      <span className="text-muted-foreground">Total paid: </span>
      <span className="font-bold text-foreground">
        ${PAYMENTS.filter(p => p.status === "Paid").reduce((acc, p) => acc + p.amount, 0)}
      </span>
    </div>
  </div>
);

const CertificatesTab = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    {CERTIFICATES.map((c) => (
      <div key={c.id} className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-amber-500/5" />
        <div className="relative flex items-start justify-between">
          <div>
            <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15">
              <Award className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="mt-2 font-bold text-foreground">{c.course}</h3>
            <p className="text-xs text-muted-foreground">Issued by {c.teacher} · {c.issueDate}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Grade: {c.grade}
              </span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="mt-4 flex items-center gap-1.5 w-full justify-center">
          <Download className="h-3.5 w-3.5" /> Download Certificate
        </Button>
      </div>
    ))}
    {CERTIFICATES.length === 0 && (
      <div className="col-span-2 rounded-xl border border-dashed border-border p-12 text-center">
        <Award className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
        <p className="text-muted-foreground">No certificates yet. Complete sessions to earn certificates.</p>
      </div>
    )}
  </div>
);

const ProfileTab = ({ name, email }: { name: string; email: string }) => {
  const [form, setForm] = useState({ name, email, bio: "Passionate learner exploring web development and design.", phone: "+1 (555) 234-5678" });
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-extrabold text-primary-foreground">
            {name.charAt(0).toUpperCase()}
          </div>
          <h3 className="font-bold text-foreground">{name}</h3>
          <p className="text-xs text-muted-foreground">{email}</p>
          <Badge className="mt-2 bg-emerald-100 text-emerald-700 border-emerald-200">Learner</Badge>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-muted/30 p-2">
              <p className="text-lg font-bold text-foreground">4</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <div className="rounded-lg bg-muted/30 p-2">
              <p className="text-lg font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">Certs</p>
            </div>
          </div>
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

// ─── Main Dashboard ──────────────────────────────────────────────────────────

const LearnerDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("bookings");
  const { user } = useAuth();

  const stats = [
    { icon: BookOpen, label: "Enrolled Sessions", value: MY_SESSIONS.length, color: "text-violet-600 bg-violet-100" },
    { icon: Clock, label: "Hours Learned", value: "34", color: "text-blue-600 bg-blue-100" },
    { icon: Award, label: "Certificates", value: CERTIFICATES.length, color: "text-amber-600 bg-amber-100" },
    { icon: CreditCard, label: "Amount Spent", value: `$${PAYMENTS.filter(p => p.status === "Paid").reduce((a, p) => a + p.amount, 0)}`, color: "text-emerald-600 bg-emerald-100" },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "bookings": return <BookingsTab />;
      case "sessions": return <SessionsTab />;
      case "payments": return <PaymentsTab />;
      case "certificates": return <CertificatesTab />;
      case "profile": return <ProfileTab name={user?.name ?? "Learner"} email={user?.email ?? ""} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-extrabold text-primary-foreground">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">Welcome, {user?.name}</h1>
              <p className="text-sm text-muted-foreground">Learner Dashboard · {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-extrabold text-card-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="mb-6">
          <a href="/sessions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Browse upcoming sessions <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        {/* Tab navigation */}
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

        {/* Tab content */}
        {renderTab()}
      </div>
      <Footer />
    </div>
  );
};

export default LearnerDashboard;
