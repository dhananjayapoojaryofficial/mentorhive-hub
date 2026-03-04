import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useSessions } from "@/context/SessionsContext";
import type { Session } from "@/context/SessionsContext";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Search,
  Filter,
  BadgeDollarSign,
  BadgeCheck,
  Video,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";



const CATEGORIES = ["All", "Web Development", "Design", "Data Science", "Backend"];

const SessionCard = ({ session }: { session: Session }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to request to join this session.");
      navigate("/login");
      return;
    }
    toast.success(`Join request sent for "${session.title}"!`);
  };

  const seatsLeft = session.maxSeats - session.enrolledCount;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5">
      {/* Header gradient */}
      <div className={`bg-gradient-to-br ${session.imageGradient} p-5 relative`}>
        <div className="flex items-start justify-between">
          <Badge
            className={`text-xs font-bold px-3 py-1 ${
              session.type === "Free"
                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                : "bg-amber-100 text-amber-700 border-amber-200"
            }`}
          >
            {session.type === "Free" ? (
              <><BadgeCheck className="mr-1 h-3.5 w-3.5" />Free</>
            ) : (
              <><BadgeDollarSign className="mr-1 h-3.5 w-3.5" />₹{session.price}</>
            )}
          </Badge>
          <Badge className="bg-white/20 text-white border-white/30 text-xs">{session.category}</Badge>
        </div>
        <h3 className="mt-3 text-lg font-extrabold text-white leading-tight">{session.title}</h3>
        <div className="mt-2 flex items-center gap-1.5 text-white/80">
          <User className="h-3.5 w-3.5" />
          <span className="text-sm font-medium">{session.teacher}</span>
          <span className="ml-auto flex items-center gap-1 text-xs text-white/80">
            <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
            {session.rating}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm text-muted-foreground line-clamp-2">{session.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary/70" /> {session.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary/70" /> {session.time}
          </span>
          <span className="flex items-center gap-1.5">
            <Video className="h-3.5 w-3.5 text-primary/70" /> {session.duration}
          </span>
          <span className={`flex items-center gap-1.5 font-medium ${seatsLeft <= 5 ? "text-rose-500" : "text-emerald-600"}`}>
            <Users className="h-3.5 w-3.5" />
            {seatsLeft} seats left
          </span>
        </div>

        <div className="mt-auto pt-2">
          <Button
            className="w-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold"
            onClick={handleJoin}
          >
            Request to Join
          </Button>
        </div>
      </div>
    </div>
  );
};

const Sessions = () => {
  const { sessions } = useSessions();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [typeFilter, setTypeFilter] = useState<"All" | "Free" | "Paid">("All");

  const filtered = sessions.filter((s) => {
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.teacher.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || s.category === category;
    const matchType = typeFilter === "All" || s.type === typeFilter;
    return matchSearch && matchCategory && matchType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative mt-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white py-0 overflow-hidden"></section>

      {/* Hero */}
      <section className="hero-gradient py-20 pt-28 text-center">
        <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
          Browse Live Sessions
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/70">
          Explore upcoming sessions from expert teachers. Join for free or pay to unlock premium sessions.
        </p>
        <div className="mx-auto mt-8 flex max-w-lg items-center gap-3 rounded-2xl bg-white/10 p-2 backdrop-blur">
          <Search className="ml-2 h-4 w-4 text-white/60" />
          <input
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 outline-none"
            placeholder="Search sessions or teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex flex-wrap items-center gap-3 px-4 py-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            {(["All", "Free", "Paid"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  typeFilter === t
                    ? "bg-gold text-white"
                    : "bg-muted text-muted-foreground hover:bg-gold/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sessions grid */}
      <div className="container mx-auto px-4 py-12">
        <p className="mb-6 text-sm text-muted-foreground">
          Showing <strong>{filtered.length}</strong> upcoming session{filtered.length !== 1 ? "s" : ""}
        </p>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Tag className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <h3 className="text-lg font-semibold text-foreground">No sessions found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <SessionCard key={s.id} session={s} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Sessions;
