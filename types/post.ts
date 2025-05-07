export type Post = {
  id: string
  title: string
  body: string
  slug: string
  category?: string
  tags?: string[]
  thumbnailUrl?: string
  thumbnailAttribution?: {
    photographer: string
    photographer_url: string
  }
  createdAt: { seconds: number }
}
