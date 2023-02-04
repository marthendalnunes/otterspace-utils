interface CardsGridProps {
  children: React.ReactNode
}

export const BaseGrid = ({ children }: CardsGridProps) => {
  return (
    <div className="mx-auto mt-4 grid w-fit max-w-full grid-cols-1 items-center justify-center justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  )
}
