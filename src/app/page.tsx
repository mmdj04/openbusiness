import {
  Hero,
  Solutions,
  Modules,
  Pricing,
  FAQ,
  CTA,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Solutions />
      <Modules />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
