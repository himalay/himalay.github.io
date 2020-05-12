import React, { useEffect } from 'react'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import { useColorMode } from 'theme-ui'

import NavigationFooter from '@components/Navigation/Navigation.Footer'
import NavigationHeader from '@components/Navigation/Navigation.Header'
import { globalStyles } from '@styles'
import Foldable from '@components/Foldable'
import Section from '@components/Section'
import mediaqueries from '@styles/media'
import ArticlesContextProvider from '../../sections/articles/Articles.List.Context'

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
const Layout: React.FC<{}> = ({ children }) => {
  const [colorMode] = useColorMode()

  useEffect(() => {
    window.parent.postMessage({ theme: colorMode }, '*')
  }, [colorMode])

  return (
    <ArticlesContextProvider>
      <Container>
        <Global styles={globalStyles} />
        <TopSection narrow>
          <Foldable className="punctuation">{'{'}</Foldable>
        </TopSection>
        <div>
          <div className="level-1">
            <NavigationHeader />
          </div>
          {children}
          <div className="level-1">
            <NavigationFooter />
          </div>
        </div>
        <BottomSection narrow className="punctuation">
          {'}'}
        </BottomSection>
      </Container>
    </ArticlesContextProvider>
  )
}

export default Layout

const PunctuationSection = styled(Section)`
  padding-left: 28px;
  ${mediaqueries.phone`padding-left: 20px`};
`
const TopSection = styled(PunctuationSection)`
  padding-top: 80px;
  ${mediaqueries.desktop_medium`padding-top: 40px;`};

  ${mediaqueries.phone`padding-top: 20px`};

  @media screen and (max-height: 800px) {
    padding-top: 20px;
  }
`

const BottomSection = styled(PunctuationSection)`
  padding-bottom: 80px;
  ${mediaqueries.desktop_medium`padding-bottom: 40px;`};

  ${mediaqueries.phone`padding-bottom: 20px`};

  @media screen and (max-height: 800px) {
    padding-bottom: 20px;
  }
`

const Container = styled.div`
  position: relative;
  background: ${(p: ThemedProp) => p.theme.colors.background};
  transition: ${(p: ThemedProp) => p.theme.colorModeTransition};
  min-height: 100vh;

  [class*='level-'] {
    padding-left: 1.5em;
    ${mediaqueries.phablet`padding-left: 1.2em;`};
  }

  .punctuation {
    color: gold;
  }
  .level-1 .punctuation {
    color: orchid;
  }
  .level-2 .punctuation {
    color: lightskyblue;
  }
`
