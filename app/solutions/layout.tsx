import { MegaMenu } from "@/components/mega-menu"
import { Footer } from "@/components/footer"

export default function SolutionsLayout({
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
