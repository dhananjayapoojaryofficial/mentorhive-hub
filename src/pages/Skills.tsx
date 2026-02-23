import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillCard from "@/components/SkillCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const mockSkills = [
  { id: "1", title: "Full-Stack Web Development with React & Node", category: "Development", mentor: "Sarah Chen", rating: 4.9, reviews: 128, price: 75, duration: "60 min" },
  { id: "2", title: "UI/UX Design Fundamentals & Prototyping", category: "Design", mentor: "Marcus Johnson", rating: 4.8, reviews: 94, price: 60, duration: "45 min" },
  { id: "3", title: "Data Science with Python & Machine Learning", category: "Data Science", mentor: "Priya Patel", rating: 4.9, reviews: 215, price: 85, duration: "60 min" },
  { id: "4", title: "Digital Marketing Strategy & SEO", category: "Marketing", mentor: "Alex Rivera", rating: 4.7, reviews: 67, price: 50, duration: "45 min" },
  { id: "5", title: "Cloud Architecture with AWS", category: "DevOps", mentor: "James Kim", rating: 4.8, reviews: 156, price: 90, duration: "60 min" },
  { id: "6", title: "Mobile App Development with Flutter", category: "Development", mentor: "Emma Wilson", rating: 4.6, reviews: 42, price: 70, duration: "60 min" },
];

const categories = ["All", "Development", "Design", "Data Science", "Marketing", "DevOps"];

const Skills = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = mockSkills.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.mentor.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">Browse Skills</h1>
          <p className="mt-2 text-muted-foreground">Discover expert-led sessions across various domains</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search skills or mentors..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <SkillCard key={s.id} {...s} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">No skills found matching your search.</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Skills;
