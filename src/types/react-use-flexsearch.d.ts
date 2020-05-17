declare module 'react-use-flexsearc' {
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

  export function useFlexSearch(query: string, index: string, store: Store): Array<Result>
}
