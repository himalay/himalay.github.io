import React from 'react'

import Section from '@components/Section'
import styled from '@emotion/styled'
import mediaqueries from '@styles/media'
import ArticlesNext from '@sections/article/Article.Next'

const NextArticle: React.FC<{ title?: string; articles: Article }> = ({ title, articles }) => {
  return (
    <NextArticleSection narrow>
      <FooterNext>{title || 'More articles'}</FooterNext>
      <ArticlesNext articles={articles} />
      <FooterSpacer />
    </NextArticleSection>
  )
}

export default NextArticle

const NextArticleSection = styled(Section)`
  display: block;
`

const FooterNext = styled.h3`
  position: relative;
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: 400;
  color: ${(p: ThemedProp) => p.theme.colors.primary};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${(p: ThemedProp) => p.theme.colors.grey};
    width: ${(910 / 1140) * 100}%;
    height: 1px;
    right: 0;
    top: 11px;

    ${mediaqueries.tablet`
      width: ${(600 / 1140) * 100}%;
    `}

    ${mediaqueries.phablet`
      width: ${(400 / 1140) * 100}%;
    `}

    ${mediaqueries.phone`
      width: 90px
    `}
  }
`

const FooterSpacer = styled.div`
  margin-bottom: 65px;
`
