import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="hero-gradient rounded-2xl p-12 text-center md:p-20">
        <h2 className="mb-4 text-3xl font-extrabold text-primary-foreground md:text-4xl">
          Ready to Bridge Your <span className="text-gradient-gold">Skills Gap</span>?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-primary-foreground/70">
          Join thousands of learners and mentors building the future together. Start your journey today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/register">Join as Learner <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <Link to="/register">Become a Mentor</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
