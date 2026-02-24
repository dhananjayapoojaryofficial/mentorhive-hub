import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, CheckCircle2, XCircle, Star, ShieldAlert, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ApprovalStatus = "pending" | "approved" | "rejected" | "suspended";

interface Teacher {
  id: number;
  name: string;
  email: string;
  skill: string;
  experience: string;
  rating: number | null;
  sessions: number;
  status: ApprovalStatus;
  applied: string;
}

const initialTeachers: Teacher[] = [
  { id: 1, name: "Raj Patel", email: "raj@example.com", skill: "Python & Django", experience: "5 years", rating: null, sessions: 0, status: "pending", applied: "Feb 24, 2026" },
  { id: 2, name: "Mei Lin", email: "mei@example.com", skill: "Data Science", experience: "3 years", rating: null, sessions: 0, status: "pending", applied: "Feb 23, 2026" },
  { id: 3, name: "Arjun Nair", email: "arjun@example.com", skill: "Cloud & DevOps", experience: "7 years", rating: null, sessions: 0, status: "pending", applied: "Feb 22, 2026" },
  { id: 4, name: "Sarah Chen", email: "sarah@example.com", skill: "React / Frontend", experience: "6 years", rating: 4.9, sessions: 148, status: "approved", applied: "Jan 5, 2026" },
  { id: 5, name: "Marcus Johnson", email: "marcus@example.com", skill: "UI/UX Design", experience: "4 years", rating: 4.8, sessions: 132, status: "approved", applied: "Jan 12, 2026" },
  { id: 6, name: "Aisha Patel", email: "aisha@example.com", skill: "Data Science", experience: "5 years", rating: 4.9, sessions: 119, status: "approved", applied: "Dec 20, 2025" },
  { id: 7, name: "Fake Mentor99", email: "fakementor99@example.com", skill: "Trading", experience: "Unknown", rating: 1.2, sessions: 0, status: "suspended", applied: "Feb 20, 2026" },
  { id: 8, name: "Spam User", email: "spam@example.com", skill: "Crypto", experience: "0 years", rating: null, sessions: 0, status: "rejected", applied: "Feb 19, 2026" },
];

type FilterType = "all" | ApprovalStatus;

const statusColors: Record<ApprovalStatus, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  approved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  suspended: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = teachers.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.skill.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id: number, status: ApprovalStatus) =>
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );

  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
    { label: "Suspended", value: "suspended" },
  ];

  const pendingCount = teachers.filter((t) => t.status === "pending").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">Teacher Approvals</h2>
            <p className="text-sm text-muted-foreground">
              {pendingCount} application{pendingCount !== 1 ? "s" : ""} awaiting review
            </p>
          </div>
          {pendingCount > 0 && (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              <ShieldAlert className="h-3.5 w-3.5" />
              {pendingCount} Pending
            </span>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search by name or skill…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
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

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((teacher) => (
            <div
              key={teacher.id}
              className="rounded-xl border border-border bg-card p-5 shadow-sm flex flex-col gap-4"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {teacher.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">{teacher.email}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${statusColors[teacher.status]}`}>
                  {teacher.status}
                </span>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-muted/40 px-3 py-2">
                  <p className="text-muted-foreground">Skill</p>
                  <p className="font-semibold text-foreground">{teacher.skill}</p>
                </div>
                <div className="rounded-lg bg-muted/40 px-3 py-2">
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-semibold text-foreground">{teacher.experience}</p>
                </div>
                <div className="rounded-lg bg-muted/40 px-3 py-2">
                  <p className="text-muted-foreground">Sessions</p>
                  <p className="font-semibold text-foreground">{teacher.sessions}</p>
                </div>
                <div className="rounded-lg bg-muted/40 px-3 py-2">
                  <p className="text-muted-foreground">Rating</p>
                  <p className="font-semibold text-foreground flex items-center gap-1">
                    {teacher.rating ? (
                      <>
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {teacher.rating}
                      </>
                    ) : (
                      "—"
                    )}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">Applied: {teacher.applied}</p>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                {teacher.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      className="flex-1 gap-1.5 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => updateStatus(teacher.id, "approved")}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 gap-1.5"
                      onClick={() => updateStatus(teacher.id, "rejected")}
                    >
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </Button>
                  </>
                )}
                {teacher.status === "approved" && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-1.5 text-xs"
                    >
                      <Eye className="h-3.5 w-3.5" /> View Profile
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-1.5 text-xs border-orange-300 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                      onClick={() => updateStatus(teacher.id, "suspended")}
                    >
                      <ShieldAlert className="h-3.5 w-3.5" /> Suspend
                    </Button>
                  </>
                )}
                {(teacher.status === "rejected" || teacher.status === "suspended") && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1.5 text-xs border-green-300 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={() => updateStatus(teacher.id, "approved")}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Re-approve
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No teachers found matching your filter.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
