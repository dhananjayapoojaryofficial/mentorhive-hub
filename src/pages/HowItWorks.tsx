import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  UserPlus, Search, Eye, CalendarCheck, CreditCard, Video,
  Star, Award, Briefcase, PlusCircle, CheckSquare, Mic,
  DollarSign, ThumbsUp, ShieldCheck, Lock, UserCheck,
  BarChart2, CheckCircle2, Users, Zap, Globe, ArrowRight,
} from "lucide-react";

const learnerSteps = [
  { icon: UserPlus, title: "Create Your Account", description: "Sign up and build your learner profile with interests and preferred skill categories." },
  { icon: Search, title: "Browse Skills or Find Mentors", description: "Explore skills or search mentors by category, rating, price, or availability." },
  { icon: Eye, title: "View Mentor Profile", description: "Review experience, ratings, pricing, and available time slots before booking." },
  { icon: CalendarCheck, title: "Book a Session", description: "Pick a suitable date and time, confirm the session, and proceed to payment." },
  { icon: CreditCard, title: "Secure Payment", description: "Complete payment via the integrated gateway to confirm your booking." },
  { icon: Video, title: "Attend the Session", description: "Join the session at the scheduled time and learn directly from your mentor." },
  { icon: Star, title: "Rate & Review", description: "Share feedback after completion to maintain quality standards." },
  { icon: Award, title: "Download Certificate", description: "Receive a digital certificate upon successful completion." },
];

const mentorSteps = [
  { icon: Briefcase, title: "Register as a Mentor", description: "Create your mentor profile with skills, expertise, and pricing details." },
  { icon: PlusCircle, title: "Add Skills", description: "List the skills you teach with descriptions and availability." },
  { icon: CheckSquare, title: "Manage Booking Requests", description: "Accept or reject session requests based on availability." },
  { icon: Mic, title: "Conduct Sessions", description: "Deliver live mentorship sessions to learners." },
  { icon: DollarSign, title: "Earn & Track Income", description: "Monitor earnings and session history through your dashboard." },
  { icon: ThumbsUp, title: "Build Reputation", description: "Collect ratings and reviews to boost visibility and credibility." },
];

const matchingSignals = [
  { icon: Search, label: "Skill category" },
  { icon: Star, label: "Ratings and reviews" },
  { icon: CalendarCheck, label: "Availability" },
  { icon: BarChart2, label: "Previous learning history" },
];

const securityPoints = [
  { icon: Lock, label: "Encrypted authentication system" },
  { icon: CreditCard, label: "Secure payment gateway integration" },
  { icon: ShieldCheck, label: "Role-based access control" },
  { icon: UserCheck, label: "Verified mentor approval" },
  { icon: Star, label: "Transparent rating system" },
];

const adminPoints = [
  { icon: UserCheck, label: "Verifies mentors" },
  { icon: BarChart2, label: "Monitors transactions" },
  { icon: Users, label: "Manages users" },
  { icon: ShieldCheck, label: "Ensures platform quality" },
];

const valueProps = [
  { icon: Users, label: "Community-driven learning" },
  { icon: DollarSign, label: "Affordable mentorship" },
  { icon: Lock, label: "Secure booking system" },
  { icon: Star, label: "Transparent reviews" },
  { icon: Zap, label: "Personalized mentor matching" },
  { icon: Globe, label: "Scalable and reliable platform" },
];

const quickFlow = [
  { step: "01", label: "Sign Up" },
  { step: "02", label: "Find Mentor" },
  { step: "03", label: "Book Session" },
  { step: "04", label: "Learn & Grow" },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
    {children}
  </span>
);

