import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import SEO from '@components/SEO'
import { Article } from '@types'

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            siteUrl
          }
        }
      }
    }
  }
`

interface ArticleSEOProps {
  article: Article
  location: Location
}

const ArticleSEO: React.FC<ArticleSEOProps> = ({ article, location }) => {
  const results = useStaticQuery(siteQuery)
  const { siteUrl } = results.allSite.edges[0].node.siteMetadata
  const imageLocation = siteUrl + article.hero.seo

  return (
    <SEO
      title={article.title}
      canonicalUrl={`${siteUrl}${article.slug}`}
      dateforSEO={article.dateForSEO}
      description={article.excerpt}
      articlepathName={siteUrl + location.pathname}
      image={imageLocation}
      timeToRead={article.timeToRead}
      published={article.date}
      pathname={location.pathname}
      isBlogPost
    />
  )
}

export default ArticleSEO
