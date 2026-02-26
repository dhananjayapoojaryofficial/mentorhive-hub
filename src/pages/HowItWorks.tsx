import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/landing/HowItWorksSection";

const HowItWorks = () => {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main>
        <HowItWorksSection />

        <section className="py-12 text-center">
          <div className="container mx-auto px-6">
            <h3 className="text-xl font-semibold mb-2">Want to try it?</h3>
            <p className="text-muted-foreground">Create an account and book your first session.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
