declare module 'react-use-flexsearch' {
  export interface Result {
    excerpt: string
    id: string
    slug: string
    title: string
    date: string
  }
  export interface Store {
    [key: string]: Result
  }

  // eslint-disable-next-line no-undef
  export const useFlexSearch = (query: string, index: string, store: Store) => Array<Result>
}
