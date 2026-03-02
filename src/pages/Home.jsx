import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Users,
  User,
  Star,
  Award,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  MessageCircle,
  TrendingUp,
  Code2,
  Palette,
  Cloud,
  Shield,
  Smartphone,
  BrainCircuit,
  Server,
} from "lucide-react";

/* ---------------- DATA ---------------- */

const stats = [
  { value: "10K+", label: "Learners Enrolled" },
  { value: "2.5K+", label: "Expert Mentors" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Skill Categories" },
];

const categories = [
  { label: "Web Dev", icon: Code2 },
  { label: "Data Science", icon: TrendingUp },
  { label: "UI/UX Design", icon: Palette },
  { label: "Cloud", icon: Cloud },
  { label: "DevOps", icon: Server },
  { label: "AI / ML", icon: BrainCircuit },
  { label: "Mobile Dev", icon: Smartphone },
  { label: "Cybersecurity", icon: Shield },
];

const features = [
  {
    icon: Zap,
    title: "Instant Matching",
    desc: "Smart algorithm connects you with the best mentor instantly.",
  },
  {
    icon: Globe,
    title: "Learn Anywhere",
    desc: "Access sessions on any device, anytime.",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    desc: "Industry-recognized credentials for your career.",
  },
  {
    icon: MessageCircle,
    title: "1-on-1 Mentorship",
    desc: "Personalized attention from expert mentors.",
  },
];

const testimonials = [
  {
    name: "Anika Sharma",
    role: "Frontend Developer @ Infosys",
    quote:
      "SkillBridge completely transformed my career journey. The 1-on-1 mentorship made all the difference.",
  },
  {
    name: "Rohan Mehta",
    role: "Data Science Intern @ TCS",
    quote:
      "Within 3 months I landed my internship. The structured guidance was incredible.",
  },
  {
    name: "Priya Nair",
    role: "UI/UX Designer",
    quote:
      "The certification and mentor support helped me build a strong portfolio.",
  },
];

/* ---------------- COMPONENT ---------------- */

const Home = () => {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">

      <section className="relative mt-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white py-0 overflow-hidden"></section>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white py-32 overflow-hidden">

        {/* Profile Icon (Inside Hero, Top Right) */}
        <div className="absolute top-6 right-6 z-20">
          <Link
            to="/profile"
            className="group flex items-center gap-2"
          >
            <span className="hidden sm:block text-xs text-white/70 group-hover:text-white transition">
              My Profile
            </span>

            <div className="h-12 w-12 rounded-full 
                      bg-gradient-to-br from-orange-500 to-yellow-400
                      flex items-center justify-center 
                      shadow-xl 
                      ring-2 ring-orange-400/40
                      group-hover:scale-110 
                      transition-all duration-300">
              <User className="h-6 w-6 text-black" />
            </div>
          </Link>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">

          <span className="inline-block mb-6 px-4 py-1 text-xs uppercase tracking-widest bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20">
            #1 Mentor Platform in India
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Unlock Your{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
              Full Potential
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-white/70 text-lg mb-10">
            Connect with expert mentors, build in-demand skills, and accelerate
            your career growth — all in one powerful platform.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-8"
            >
              <Link to="/register">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 
                   text-white font-semibold 
                   px-8 py-6 rounded-xl 
                   shadow-lg hover:scale-105 
                   transition-all duration-300"
            >
              <Link to="/mentors">Browse Mentors</Link>
            </Button>
          </div>

          <div className="mt-10 flex justify-center gap-6 text-sm text-white/50 flex-wrap">
            {["No credit card", "Cancel anytime", "Free first session"].map(
              (item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400" />
                  {item}
                </span>
              )
            )}
          </div>

        </div>
      </section>


      {/* STATS */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="py-10">
              <h2 className="text-4xl font-bold text-orange-500">
                {stat.value}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10">
            Explore Categories
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(({ label, icon: Icon }) => (
              <Link
                key={label}
                to="/skills"
                className="flex items-center gap-2 px-6 py-3 rounded-full 
                           border border-border 
                           hover:border-orange-500 
                           hover:bg-orange-500/10 
                           hover:shadow-md
                           transition-all duration-300"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">
            Why Choose SkillBridge?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-8 rounded-2xl border border-border 
                           hover:shadow-xl hover:-translate-y-2 
                           transition duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-500/10 p-4 rounded-xl">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">
            What Learners Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-8 border border-border rounded-2xl 
                           hover:shadow-xl hover:-translate-y-2 
                           transition duration-300"
              >
                <div className="flex justify-center mb-4 text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 text-sm">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black py-20 text-center">
        <div className="container mx-auto px-6">
          <Users className="mx-auto mb-6 h-10 w-10" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="mb-8 text-black/80">
            Join thousands of learners building real-world skills.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-black/90 px-8"
          >
            <Link to="/register">
              Join SkillBridge Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;