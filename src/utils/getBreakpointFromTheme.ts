import theme from '../gatsby-plugin-theme-ui'

export default (name: string) => theme.breakpoints.find(([label]) => label === name)?.[1]
