import React from 'react'

import Section from '@components/Section'
import SEO from '@components/SEO'
import Layout from '@components/Layout'

import ArticlesList from '@sections/articles/Articles.List'

import { Template } from '@types'

const ArticlesPage: Template = ({ location, pageContext }) => {
  return (
    <Layout>
      <SEO pathname={location.pathname} isBlogPost={false} />
      <div className="level-1">
        <Section narrow>
          <ArticlesList pageContext={pageContext} />
        </Section>
      </div>
    </Layout>
  )
}

export default ArticlesPage
