import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import SEO from '@components/SEO'
import { Article, Author } from '@types'
import { minifyJSON } from '@utils'

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            siteUrl
          }
        }
      }
    }
  }
`

interface ArticleSEOProps {
  article: Article
  author: Author
  location: Location
}

const ArticleSEO: React.FC<ArticleSEOProps> = ({ article, author, location }) => {
  const results = useStaticQuery(siteQuery)
  const { name, siteUrl } = results.allSite.edges[0].node.siteMetadata
  const imageLocation = siteUrl + article.hero.seo

  /**
   * For some reason `location.href` is undefined here when using `yarn build`.
   * That is why I am using static query `allSite` to get needed fields: name & siteUrl.
   */
  const microdata = minifyJSON(`{
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${siteUrl + location.pathname}"
    },
    "headline": "${article.title}",
    "image": "${imageLocation}",
    "datePublished": "${article.dateForSEO}",
    "dateModified": "${article.dateForSEO}",
    "author": ${JSON.stringify({ '@type': 'Person', name: author.name })},
    "description": "${article.excerpt.replace(/"/g, '\\"')}",
    "publisher": {
      "@type": "Organization",
      "name": "${name}",
      "logo": {
        "@type": "ImageObject",
        "url": "${siteUrl}/icons/icon-512x512.png"
      }
    }
  }
`)

  return (
    <SEO
      title={article.title}
      author={author.name}
      description={article.excerpt}
      image={imageLocation}
      timeToRead={article.timeToRead}
      published={article.date}
      pathname={location.pathname}
      canonicalUrl={article.canonical_url}
    >
      <script type="application/ld+json">{microdata}</script>
    </SEO>
  )
}

export default ArticleSEO
