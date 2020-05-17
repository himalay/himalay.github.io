import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { PageContext, Article } from '@types'
import KeyValue, { Mark } from '@components/KeyValue'
import Foldable from '@components/Foldable'
import Search from '@components/Search'
import Paginator from '@components/Navigation/Navigation.Paginator'
import himalayLogo from '@assets/himalay_logo.png'

interface ArticlesListProps {
  pageContext: PageContext
  alwaysShowAllDetails?: boolean
}

const ArticlesList: React.FC<ArticlesListProps> = ({ pageContext, alwaysShowAllDetails }) => {
  const [searchResult, setSearchResult] = useState<Article[] | null>()
  const articles = pageContext.group
  useEffect(() => {
    const copyHandler = (e: ClipboardEvent) => {
      let selection = document.getSelection()?.toString() || ''

      try {
        selection = selection.replace(/^[\w\s]+\n?/gm, '').replace(/^,/gm, '"",')
        selection = JSON.stringify(JSON.parse(selection), null, 2)
      } catch (err) {
        //
      }

      if (e.clipboardData) e.clipboardData.setData('text/plain', selection)
      e.preventDefault()
    }
    document.body.addEventListener('copy', copyHandler)

    return () => document.body.removeEventListener('copy', copyHandler)
  }, [])

  if (!articles) return null

  return (
    <>
      <ArticlesListContainer alwaysShowAllDetails={alwaysShowAllDetails}>
        <Search onSearchResults={(r) => setSearchResult(r)} />
        <Hidden>
          <img src={himalayLogo} alt="Himalay logo" />
          <h1>Himalay Sunuwar</h1>
        </Hidden>
        <KeyValue objKey="posts" className="flex" isLast>
          <Foldable className="punctuation">[</Foldable>
        </KeyValue>
        <div className="level-2">
          {(searchResult || articles).map((a, i, data) => (
            <React.Fragment key={a.id}>
              <Foldable className="punctuation">{'{'}</Foldable>
              <div className="level-3">
                <KeyValue objKey="title" objValue={a.title} to={a.slug} />
                <KeyValue objKey="date" objValue={a.date} />
                <KeyValue objKey="excerpt" objValue={a.excerpt} isLast />
              </div>
              <div>
                <span className="punctuation">{'}'}</span>
                {i !== data.length - 1 && <Mark>,</Mark>}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div>
          <span className="punctuation">]</span>
          <Mark>,</Mark>
        </div>
      </ArticlesListContainer>

      {!searchResult && (
        <ArticlesPaginator show={pageContext.pageCount > 1}>
          <Paginator pageCount={pageContext.pageCount} index={pageContext.index} pathPrefix={pageContext.pathPrefix} />
        </ArticlesPaginator>
      )}
    </>
  )
}

export default ArticlesList

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${(p) => p.show}
`

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`

const ArticlesListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
  transition: opacity 0.25s;
  ${(p) => p.alwaysShowAllDetails && showDetails}
`

const Hidden = styled.div`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
  &:focus {
    background-color: #eee;
    clip: auto !important;
    clip-path: none;
    color: #444;
    display: block;
    font-size: 1em;
    height: auto;
    left: 5px;
    line-height: normal;
    padding: 15px 23px 14px;
    text-decoration: none;
    top: 5px;
    width: auto;
    z-index: 100000;
  }
`
