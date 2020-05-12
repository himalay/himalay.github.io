import React from 'react'
import { Helmet } from 'react-helmet'

import { range } from '@utils'
import KeyValue from '@components/KeyValue'

/**
 * <Paginator />
 *
 * 1 2 3 ... final page NEXT
 * Component to navigate between different pages on a series of blog post, for example.
 *
 * We're using a <nav> element here so make sure to put the pagination component
 * INSIDE of a section to make sure the markup stays contextually relevant
 *
 * Receives the gatsby-paginator props
 */

export interface Props {
  pageCount: number
  index: number
  pathPrefix: string
}

const Paginator: React.FC<Props> = ({ pageCount: count, index: current, pathPrefix: pageRoot }) => {
  const maxPages = 3

  const getFullPath = (n: number) => {
    if (pageRoot === '/') {
      return n === 1 ? pageRoot : `${pageRoot}page/${n}`
    }
    return n === 1 ? pageRoot : `${pageRoot}/page/${n}`
  }
  const nextPath = getFullPath(current + 1)

  const previousPath = getFullPath(current - 1)

  /**
   * Utility function to return a 1 ... 5 6 7 ... 10 style pagination
   */
  function getPageLinks() {
    // Current is the page we're on
    // We want to show current - 1, current, current + 1
    // Of course if we're on page 1, we don't want a page 0
    const previousPage = current === 1 ? current : current - 1

    // Now create a range of numbers from the previousPage to the total pages (count)
    const len = count + 1 - previousPage
    const pagesRange = range(previousPage > len ? len : previousPage, len >= previousPage ? len : previousPage)

    // We might need to truncate that pagesRange if it's
    // more than the max pages we wish to display (3)
    const truncatedRange: Array<number | null> = pagesRange.slice(0, maxPages)

    // Throughout this function we might add a null to our pages range.
    // When it comes to rendering our range if we find a null we'll add a spacer.

    // We might need a spacer at the start of the pagination e.g. 1 ... 3 4 5 etc.
    // If we're after the second page, we need a ... spacer (3 and up)
    if (pagesRange[0] > 2) {
      truncatedRange.unshift(null)
    }
    // If we're after the first page, we need page 1 to appear (2 and up)
    if (pagesRange[0] > 1) {
      truncatedRange.unshift(1)
    }

    // If we're on the final page, then there won't be a "next" page and
    // the pagination will end up looking a bit short (e.g. on 8 pages ... 7, 8)
    // Push to the end an extra page maxPages from the end
    if (pagesRange[0] + 1 === count && pagesRange[0] - 1 > 0) {
      truncatedRange.splice(pagesRange.length - 1 - maxPages, 0, pagesRange[0] - 1)
    }

    // We might need a spacer at the end of the pagination e.g. 4 5 6 ... 8
    // If we're before the penultimate page, we need a ... spacer
    if (pagesRange[0] + maxPages < count) {
      truncatedRange.push(null)
    }

    // If we're before the last page, we need page <last> to appear
    if (pagesRange[0] + maxPages - 1 < count) {
      truncatedRange.push(count)
    }

    return [...new Set(truncatedRange)].map((page: number | null, i) => {
      const value = {
        objValue: page || '···',
        to: '',
        className: '',
      }

      if (page) value.to = getFullPath(page)
      if (current === page) value.className = 'active'

      return value
    })
  }

  if (count <= 1) return null

  const hasNext = current < count
  const hasPrevious = current > 1

  return (
    <>
      <Helmet>
        {hasPrevious && <link rel="prev" href={previousPath} />}
        {hasNext && <link rel="next" href={nextPath} />}
      </Helmet>
      <KeyValue
        className="pagination"
        objKey="pagination"
        objValue={[
          { objValue: '◄', ...(hasPrevious ? { to: previousPath } : {}) },
          ...getPageLinks(),
          { objValue: '►', ...(hasNext ? { to: nextPath } : {}) },
        ]}
      />
    </>
  )
}

export default Paginator
