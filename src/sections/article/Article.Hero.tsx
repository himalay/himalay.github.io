import React from 'react'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'

import Headings from '@components/Headings'
import Image, { ImagePlaceholder } from '@components/Image'

import mediaqueries from '@styles/media'
import { Article, Author } from '@types'

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            bio
            siteUrl
          }
        }
      }
    }
  }
`

const ArticleAuthor: React.FC<{ author: Author }> = ({ author }) => {
  return (
    <AuthorWrapper>
      <AuthorAvatar>
        <RoundedImage src={author.avatar} alt={author.name} />
      </AuthorAvatar>
      <strong>{author.name}</strong>
      <HideOnMobile>,&nbsp;</HideOnMobile>
    </AuthorWrapper>
  )
}

interface ArticleHeroProps {
  article: Article
  author: Author
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ article }) => {
  const results = useStaticQuery(siteQuery)
  const { name, bio, siteUrl } = results.allSite.edges[0].node.siteMetadata
  const hasHeroImage =
    article.hero && Object.keys(article.hero.full).length !== 0 && article.hero.full.constructor === Object

  return (
    <>
      <Header>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroSubtitle>
          <ArticleAuthor author={{ name, bio, avatar: `${siteUrl}/icons/icon-512x512.png` }} />
          <ArticleMeta>
            {article.date} · {article.timeToRead} min read
          </ArticleMeta>
        </HeroSubtitle>
      </Header>
      <HeroImage id="ArticleImage__Hero">
        {hasHeroImage ? <Image src={article.hero.full} alt={article.title} /> : <ImagePlaceholder />}
      </HeroImage>
    </>
  )
}

export default ArticleHero

const AuthorAvatar = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 14px;
  background: ${(p: ThemedProp) => p.theme.colors.grey};
  overflow: hidden;

  .gatsby-image-wrapper > div {
    padding-bottom: 100% !important;
  }

  ${mediaqueries.phablet`display: none;`}

  img {
    height: inherit;
    width: inherit;
  }
`

const RoundedImage = styled(Image)`
  border-radius: 50%;
`

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  color: inherit;

  strong {
    transition: ${(p: ThemedProp) => p.theme.colorModeTransition};
  }
`
const HideOnMobile = styled.span`
  ${mediaqueries.phablet`
    display: none;
  `}
`

const ArticleMeta = styled.div`
  margin-left: 0;

  ${mediaqueries.phablet`
    margin-left: 0;
  `}
`

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin:100px auto 120px;
  padding-left: 68px;
  max-width: 749px;

  ${mediaqueries.desktop`
    padding-left: 53px;
    max-width: calc(507px + 53px);
    margin: 100px auto 70px;
  `}

  ${mediaqueries.tablet`
    padding-left: 0;
    margin: 100px auto 70px;
    max-width: 480px;
  `}

  ${mediaqueries.phablet`
    margin: 150px auto 160px;
    padding: 0 40px;
  `}

  @media screen and (max-height: 700px) {
    margin: 100px auto;
  }
`

const HeroHeading = styled(Headings.h1)`
  font-size: 48px;
  font-family: ${(p: ThemedProp) => p.theme.fonts.serif};
  margin-bottom: 25px;
  font-weight: bold;
  line-height: 1.32;

  ${mediaqueries.tablet`
    margin-bottom: 20px;
    font-size: 36px;
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`

const HeroSubtitle = styled.div`
  position: relative;
  display: flex;
  font-size: 18px;
  color: ${(p: ThemedProp) => p.theme.colors.grey};

  ${mediaqueries.phablet`
    font-size: 14px;
    flex-direction: column;

    strong {
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
    }
  `}
`

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 944px;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.2), 0 18px 36px -18px rgba(0, 0, 0, 0.22);

  ${mediaqueries.tablet`
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto;
    width: calc(100vw - 40px);
    height: 220px;

    & > div {
      height: 220px;
    }
`}
`
