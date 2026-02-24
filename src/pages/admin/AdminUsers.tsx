import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, Filter, MoreVertical, ShieldCheck, ShieldOff, Trash2, KeyRound, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Role = "All" | "Teacher" | "Learner";
type Status = "active" | "inactive";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Teacher" | "Learner";
  status: Status;
  joined: string;
  sessions: number;
}

const initialUsers: User[] = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", role: "Teacher", status: "active", joined: "Jan 5, 2026", sessions: 148 },
  { id: 2, name: "Marcus Johnson", email: "marcus@example.com", role: "Teacher", status: "active", joined: "Jan 12, 2026", sessions: 132 },
  { id: 3, name: "Priya Sharma", email: "priya@example.com", role: "Learner", status: "active", joined: "Feb 10, 2026", sessions: 14 },
  { id: 4, name: "Aisha Patel", email: "aisha@example.com", role: "Teacher", status: "active", joined: "Dec 20, 2025", sessions: 119 },
  { id: 5, name: "Tom Richards", email: "tom@example.com", role: "Learner", status: "inactive", joined: "Feb 1, 2026", sessions: 3 },
  { id: 6, name: "Luca Ferrara", email: "luca@example.com", role: "Teacher", status: "active", joined: "Nov 15, 2025", sessions: 97 },
  { id: 7, name: "Kim Jae-won", email: "kim@example.com", role: "Teacher", status: "active", joined: "Oct 30, 2025", sessions: 88 },
  { id: 8, name: "Emily Torres", email: "emily@example.com", role: "Learner", status: "active", joined: "Feb 18, 2026", sessions: 7 },
  { id: 9, name: "David Nguyen", email: "david@example.com", role: "Learner", status: "inactive", joined: "Jan 28, 2026", sessions: 2 },
  { id: 10, name: "Sofia Rossi", email: "sofia@example.com", role: "Learner", status: "active", joined: "Feb 22, 2026", sessions: 1 },
  { id: 11, name: "Fake Mentor99", email: "fakementor99@example.com", role: "Teacher", status: "inactive", joined: "Feb 20, 2026", sessions: 0 },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role>("All");

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const toggleStatus = (id: number) =>
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
      )
    );

  const deleteUser = (id: number) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  const roleColors: Record<string, string> = {
    Teacher: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    Learner: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">User Management</h2>
            <p className="text-sm text-muted-foreground">{filtered.length} users found</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {(["All", "Teacher", "Learner"] as Role[]).map((r) => (
              <Button
                key={r}
                size="sm"
                variant={roleFilter === r ? "default" : "outline"}
                onClick={() => setRoleFilter(r)}
              >
                {r}
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
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3 text-right">Sessions</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-rose-500"}`} />
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.joined}</td>
                    <td className="px-4 py-3 text-right font-semibold">{user.sessions}</td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem className="gap-2 text-xs">
                            <Eye className="h-3.5 w-3.5" /> View Activity
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-xs">
                            <KeyRound className="h-3.5 w-3.5" /> Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="gap-2 text-xs"
                            onClick={() => toggleStatus(user.id)}
                          >
                            {user.status === "active" ? (
                              <>
                                <ShieldOff className="h-3.5 w-3.5 text-amber-500" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 text-xs text-destructive focus:text-destructive"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No users found matching your search.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
