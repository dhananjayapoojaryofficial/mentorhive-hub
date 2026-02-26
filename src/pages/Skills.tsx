import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillCard from "@/components/SkillCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const mockSkills = [
  { id: "1", title: "Full-Stack Web Development with React & Node", category: "Development", mentor: "Sarah Chen", rating: 4.9, reviews: 128, price: 75, duration: "60 min" },
  { id: "2", title: "UI/UX Design Fundamentals & Prototyping", category: "Design", mentor: "Marcus Johnson", rating: 4.8, reviews: 94, price: 60, duration: "45 min" },
  { id: "3", title: "Data Science with Python & Machine Learning", category: "AI/ML", mentor: "Priya Patel", rating: 4.9, reviews: 215, price: 85, duration: "60 min" },
  { id: "4", title: "Digital Marketing Strategy & SEO", category: "Marketing", mentor: "Alex Rivera", rating: 4.7, reviews: 67, price: 50, duration: "45 min" },
  { id: "5", title: "Cloud Architecture with AWS", category: "DevOps", mentor: "James Kim", rating: 4.8, reviews: 156, price: 90, duration: "60 min" },
  { id: "6", title: "Mobile App Development with Flutter", category: "Development", mentor: "Emma Wilson", rating: 4.6, reviews: 42, price: 70, duration: "60 min" },
  { id: "7", title: "Advanced SQL & Database Design", category: "Data", mentor: "Arjun Mehta", rating: 4.7, reviews: 84, price: 55, duration: "45 min" },
  { id: "8", title: "NLP with Transformers", category: "AI/ML", mentor: "Leena Gupta", rating: 4.9, reviews: 64, price: 95, duration: "75 min" },
  { id: "9", title: "Cybersecurity Foundations", category: "Security", mentor: "Rajat Singh", rating: 4.6, reviews: 39, price: 65, duration: "50 min" },
  { id: "10", title: "Product Management & Roadmapping", category: "Business", mentor: "Nidhi Rao", rating: 4.8, reviews: 102, price: 80, duration: "60 min" },
  { id: "11", title: "Kubernetes for Developers", category: "DevOps", mentor: "Omar Farooq", rating: 4.7, reviews: 58, price: 85, duration: "60 min" },
  { id: "12", title: "GraphQL API Design", category: "Development", mentor: "Sana Mirza", rating: 4.6, reviews: 34, price: 60, duration: "45 min" },
  { id: "13", title: "Rust Systems Programming", category: "Development", mentor: "Vikram Patel", rating: 4.5, reviews: 22, price: 95, duration: "75 min" },
  { id: "14", title: "Excel for Data Analysis", category: "Business", mentor: "Maya Kapoor", rating: 4.4, reviews: 47, price: 40, duration: "40 min" },
  { id: "15", title: "Public Speaking & Presentation Skills", category: "Personal Development", mentor: "Rahul Verma", rating: 4.8, reviews: 76, price: 45, duration: "50 min" },
  { id: "16", title: "Photography: Basics to Pro", category: "Creative", mentor: "Ananya Sen", rating: 4.7, reviews: 29, price: 55, duration: "60 min" },
];

const categories = ["All", "Development", "Design", "AI/ML", "Data", "Marketing", "DevOps", "Security", "Business", "Personal Development", "Creative"];

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
