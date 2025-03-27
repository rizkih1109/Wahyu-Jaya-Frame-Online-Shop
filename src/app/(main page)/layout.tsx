import Footer from "@/components/Footer"
import Header from "@/components/Header"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Header />
            <main className="bg-slateBg">{children}</main>
            <Footer />
        </div>
    )
}