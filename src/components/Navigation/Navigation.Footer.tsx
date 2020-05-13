import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Section from '@components/Section'

import KeyValue from '@components/KeyValue'

const formatSocial = (social: { [key: string]: string }) =>
  Object.entries(social).map(([key, value]) => {
    const data = {
      objKey: key,
      objValue: value,
      to: '',
    }

    switch (key) {
      case 'github':
        data.objValue = `@${value}`
        data.to = `https://github.com/${value}`
        break
      case 'linkedin':
        data.objValue = `@${value}`
        data.to = `https://www.linkedin.com/in/${value}`
        break
      case 'twitter':
        data.objValue = `@${value}`
        data.to = `https://twitter.com/${value}`
        break
      case 'instagram':
        data.objValue = `@${value}`
        data.to = `https://instagram.com/${value}`
        break
      case 'email':
        data.to = `mailto:${value}`
        break
      default:
    }

    return data
  })

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            social {
              github
              linkedin
              twitter
              instagram
              email
            }
          }
        }
      }
    }
  }
`

const Footer: React.FC<{}> = () => {
  const results = useStaticQuery(siteQuery)
  const { social } = results.allSite.edges[0].node.siteMetadata

  return (
    <Section narrow>
      <KeyValue objKey="social" objValue={formatSocial(social)} />
      <KeyValue objKey="sitemap" objValue="/sitemap.xml" to="/sitemap.xml" />
      <KeyValue objKey="rss" objValue="/rss.xml" to="/rss.xml" isLast />
    </Section>
  )
}

export default Footer
