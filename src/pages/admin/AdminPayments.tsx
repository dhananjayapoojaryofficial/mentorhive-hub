import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, DollarSign, TrendingUp, RefreshCw, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Payment {
  id: string;
  learner: string;
  learnerEmail: string;
  teacher: string;
  session: string;
  amount: number;
  platformFee: number;
  teacherPayout: number;
  date: string;
  status: "Completed" | "Pending" | "Refunded" | "Disputed";
  txId: string;
}

const PAYMENTS: Payment[] = [
  { id: "p1", learner: "Alex Learner", learnerEmail: "learner@demo.com", teacher: "Sarah Chen", session: "React Advanced Patterns", amount: 29, platformFee: 4.35, teacherPayout: 24.65, date: "Mar 1, 2026", status: "Completed", txId: "TXN-2026-001" },
  { id: "p2", learner: "Priya Sharma", learnerEmail: "learner2@demo.com", teacher: "Sarah Chen", session: "React Advanced Patterns", amount: 29, platformFee: 4.35, teacherPayout: 24.65, date: "Mar 3, 2026", status: "Pending", txId: "TXN-2026-002" },
  { id: "p3", learner: "Daniel Park", learnerEmail: "dpark@example.com", teacher: "Dr. Priya Kapoor", session: "Python for Data Science", amount: 39, platformFee: 5.85, teacherPayout: 33.15, date: "Feb 28, 2026", status: "Refunded", txId: "TXN-2026-003" },
  { id: "p4", learner: "Maria Santos", learnerEmail: "msantos@example.com", teacher: "James Liu", session: "Node.js REST API Masterclass", amount: 35, platformFee: 5.25, teacherPayout: 29.75, date: "Mar 4, 2026", status: "Completed", txId: "TXN-2026-004" },
  { id: "p5", learner: "Tom Nguyen", learnerEmail: "tnguyen@example.com", teacher: "Sarah Chen", session: "TypeScript Deep Dive", amount: 25, platformFee: 3.75, teacherPayout: 21.25, date: "Mar 5, 2026", status: "Disputed", txId: "TXN-2026-005" },
  { id: "p6", learner: "Kim Lee", learnerEmail: "klee@example.com", teacher: "Marcus Johnson", session: "UI/UX Design Masterclass", amount: 45, platformFee: 6.75, teacherPayout: 38.25, date: "Mar 6, 2026", status: "Completed", txId: "TXN-2026-006" },
];

const STATUS_STYLES: Record<string, string> = {
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Refunded: "bg-blue-100 text-blue-700 border-blue-200",
  Disputed: "bg-rose-100 text-rose-700 border-rose-200",
};

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>(PAYMENTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.learner.toLowerCase().includes(q) || p.session.toLowerCase().includes(q) || p.txId.toLowerCase().includes(q)) &&
      (statusFilter === "All" || p.status === statusFilter)
    );
  });

  const totalRevenue = payments.filter(p => p.status === "Completed").reduce((a, p) => a + p.amount, 0);
  const totalFees = payments.filter(p => p.status === "Completed").reduce((a, p) => a + p.platformFee, 0);
  const totalPayout = payments.filter(p => p.status === "Completed").reduce((a, p) => a + p.teacherPayout, 0);
  const disputedCount = payments.filter(p => p.status === "Disputed").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">Payment Monitoring</h2>
            <p className="text-sm text-muted-foreground">Track all platform transactions</p>
          </div>
          {disputedCount > 0 && (
            <span className="flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
              <AlertCircle className="h-3.5 w-3.5" /> {disputedCount} Disputed
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-emerald-600 bg-emerald-100" },
            { label: "Platform Fees", value: `$${totalFees.toFixed(2)}`, icon: TrendingUp, color: "text-violet-600 bg-violet-100" },
            { label: "Teacher Payouts", value: `$${totalPayout.toFixed(2)}`, icon: RefreshCw, color: "text-blue-600 bg-blue-100" },
            { label: "Disputed", value: disputedCount, icon: AlertCircle, color: "text-rose-600 bg-rose-100" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4">
              <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${s.color}`}>
                <s.icon className="h-4 w-4" />
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
            <Input className="pl-9" placeholder="Search by learner, session, or transaction ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Completed", "Pending", "Refunded", "Disputed"].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}>{s}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Transaction</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Learner</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden lg:table-cell">Teacher</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Platform Fee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{p.session}</p>
                    <p className="font-mono text-xs text-muted-foreground">{p.txId} · {p.date}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-foreground">{p.learner}</p>
                    <p className="text-xs text-muted-foreground">{p.learnerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{p.teacher}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">${p.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">${p.platformFee.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {p.status === "Disputed" && (
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="outline" className="text-emerald-600 text-xs" onClick={() => { setPayments(prev => prev.map(x => x.id === p.id ? { ...x, status: "Completed" } : x)); toast.success("Dispute resolved."); }}>Resolve</Button>
                        <Button size="sm" variant="outline" className="text-rose-500 text-xs" onClick={() => { setPayments(prev => prev.map(x => x.id === p.id ? { ...x, status: "Refunded" } : x)); toast.success("Refund issued."); }}>Refund</Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
