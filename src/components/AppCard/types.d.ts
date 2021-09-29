export interface AppCardProps {
  cardContent: string | JSX.Element
  contentStyle?: string
  icon?: string
  media?: JSX.Element
  onClick?: () => void
}
