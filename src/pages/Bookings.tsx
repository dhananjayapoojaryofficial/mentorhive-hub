import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const learnerUpcoming = [
  {
    id: "bk-001",
    title: "React Advanced Patterns",
    mentor: "Sarah Chen",
    date: "Mar 05, 2026",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "bk-002",
    title: "UI/UX Design Review",
    mentor: "Marcus Johnson",
    date: "Mar 08, 2026",
    time: "2:00 PM",
    status: "pending",
  },
];

const learnerCompleted = [
  {
    id: "bk-003",
    title: "System Design Basics",
    mentor: "Priya Patel",
    date: "Feb 18, 2026",
    time: "4:00 PM",
    status: "completed",
  },
  {
    id: "bk-004",
    title: "Portfolio Review",
    mentor: "Alex Rivera",
    date: "Feb 10, 2026",
    time: "11:00 AM",
    status: "completed",
  },
];

const teacherRequests = [
  {
    id: "rq-101",
    learner: "Ananya Sen",
    topic: "NLP with Transformers",
    date: "Mar 07, 2026",
    time: "9:00 AM",
  },
  {
    id: "rq-102",
    learner: "Rahul Verma",
    topic: "Product Roadmapping",
    date: "Mar 09, 2026",
    time: "3:30 PM",
  },
];

const teacherSchedule = [
  {
    id: "sc-201",
    learner: "Maya Kapoor",
    topic: "Excel for Data Analysis",
    date: "Mar 06, 2026",
    time: "12:00 PM",
    status: "confirmed",
  },
  {
    id: "sc-202",
    learner: "Omar Farooq",
    topic: "Kubernetes for Developers",
    date: "Mar 11, 2026",
    time: "5:00 PM",
    status: "confirmed",
  },
];

const statusStyle = (status: string) => {
  if (status === "confirmed") return "bg-success/15 text-success";
  if (status === "pending") return "bg-gold/15 text-gold-dark";
  if (status === "completed") return "bg-muted text-muted-foreground";
  return "bg-muted text-muted-foreground";
};

const Bookings = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-foreground">My Bookings</h1>
        <p className="mt-2 text-muted-foreground">Track sessions, manage requests, and keep your schedule on time.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-card-foreground">Learner: Upcoming Sessions</h2>
            <p className="text-xs text-muted-foreground">Cancel bookings or join when the session starts.</p>
          </div>
          <div className="space-y-3">
            {learnerUpcoming.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                <div>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">with {s.mentor} · {s.date} at {s.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(s.status)}`}>{s.status}</span>
                  <Button variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-card-foreground">Learner: Completed Sessions</h2>
            <p className="text-xs text-muted-foreground">Your past sessions and feedback history.</p>
          </div>
          <div className="space-y-3">
            {learnerCompleted.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                <div>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">with {s.mentor} · {s.date} at {s.time}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(s.status)}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-card-foreground">Teacher: Booking Requests</h2>
            <p className="text-xs text-muted-foreground">Accept or reject new bookings.</p>
          </div>
          <div className="space-y-3">
            {teacherRequests.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                <div>
                  <h3 className="font-semibold text-foreground">{r.topic}</h3>
                  <p className="text-xs text-muted-foreground">from {r.learner} · {r.date} at {r.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm">Accept</Button>
                  <Button variant="outline" size="sm">Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-card-foreground">Teacher: Session Schedule</h2>
            <p className="text-xs text-muted-foreground">Upcoming confirmed sessions.</p>
          </div>
          <div className="space-y-3">
            {teacherSchedule.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                <div>
                  <h3 className="font-semibold text-foreground">{s.topic}</h3>
                  <p className="text-xs text-muted-foreground">with {s.learner} · {s.date} at {s.time}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(s.status)}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    <Footer />
  </div>
);

export default Bookings;
