import theme from '../gatsby-plugin-theme-ui'

type Theme = typeof theme

declare global {
  interface ThemedProp {
    theme: Theme
  }
}
