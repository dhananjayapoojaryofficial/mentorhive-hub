import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { icon: Users, label: "Active Mentors", value: "2,500+" },
  { icon: Star, label: "Avg Rating", value: "4.9" },
  { icon: Award, label: "Certificates Issued", value: "15K+" },
];

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 hero-gradient opacity-85" />
    </div>

    <div className="container relative z-10 mx-auto px-4 py-20">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-4 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light">
            LEARN FROM THE BEST
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-6xl">
            Master New Skills with{" "}
            <span className="text-gradient-gold">Expert Mentors</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg text-primary-foreground/70">
            Connect with vetted professionals, book 1-on-1 sessions, and earn
            verified certificates. Your growth journey starts here.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/register">
              Start Learning <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <Link to="/skills">Browse Skills</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 flex flex-wrap gap-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15">
                <s.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="text-lg font-bold text-primary-foreground">{s.value}</p>
                <p className="text-xs text-primary-foreground/50">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
