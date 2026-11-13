import { EmailProvider } from "./components/email-context";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Nav } from "./components/Nav";
import { FinalCTA, Footer, Problem, Sectors } from "./components/Sections";
import { UseCases } from "./components/UseCases";
import { Waitlist } from "./components/Waitlist";
import { WhyVloid } from "./components/WhyVloid";
import { findImage } from "./components/media";

// Server component: static sections render to HTML with no client JS;
// only the interactive islands hydrate.
export default function Page() {
  return (
    <EmailProvider>
      <Nav />
      <main>
        <Hero image={findImage("hero")} />
        <Sectors />
        <Problem />
        <Features />
        <HowItWorks />
        <UseCases />
        <WhyVloid />
        <Waitlist />
        <FAQ />
        <FinalCTA image={findImage("cta")} />
      </main>
      <Footer />
    </EmailProvider>
  );
}
