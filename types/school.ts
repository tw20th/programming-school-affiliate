export type School = {
  id: string
  name: string
  features: string[] // ← features は必須
  slug: string // ← ★これが必要！
  price: string
  freeTrial: boolean
  officialUrl: string
  imageUrl?: string
  featured?: boolean // ← おすすめバッジに使われる
  recommended?: boolean
  isSideJob?: boolean
  isCareerChange?: boolean
  description?: string
}
