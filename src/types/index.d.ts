/* eslint-disable @typescript-eslint/no-explicit-any */
interface GatsbyImage {
  src: string
  base64?: string
  srcWebp?: string
  srcSet?: string
  srcSetWebp?: string
  tracedSVG?: string
}

interface GatsbyImageFluid extends GatsbyImage {
  maxHeight: number
  maxWidth: number
}

interface GatsbyImageFixed extends GatsbyImage {
  height: number
  width: number
}

export interface Author {
  name: string
  bio: string
  avatar: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  body: string
  id: string
  hero: {
    full: GatsbyImageFluid
    preview: GatsbyImageFluid
    regular: GatsbyImageFluid
    seo: string
  }
  timeToRead: number
  date: string
  dateForSEO: string
  // eslint-disable-next-line camelcase
  canonical_url: string
}

interface ArticleQuery {
  edges: {
    node: Article
  }[]
}

export interface PageContext {
  article: Article
  next: Article[]
  additionalContext: any
  group: Article[] | null
  pageCount: number
  index: number
  pathPrefix: string
}

export interface Progress {
  height: number
  offset: number
  title: string
  mode: string
  onClose?: () => void
}

export type Icon = React.FC<{
  height?: string
  width?: string
  fill?: string
}>

export type Template = React.FC<{
  pageContext: PageContext
  location: Location
}>
