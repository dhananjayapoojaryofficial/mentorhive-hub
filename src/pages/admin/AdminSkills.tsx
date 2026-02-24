import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, Trash2, Pencil, TrendingUp, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Skill {
  id: number;
  name: string;
  category: string;
  teachers: number;
  bookings: number;
  status: "active" | "flagged";
}

const initialSkills: Skill[] = [
  { id: 1, name: "React.js", category: "Frontend", teachers: 38, bookings: 412, status: "active" },
  { id: 2, name: "Python", category: "Backend", teachers: 45, bookings: 530, status: "active" },
  { id: 3, name: "UI/UX Design", category: "Design", teachers: 29, bookings: 318, status: "active" },
  { id: 4, name: "Machine Learning", category: "Data Science", teachers: 22, bookings: 267, status: "active" },
  { id: 5, name: "Node.js", category: "Backend", teachers: 31, bookings: 289, status: "active" },
  { id: 6, name: "Docker & Kubernetes", category: "DevOps", teachers: 18, bookings: 198, status: "active" },
  { id: 7, name: "Data Analysis", category: "Data Science", teachers: 24, bookings: 241, status: "active" },
  { id: 8, name: "Rust Programming", category: "Systems", teachers: 6, bookings: 34, status: "active" },
  { id: 9, name: "Crypto Trading Tips", category: "Finance", teachers: 2, bookings: 5, status: "flagged" },
  { id: 10, name: "TypeScript", category: "Frontend", teachers: 27, bookings: 305, status: "active" },
  { id: 11, name: "Swift / iOS", category: "Mobile", teachers: 14, bookings: 162, status: "active" },
  { id: 12, name: "Figma", category: "Design", teachers: 21, bookings: 248, status: "active" },
];

const categories = ["All", "Frontend", "Backend", "Design", "Data Science", "DevOps", "Mobile", "Systems", "Finance"];

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [editSkill, setEditSkill] = useState<Skill | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const filtered = skills.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || s.category === category;
    return matchSearch && matchCat;
  });

  const deleteSkill = (id: number) =>
    setSkills((prev) => prev.filter((s) => s.id !== id));

  const openEdit = (skill: Skill) => {
    setEditSkill(skill);
    setEditName(skill.name);
    setEditCategory(skill.category);
  };

  const saveEdit = () => {
    if (!editSkill) return;
    setSkills((prev) =>
      prev.map((s) =>
        s.id === editSkill.id ? { ...s, name: editName, category: editCategory } : s
      )
    );
    setEditSkill(null);
  };

  const toggleFlag = (id: number) =>
    setSkills((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "active" ? "flagged" : "active" }
          : s
      )
    );

  const sortedFiltered = [...filtered].sort((a, b) => b.bookings - a.bookings);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-extrabold text-foreground">Skill Management</h2>
          <p className="text-sm text-muted-foreground">{filtered.length} skills listed</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search skills…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={category === c ? "default" : "outline"}
                onClick={() => setCategory(c)}
              >
                {c}
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
                  <th className="px-4 py-3">Skill</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Teachers</th>
                  <th className="px-4 py-3 text-right">Bookings</th>
                  <th className="px-4 py-3">Popularity</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedFiltered.map((skill, idx) => {
                  const maxBookings = Math.max(...skills.map((s) => s.bookings));
                  const pct = Math.round((skill.bookings / maxBookings) * 100);
                  return (
                    <tr key={skill.id} className="hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 font-semibold text-foreground">
                          {idx < 3 && (
                            <TrendingUp className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          )}
                          {skill.name}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {skill.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">{skill.teachers}</td>
                      <td className="px-4 py-3 text-right font-semibold">{skill.bookings}</td>
                      <td className="px-4 py-3 w-32">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            skill.status === "active"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                          }`}
                        >
                          {skill.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            title="Edit"
                            onClick={() => openEdit(skill)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            title={skill.status === "active" ? "Flag" : "Restore"}
                            onClick={() => toggleFlag(skill.id)}
                          >
                            {skill.status === "active" ? (
                              <XCircle className="h-3.5 w-3.5 text-amber-500" />
                            ) : (
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            title="Delete"
                            onClick={() => deleteSkill(skill.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {sortedFiltered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No skills found.
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editSkill} onOpenChange={() => setEditSkill(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Skill Name</Label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Input value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditSkill(null)}>Cancel</Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
