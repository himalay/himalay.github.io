import React, { useState, useEffect } from 'react'
import { useFlexSearch, Result, Store } from 'react-use-flexsearch'
import { graphql, useStaticQuery } from 'gatsby'
import KeyValue from '@components/KeyValue'

const siteQuery = graphql`
  query {
    localSearchPages {
      index
      store
    }
  }
`
const getParameterByName = (name: string) => {
  const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

export interface Props {
  onSearchResults: (results: Result[] | null) => void
}

interface SearchProps extends Props {
  search: { index: string; store: Store }
}

const SearchComponent: React.FC<SearchProps> = ({ onSearchResults, search }) => {
  const [query, setQuery] = useState('')
  const [checkUrl, setCheckUrl] = useState(true)
  const results = useFlexSearch(query, search.index, search.store)

  useEffect(() => {
    onSearchResults(query === '' ? null : results)
    if (checkUrl) {
      const urlSearch = getParameterByName('s')
      if (urlSearch) {
        setQuery(urlSearch)
      }
      setCheckUrl(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, checkUrl])

  return (
    <label htmlFor="searchInput">
      <KeyValue objKey="search" className="search">
        <input
          id="searchInput"
          className="value-string inline"
          type="search"
          placeholder="Search..."
          name="s"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (e.target.value === '') {
              onSearchResults(null)
            }
          }}
        />
      </KeyValue>
    </label>
  )
}

const Search: React.FC<Props> = ({ onSearchResults }) => {
  const {
    localSearchPages: { index, store },
  } = useStaticQuery(siteQuery)

  return <SearchComponent onSearchResults={onSearchResults} search={{ index, store: JSON.parse(store) }} />
}

export default Search
