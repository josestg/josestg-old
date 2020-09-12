export interface PostMetadata {
  date: string // 2 Aug 2020
  title: string
  image: string
  summary: string
  latex?: boolean
}

export interface Content extends PostMetadata {
  slug: string
  readTime: string
}
