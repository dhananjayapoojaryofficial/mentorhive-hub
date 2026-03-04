import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, Calendar, Award, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const mentors = [
  { id: "1", name: "Sarah Chen", title: "Senior Full-Stack Developer", location: "San Francisco, CA", rating: 4.9, reviews: 128, sessions: 342, skills: ["React", "Node.js", "TypeScript"], rate: 75, available: true },
  { id: "2", name: "Marcus Johnson", title: "Lead UX Designer", location: "New York, NY", rating: 4.8, reviews: 94, sessions: 215, skills: ["Figma", "UI Design", "Prototyping"], rate: 60, available: true },
  { id: "3", name: "Priya Patel", title: "Data Science Lead", location: "Seattle, WA", rating: 4.9, reviews: 215, sessions: 480, skills: ["Python", "ML", "TensorFlow"], rate: 85, available: false },
  { id: "4", name: "Alex Rivera", title: "Marketing Director", location: "Austin, TX", rating: 4.7, reviews: 67, sessions: 120, skills: ["SEO", "Analytics", "Content"], rate: 50, available: true },
];

const Mentors = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-foreground">Find Mentors</h1>
        <p className="mt-2 text-muted-foreground">Connect with vetted professionals ready to guide your growth</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mentors.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-hover rounded-xl border border-border bg-card p-6"
          >
            <div className="flex gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-gold">
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-card-foreground">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.title}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${m.available ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                    {m.available ? "Available" : "Busy"}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{m.location}</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-gold text-gold" />{m.rating} ({m.reviews})</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{m.sessions} sessions</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.skills.map((s) => (
                    <span key={s} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s}</span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-foreground">₹{m.rate}<span className="text-sm font-normal text-muted-foreground">/hr</span></span>
                  <Button variant="gold" size="sm" asChild>
                    <Link to={`/mentors/${m.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default Mentors;
