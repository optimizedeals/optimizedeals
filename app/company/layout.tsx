import { MegaMenu } from "@/components/mega-menu"
import { Footer } from "@/components/footer"

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MegaMenu />
      {children}
      <Footer />
    </>
  )
}
