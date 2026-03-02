import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, MapPin, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { mentors } from "@/pages/Mentors";

const MentorProfile = () => {
  const { id } = useParams();
  const mentor = mentors.find((item) => item.id === id);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <h1 className="text-2xl font-bold text-card-foreground">Mentor not found</h1>
            <p className="mt-2 text-muted-foreground">The mentor you are looking for does not exist.</p>
            <Button className="mt-6" asChild>
              <Link to="/mentors">Back to Mentors</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full rounded-xl border border-border bg-card p-6 lg:w-2/3">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-extrabold text-gold">
                  {mentor.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-card-foreground">{mentor.name}</h1>
                  <p className="text-sm text-muted-foreground">{mentor.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{mentor.location}</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-gold text-gold" />{mentor.rating} ({mentor.reviews})</span>
                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{mentor.sessions} sessions</span>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${mentor.available ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                {mentor.available ? "Available" : "Busy"}
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-card-foreground">Skills</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {mentor.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-card-foreground">About</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {mentor.name} is a {mentor.title.toLowerCase()} based in {mentor.location}. They have completed {mentor.sessions} sessions with an average rating of {mentor.rating}.
              </p>
            </div>
          </div>

          <div className="w-full rounded-xl border border-border bg-card p-6 lg:w-1/3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Hourly rate</p>
              <p className="mt-2 text-3xl font-extrabold text-foreground">${mentor.rate}<span className="text-sm font-normal text-muted-foreground">/hr</span></p>
            </div>
            <Button className="mt-6 w-full" variant="gold">
              Book a Session
            </Button>
            <Button className="mt-3 w-full" variant="outline" asChild>
              <Link to="/mentors">Back to Mentors</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentorProfile;
