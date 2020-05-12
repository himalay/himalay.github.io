import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { navigate, graphql, useStaticQuery } from 'gatsby'
import { useColorMode } from 'theme-ui'

import { getWindowDimensions, getBreakpointFromTheme } from '@utils'
import Icons from '@icons'
import mediaqueries from '@styles/media'
import KeyValue from '@components/KeyValue'
import Section from '../Section'

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            bio
          }
        }
      }
    }
  }
`

const DarkModeToggle: React.FC<{}> = () => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === 'dark'

  function toggleColorMode(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setColorMode(isDark ? 'light' : 'dark')
  }

  return (
    <IconWrapper
      isDark={isDark}
      onClick={toggleColorMode}
      data-a11y="false"
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  )
}

const NavigationHeader: React.FC<{}> = () => {
  const [showBackArrow, setShowBackArrow] = useState<boolean>(false)
  const [previousPath, setPreviousPath] = useState<string>('/')

  const results = useStaticQuery(siteQuery)
  const { name, bio } = results.allSite.edges[0].node.siteMetadata

  const [colorMode] = useColorMode()
  const fill = colorMode === 'dark' ? '#fff' : '#000'

  useEffect(() => {
    const { width } = getWindowDimensions()
    const phablet = getBreakpointFromTheme('phablet')

    const prev = localStorage.getItem('previousPath')
    const previousPathWasHomepage = prev === '/' || (prev && prev.includes('/page/'))
    const currentPathIsHomepage = window.location.pathname === '/' || window.location.pathname.includes('/page/')

    setShowBackArrow((previousPathWasHomepage && !currentPathIsHomepage && width <= phablet) || false)
    setPreviousPath(prev || '/')
  }, [])

  return (
    <>
      <NavSection narrow>
        <NavControls>
          {showBackArrow ? (
            <button
              type="button"
              onClick={() => navigate(previousPath)}
              title="Navigate back to the homepage"
              aria-label="Navigate back to the homepage"
            >
              <Icons.Ex fill={fill} />
            </button>
          ) : (
            <DarkModeToggle />
          )}
        </NavControls>
      </NavSection>
      <Section narrow>
        <KeyValue objKey="name" objValue={name} to="/" />
        <KeyValue objKey="bio" objValue={bio} />
      </Section>
    </>
  )
}

export default NavigationHeader

const NavSection = styled(Section)`
  position: relative;
`

const NavControls = styled.div`
  position: absolute;
  top: -24px;
  right: 40px;
  display: flex;
  align-items: center;
  ${mediaqueries.tablet`right: 20px;`}
`

const IconWrapper = styled.button<{ isDark: boolean }>`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin-left: 30px;
  border: none;
  outline: none;

  &:hover {
    opacity: 1;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid ${(p: ThemedProp) => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    display: inline-flex;
    transform: scale(0.708);
    margin-left: 10px;


    &:hover {
      opacity: 0.5;
    }
  `}
`

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div<{ isDark: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${(p) => (p.isDark ? '4px' : '2px')} solid ${(p: ThemedProp) => p.theme.colors.primary};
  background: ${(p: ThemedProp) => p.theme.colors.primary};
  transform: scale(${(p) => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${(p) => (p.isDark ? 'visible' : 'hidden')};

  &::before {
    content: '';
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid ${(p: ThemedProp) => p.theme.colors.primary};
    border-radius: 50%;
    transform: translate(${(p) => (p.isDark ? '14px, -14px' : '0, 0')});
    opacity: ${(p) => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${(p: ThemedProp) => p.theme.colors.primary},
      0 23px 0 ${(p: ThemedProp) => p.theme.colors.primary}, 23px 0 0 ${(p: ThemedProp) => p.theme.colors.primary},
      -23px 0 0 ${(p: ThemedProp) => p.theme.colors.primary}, 15px 15px 0 ${(p: ThemedProp) => p.theme.colors.primary},
      -15px 15px 0 ${(p: ThemedProp) => p.theme.colors.primary},
      15px -15px 0 ${(p: ThemedProp) => p.theme.colors.primary},
      -15px -15px 0 ${(p: ThemedProp) => p.theme.colors.primary};
    transform: scale(${(p) => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;

    ${(p) => mediaqueries.tablet`
      transform: scale(${p.isDark ? 0.92 : 0});
    `}
  }
`

const MoonMask = styled.div<{ isDark: boolean }>`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: ${(p: ThemedProp) => p.theme.colors.background};
  transform: translate(${(p) => (p.isDark ? '14px, -14px' : '0, 0')});
  opacity: ${(p) => (p.isDark ? 0 : 1)};
  transition: ${(p: ThemedProp) => p.theme.colorModeTransition}, transform 0.45s ease;
`
