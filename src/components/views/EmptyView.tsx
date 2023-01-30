interface EmptyViewProps {
  title: string
}

export const EmptyView = ({ title }: EmptyViewProps) => {
  return (
    <div className="flex min-h-screen-nav items-center justify-center text-4xl font-bold">
      <h1>{title}</h1>
    </div>
  )
}
