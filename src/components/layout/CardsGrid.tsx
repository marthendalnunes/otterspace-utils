interface CardsGridProps {
  children: React.ReactNode
}

export const CardsGrid = ({ children }: CardsGridProps) => {
  return (
    <div className="mt-4 grid grid-cols-3 items-center justify-center justify-items-center gap-2">
      {children}
    </div>
  )
}
