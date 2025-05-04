// types/review.ts

export type Review = {
  id: string
  schoolId: string
  userName: string
  author: string
  rating: number
  comment: string
  createdAt: Date // ← Date型に変更
}
