import { MegaMenu } from "@/components/mega-menu";
import { Footer } from "@/components/footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MegaMenu />
      <main className="min-h-screen bg-background pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">{children}</div>
      </main>
      <Footer />
    </>
  );
}
