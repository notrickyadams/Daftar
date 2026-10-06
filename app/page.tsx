import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Demo from "@/components/demo/Demo";
import Features from "@/components/Features";
import WhyNow from "@/components/WhyNow";
import BusinessModel from "@/components/BusinessModel";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Demo />
        <Features />
        <WhyNow />
        <BusinessModel />
        <Team />
      </main>
      <Footer />
    </>
  );
}
