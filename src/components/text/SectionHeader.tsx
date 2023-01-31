interface SectionHeaderProps {
  title: string
}
export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return <h2 className="text-3xl font-semibold">{title}</h2>
}
