export interface BaseCardProps {
  onClick?: () => void
  children?: React.ReactNode
}

export const BaseCard = ({ onClick, children }: BaseCardProps) => {
  return (
    <div
      onClick={onClick}
      className="mt-4 cursor-pointer rounded-lg border border-stone-200 transition duration-150 hover:border-stone-500"
    >
      {children}
    </div>
  )
}
