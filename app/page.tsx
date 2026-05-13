import { MegaMenu } from "@/components/mega-menu";
import { Hero } from "@/components/hero";
import { TrustSection } from "@/components/trust-section";
import { ServicesSection } from "@/components/services-section";
import { WhySection } from "@/components/why-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { CaseStudiesSection } from "@/components/case-studies-section";
import { LabsSection } from "@/components/labs-section";
import { InsightsSection } from "@/components/insights-section";
import { AboutSection } from "@/components/about-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { getLatestArticles } from "@/lib/mdx";

export default async function Home() {
  const latestArticles = await getLatestArticles(4);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <MegaMenu />
      <Hero />
      <TrustSection />
      <ServicesSection />
      <WhySection />
      <TechStackSection />
      <CaseStudiesSection />
      <LabsSection />
      <InsightsSection articles={latestArticles} />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  );
}
