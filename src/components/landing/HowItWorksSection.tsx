import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Create Your Profile", desc: "Sign up as a learner or teacher and set up your profile with your skills and interests." },
  { num: "02", title: "Discover & Connect", desc: "Browse skill listings, explore mentor profiles, and find the perfect match for your goals." },
  { num: "03", title: "Book & Learn", desc: "Schedule sessions, make secure payments, and attend live mentoring sessions." },
  { num: "04", title: "Earn Certificates", desc: "Complete your learning path and download verified digital certificates." },
];

const HowItWorksSection = () => (
  <section className="py-24 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="mb-16 text-center">
        <span className="mb-2 inline-block text-sm font-semibold text-gold-dark tracking-wide uppercase">How It Works</span>
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
          Get Started in 4 Simple Steps
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-gold text-2xl font-extrabold">
              {s.num}
            </div>
            <h3 className="mb-2 text-lg font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
