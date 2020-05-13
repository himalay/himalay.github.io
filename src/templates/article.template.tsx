import React, { useRef, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import throttle from 'lodash/throttle'

import Layout from '@components/Layout'
import MDXRenderer from '@components/MDX'
import Progress from '@components/Progress'

import mediaqueries from '@styles/media'
import { debounce } from '@utils'

import { Template } from '@types'
import ArticleAside from '@sections/article/Article.Aside'
import ArticleHero from '@sections/article/Article.Hero'
import ArticleControls from '@sections/article/Article.Controls'
import ArticleSEO from '@sections/article/Article.SEO'
import ArticleShare from '@sections/article/Article.Share'
import NextArticle from '@components/NextArticle'

const author = {
  name: 'Himalay Sunuwar',
  bio: 'He is the one who writes stuff.',
  avatar: '/favicon-32x32.png',
}
const Article: Template = ({ pageContext, location }) => {
  const contentSectionRef = useRef<HTMLElement>(null)

  const [hasCalculated, setHasCalculated] = useState<boolean>(false)
  const [contentHeight, setContentHeight] = useState<number>(0)

  const { article, next } = pageContext

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = contentSectionRef.current

      if (!contentSection) return

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize)
        const $imgs = contentSection.querySelectorAll('img')

        $imgs.forEach(($img) => {
          // If the image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation
        })

        // Prevent rerun of the listener attachment
        setHasCalculated(true)
      }

      // Set the height and offset of the content area
      setContentHeight(contentSection.getBoundingClientRect().height)
    }, 20)

    calculateBodySize()
    window.addEventListener('resize', calculateBodySize)

    return () => window.removeEventListener('resize', calculateBodySize)
  }, [])

  return (
    <Layout>
      <ArticleSEO article={article} author={author} location={location} />
      <ArticleHero article={article} author={author} />
      <ArticleAside contentHeight={contentHeight}>
        <Progress contentHeight={contentHeight} />
      </ArticleAside>
      <MobileControls>
        <ArticleControls />
      </MobileControls>
      <ArticleBody ref={contentSectionRef}>
        <MDXRenderer content={article.body}>
          <ArticleShare />
        </MDXRenderer>
      </ArticleBody>
      {next.length > 0 && <NextArticle articles={next} />}
    </Layout>
  )
}

export default Article

const MobileControls = styled.div`
  position: relative;
  padding-top: 60px;
  transition: background 0.2s linear;
  text-align: center;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`

const ArticleBody = styled.article`
  position: relative;
  padding: 160px 0 35px;
  padding-left: 68px;
  transition: background 0.2s linear;

  ${mediaqueries.desktop`
    padding-left: 53px;
  `}

  ${mediaqueries.tablet`
    padding: 70px 0 80px;
  `}

  ${mediaqueries.phablet`
    padding: 60px 0;
  `}
`
