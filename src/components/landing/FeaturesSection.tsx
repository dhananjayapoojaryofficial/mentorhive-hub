import { Search, Calendar, CreditCard, Award, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Search, title: "Smart Skill Search", desc: "Find the perfect mentor with AI-powered recommendations based on your goals and preferences." },
  { icon: Calendar, title: "Easy Booking", desc: "Book sessions that fit your schedule with real-time availability and instant confirmation." },
  { icon: CreditCard, title: "Secure Payments", desc: "Pay safely with our integrated payment system. Funds released after session completion." },
  { icon: Star, title: "Verified Reviews", desc: "Make informed choices with authentic ratings and detailed feedback from past learners." },
  { icon: Award, title: "Digital Certificates", desc: "Earn and download verified certificates upon completing your learning milestones." },
  { icon: ShieldCheck, title: "Vetted Mentors", desc: "Every mentor is reviewed and approved by our admin team to ensure quality." },
];

const FeaturesSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="mb-16 text-center">
        <span className="mb-2 inline-block text-sm font-semibold text-gold-dark tracking-wide uppercase">Features</span>
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
          Everything You Need to Grow
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          A complete platform for skill exchange — from discovery to certification.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group card-hover rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-gold/15 group-hover:text-gold-dark">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-card-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
