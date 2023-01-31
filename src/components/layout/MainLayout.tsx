import { ReactNode } from 'react'
import { Navbar } from '@/components/navigation/Navbar'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh_-_96px)] max-w-4xl">
        {children}
      </main>
    </>
  )
}
