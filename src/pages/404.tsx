import React, { useState } from 'react'
import { navigate } from 'gatsby'

import Section from '@components/Section'
import Headings from '@components/Headings'
import styled from '@emotion/styled'
import mediaqueries from '@styles/media'
import Layout from '@components/Layout'

const NotFound: React.FC<{}> = () => {
  const [query, setQuery] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    navigate(`/?s=${query}`)
  }

  return (
    <Layout>
      <Section narrow>
        <NotFoundContainer>
          <Content>
            <Heading>404: Page not found</Heading>
            <Text>
              I'm guessing you are here for articles. Put in a search term below to find what you are looking for.
            </Text>
            <Form onSubmit={handleSubmit}>
              <label htmlFor="NotFoundInput">
                <Input
                  id="NotFoundInput"
                  placeholder="Search..."
                  name="email"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.currentTarget.value)}
                />
              </label>
              <Button type="submit">Search</Button>
            </Form>
          </Content>
        </NotFoundContainer>
      </Section>
    </Layout>
  )
}

export default NotFound

const NotFoundContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 64px 0 55px;
  margin: 64px auto 64px;
  background: ${(p) => p.theme.colors.card};
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
  z-index: 1;

  ${mediaqueries.tablet`
    padding: 50px 0 0;
    text-align: center;
  `}

  ${mediaqueries.phablet`
    margin: 24px auto 24px;
  `}
`

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 640px;

  ${mediaqueries.tablet`
    h3 {
      padding: 0 50px;
    }
  `}

  ${mediaqueries.phone`
    h3 {
      padding: 0 24px;
    }
  `}
`

const Heading = styled(Headings.h3)`
  margin-bottom: 20px;

  ${mediaqueries.tablet`
    margin-bottom: 15px;
  `}
`

const Text = styled.p`
  margin: 0 auto 30px;
  color: ${(p) => p.theme.colors.grey};
  line-height: 1.75;

  ${mediaqueries.tablet`
    padding: 0 26px;
    margin: 0 auto 25px;
  `}
`

const Form = styled.form`
  position: relative;

  &::after {
    content: '🔍';
    position: absolute;
    left: 21px;
    top: 10px;
    color: ${(p) => p.theme.colors.accent};

    ${mediaqueries.tablet`
    left: 34px;
    top: 11px;
  `}
  }
`

const Input = styled.input`
  position: relative;
  background: ${(p) => p.theme.colors.inputBackground};
  border-radius: 35px;
  border: none;
  padding: 13px 21px 13px 45px;
  width: 471px;
  color: ${(p) => p.theme.colors.primary};

  ::placeholder {
    color: ${(p) => p.theme.colors.track};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${(p) => p.theme.colors.track};
  }

  ::-ms-input-placeholder {
    color: ${(p) => p.theme.colors.track};
  }

  ${mediaqueries.tablet`
    width: calc(100% - 36px);
    margin: 0 18px;
    padding: 14px 14px 14px 40px;
    margin-bottom: 30px;
  `}
`

const Button = styled.button`
  position: absolute;
  left: 306px;
  top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 161px;
  height: 38px;
  border: 1px solid ${(p) => p.theme.colors.accent};
  color: ${(p) => p.theme.colors.accent};
  background: ${(p) => 'transparent'};
  font-weight: 600;
  border-radius: 35px;
  letter-spacing: 0.42px;
  transition: border-color 0.2s var(--ease-in-out-quad), background 0.2s var(--ease-in-out-quad),
    color 0.2s var(--ease-in-out-quad);

  &:hover {
    background: ${(p) => p.theme.colors.accent};
    color: ${(p) => p.theme.colors.background};
  }

  &[disabled] {
    cursor: not-allowed;
  }

  svg * {
    fill: ${(p) => p.theme.colors.background};
  }

  ${(p) => mediaqueries.tablet`
    position: relative;
    height: 60px;
    width: 100%;
    top: 0;
    left: 0;
    border: none;
    border-radius: 0;
    border-top: 1px solid ${p.theme.colors.horizontalRule};

    &:hover {
      color: initial;
      background: initial;
    }
  `}
`
