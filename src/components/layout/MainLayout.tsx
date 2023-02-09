import { ReactNode } from 'react'
import { Footer } from '@/components/navigation/Footer'
import { Navbar } from '@/components/navigation/Navbar'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen-nav max-w-4xl">{children}</main>
      <Footer />
    </>
  )
}
