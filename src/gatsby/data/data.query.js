// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-sharp/src/fragments.js

const GatsbyFluidWithWebp = `
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
`

module.exports.local = {
  articles: `{
    articles: allArticle(
      sort: { fields: [date, title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          slug
          title
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          timeToRead
          excerpt
          canonical_url
          body
          hero {
            full: childImageSharp {
              fluid(maxWidth: 944, quality: 100) {
                ${GatsbyFluidWithWebp}
              }
            }
            regular: childImageSharp {
              fluid(maxWidth: 653, quality: 100) {
                ${GatsbyFluidWithWebp}
              }
            }
            narrow: childImageSharp {
              fluid(maxWidth: 457, quality: 100) {
                ${GatsbyFluidWithWebp}
              }
            }
            seo: childImageSharp {
              fixed(width: 1200, quality: 100) {
                src
              }
            }
          }
        }
      }
    }
  }`,
}
