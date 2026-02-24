import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, XCircle, CheckCircle2, Clock, CalendarCheck, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BookingStatus = "confirmed" | "completed" | "cancelled" | "pending";

interface Booking {
  id: string;
  learner: string;
  teacher: string;
  skill: string;
  date: string;
  time: string;
  amount: string;
  status: BookingStatus;
}

const initialBookings: Booking[] = [
  { id: "#4821", learner: "Priya Sharma", teacher: "Sarah Chen", skill: "React.js", date: "Feb 25, 2026", time: "10:00 AM", amount: "$60", status: "confirmed" },
  { id: "#4820", learner: "Tom Richards", teacher: "Marcus Johnson", skill: "UI/UX Design", date: "Feb 24, 2026", time: "2:00 PM", amount: "$55", status: "completed" },
  { id: "#4819", learner: "Emily Torres", teacher: "Aisha Patel", skill: "Data Science", date: "Feb 24, 2026", time: "11:00 AM", amount: "$70", status: "completed" },
  { id: "#4818", learner: "David Nguyen", teacher: "Luca Ferrara", skill: "Node.js", date: "Feb 23, 2026", time: "4:00 PM", amount: "$50", status: "cancelled" },
  { id: "#4817", learner: "Sofia Rossi", teacher: "Kim Jae-won", skill: "Machine Learning", date: "Feb 27, 2026", time: "9:00 AM", amount: "$80", status: "pending" },
  { id: "#4816", learner: "Priya Sharma", teacher: "Aisha Patel", skill: "Python", date: "Feb 22, 2026", time: "3:00 PM", amount: "$65", status: "completed" },
  { id: "#4815", learner: "Tom Richards", teacher: "Sarah Chen", skill: "React.js", date: "Feb 21, 2026", time: "10:00 AM", amount: "$60", status: "completed" },
  { id: "#4814", learner: "Emily Torres", teacher: "Marcus Johnson", skill: "Figma", date: "Feb 20, 2026", time: "1:00 PM", amount: "$55", status: "cancelled" },
  { id: "#4813", learner: "David Nguyen", teacher: "Kim Jae-won", skill: "ML Basics", date: "Mar 1, 2026", time: "5:00 PM", amount: "$80", status: "pending" },
  { id: "#4812", learner: "Sofia Rossi", teacher: "Sarah Chen", skill: "TypeScript", date: "Feb 19, 2026", time: "2:00 PM", amount: "$60", status: "completed" },
  { id: "#4811", learner: "Priya Sharma", teacher: "Luca Ferrara", skill: "Docker", date: "Feb 18, 2026", time: "11:00 AM", amount: "$70", status: "cancelled" },
];

const statusConfig: Record<
  BookingStatus,
  { label: string; cls: string; icon: React.ElementType }
> = {
  confirmed: { label: "Confirmed", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: CalendarCheck },
  completed: { label: "Completed", cls: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", cls: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400", icon: XCircle },
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
};

type FilterType = "all" | BookingStatus;

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.learner.toLowerCase().includes(search.toLowerCase()) ||
      b.teacher.toLowerCase().includes(search.toLowerCase()) ||
      b.skill.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || b.status === filter;
    return matchSearch && matchFilter;
  });

  const cancelBooking = (id: string) =>
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );

  // Stats
  const total = bookings.length;
  const completed = bookings.filter((b) => b.status === "completed").length;
  const completionRate = Math.round((completed / total) * 100);
  const totalRevenue = bookings
    .filter((b) => b.status === "completed")
    .reduce((acc, b) => acc + parseInt(b.amount.replace("$", "")), 0);

  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-extrabold text-foreground">Booking Management</h2>
          <p className="text-sm text-muted-foreground">{filtered.length} bookings shown</p>
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
            <p className="text-xl font-extrabold text-foreground">{total}</p>
            <p className="text-xs text-muted-foreground">Total Bookings</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
            <p className="text-xl font-extrabold text-green-600 dark:text-green-400">{completed}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
            <p className="text-xl font-extrabold text-foreground">{completionRate}%</p>
            <p className="text-xs text-muted-foreground">Completion Rate</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
            <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">${totalRevenue}</p>
            <p className="text-xs text-muted-foreground">Revenue (Completed)</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search by ID, learner, teacher, skill…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Filter className="h-4 w-4 text-muted-foreground self-center" />
            {filters.map((f) => (
              <Button
                key={f.value}
                size="sm"
                variant={filter === f.value ? "default" : "outline"}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-left text-xs font-semibold uppercase text-muted-foreground">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Learner</th>
                  <th className="px-4 py-3">Teacher</th>
                  <th className="px-4 py-3">Skill</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((booking) => {
                  const cfg = statusConfig[booking.status];
                  const Icon = cfg.icon;
                  return (
                    <tr key={booking.id} className="hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-muted-foreground">
                        {booking.id}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">{booking.learner}</td>
                      <td className="px-4 py-3 text-muted-foreground">{booking.teacher}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {booking.skill}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {booking.date}
                        <br />
                        <span className="text-foreground font-medium">{booking.time}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-foreground">
                        {booking.amount}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${cfg.cls}`}>
                          <Icon className="h-3 w-3" />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {(booking.status === "confirmed" || booking.status === "pending") && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs border-rose-200 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                            onClick={() => cancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        )}
                        {(booking.status === "completed" || booking.status === "cancelled") && (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No bookings found.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
