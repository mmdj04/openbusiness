import {
  Hero,
  Solutions,
  HowItWorks,
  Modules,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Solutions />
      <HowItWorks />
      <Modules />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