const HowItWorks = () => {
  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative mt-16 overflow-hidden border-b border-border bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
          <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[100px]" />
          <div className="container relative mx-auto px-6 py-24 lg:py-32">
            <div className="max-w-3xl">
              <span className="mb-4 inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                How SkillBridge Works
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Learn or teach with a{" "}
                <span className="text-cyan-400 font-semibold drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                  structured, intelligent
                </span>{" "}
                workflow.
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
                SkillBridge connects learners and mentors through a secure, efficient exchange platform. Get matched
                faster, book confidently, and learn with clarity.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="gold" className="gap-2">
                  <Link to="/register">Get Started Now <ArrowRight className="h-4 w-4" /></Link>
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
            </div>
          </div>
        </section>

        {/* Quick Flow Bar */}
        <section className="border-b border-border bg-muted/40 py-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-0">
              {quickFlow.map((f, i) => (
                <div key={f.step} className="flex items-center">
                  <div className="flex flex-col items-center gap-1 px-8 text-center">
                    <span className="text-3xl font-extrabold text-primary">{f.step}</span>
                    <span className="text-sm font-semibold text-foreground">{f.label}</span>
                  </div>
                  {i < quickFlow.length - 1 && (
                    <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Learners */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-10 max-w-2xl">
              <SectionLabel>For Learners</SectionLabel>
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">Your complete learning journey</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                From signup to certificate, every step keeps you in control.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {learnerSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-3xl font-extrabold text-border transition-colors group-hover:text-primary/20">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-card-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* For Mentors */}
        <section className="bg-muted/30 py-16 lg:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-10 max-w-2xl">
              <SectionLabel>For Mentors</SectionLabel>
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">Build your mentorship career</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Build credibility, manage sessions, and grow your impact.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mentorSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold-dark transition-colors group-hover:bg-gold group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-3xl font-extrabold text-border transition-colors group-hover:text-gold/20">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-card-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Intelligent Matching */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-card">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <SectionLabel>AI-Powered</SectionLabel>
                  <h2 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">Intelligent Matching System</h2>
                  <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                    We use recommendation logic to connect learners with the most suitable mentors for personalized,
                    effective learning.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {matchingSignals.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                        <Icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm font-medium text-foreground">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center border-t border-border bg-muted/30 p-8 lg:border-l lg:border-t-0 lg:p-12">
                  <h3 className="text-base font-bold text-foreground">Quick Flow Summary</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Your entire journey in 4 steps.</p>
                  <div className="mt-5 space-y-3">
                    {quickFlow.map((f) => (
                      <div key={f.step} className="flex items-center gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                          {f.step}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Admin */}
        <section className="bg-muted/30 py-16 lg:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-10 text-center">
              <SectionLabel>Trust & Safety</SectionLabel>
              <h2 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">Secure & Reliable Platform</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your data and transactions are fully protected end-to-end.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground">Security Features</h3>
                <p className="mt-1 text-sm text-muted-foreground">Built on modern security standards with zero compromises.</p>
                <ul className="mt-5 space-y-3">
                  {securityPoints.map(({ label }) => (
                    <li key={label} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                      <span className="text-sm text-foreground">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground">Admin Monitoring & Quality Control</h3>
                <p className="mt-1 text-sm text-muted-foreground">Operational oversight that keeps the platform trustworthy.</p>
                <ul className="mt-5 space-y-3">
                  {adminPoints.map(({ label }) => (
                    <li key={label} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-foreground">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-10 text-center">
              <SectionLabel>Why SkillBridge</SectionLabel>
              <h2 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">Why Choose SkillBridge?</h2>
              <p className="mt-2 text-sm text-muted-foreground">A community-first, secure mentorship platform built for growth.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {valueProps.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-card-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black py-20 text-white lg:py-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
          <div className="container relative mx-auto px-6 text-center">
            <div className="mx-auto max-w-2xl">
              <span className="mb-4 inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Ready to begin?
              </span>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">Start your journey today.</h2>
              <p className="mt-4 text-sm text-white/70 sm:text-base">
                Join thousands of learners and mentors already growing with SkillBridge.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button asChild size="lg" variant="gold" className="w-full gap-2 sm:w-auto">
                  <Link to="/register">Get Started Now <ArrowRight className="h-4 w-4" /></Link>
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
