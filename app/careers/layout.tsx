import { MegaMenu } from "@/components/mega-menu"
import { Footer } from "@/components/footer"

export default function CareersLayout({
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
