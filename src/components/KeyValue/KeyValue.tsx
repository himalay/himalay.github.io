import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Foldable from '@components/Foldable'
import mediaqueries from '@styles/media'
import Mark from './Mark'

const Entry = styled.div`
  font-family: ${(p: ThemedProp) => p.theme.fonts.monospace};
  font-size: 1em;
  .key {
    color: ${(p: ThemedProp) => p.theme.colors.keyColor};
  }
  .value-string,
  .double-quote {
    color: #2aa198;
  }
  .disabled {
    color: #657b83;
  }
  .value-number {
    color: #d33682;
  }
  [role='button'],
  a,
  a:hover {
    cursor: pointer;
    text-decoration: none;
    position: relative;
    border-bottom: 1px solid;
    &:hover {
      border-bottom: 3px solid;
    }
    &.value-number {
      border-bottom: 1px solid;
      &:hover {
        border-bottom: 3px solid;
      }
    }
  }
  &.pagination .active:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    height: 1px;
    width: 100%; /* or 100px */
    border-bottom: 3px solid;
  }
  &.search {
    display: flex;
      input {
        flex: 1;
        background: transparent;
        border: 0;
        border-bottom: 1px dashed;
        &:focus + button {
          opacity: 1;
        }
        ${mediaqueries.phone` width: 100px; `};
      }
    }
  }
  &.flex {
    display: flex;
  }
`

interface Props {
  className?: string
  objKey?: string
  objValue?: string | number | Props[]
  to?: string
  isLast?: boolean
}
const concatString = (x: string | number = '', y: string | number) => `${x}${y}`

const KeyValue: React.FC<Props> = ({ className, children, objKey, objValue, to, isLast = false }) => {
  const valueClassName = `value-${typeof objValue === 'number' ? 'number' : 'string'}`

  if (typeof objValue === 'object') {
    const isKeyValue = objValue[0].objKey
    if (isKeyValue) {
      return (
        <>
          <Entry className="flex">
            <span className="key">{`"${objKey}"`}</span>
            <Mark>:</Mark>
            <Foldable className="punctuation">{'{'}</Foldable>
          </Entry>
          <Entry className="level-2">
            {objValue.map((x, i) => (
              <KeyValue
                key={concatString(x.objKey, i)}
                objKey={x.objKey}
                objValue={x.objValue}
                to={x.to}
                isLast={i === objValue.length - 1}
              />
            ))}
          </Entry>
          <Entry>
            <span className="punctuation">{'}'}</span>
            {!isLast && <Mark>,</Mark>}
          </Entry>
        </>
      )
    }

    return (
      <Entry className={className}>
        <span className="key">{`"${objKey}"`}</span>
        <Mark>:</Mark>
        <span className="punctuation">[</span>
        {objValue.map((x, i) => {
          const elClass = `value-${typeof x.objValue === 'number' ? 'number' : 'string'}${
            x.className ? ` ${x.className}` : ''
          }`
          return (
            <React.Fragment key={concatString(x.objKey, i)}>
              {x.to ? (
                <Link
                  to={x.to}
                  className={elClass}
                  target="_blank"
                  rel="noopener nofollow"
                  data-a11y="false"
                  aria-label={`Link to ${x.to}`}
                >
                  {x.objValue}
                </Link>
              ) : (
                <span className={elClass}>{x.objValue}</span>
              )}
              {i !== objValue.length - 1 && <Mark>,</Mark>}
            </React.Fragment>
          )
        })}
        <span className="punctuation">]</span>
        <Mark>,</Mark>
      </Entry>
    )
  }

  let childElement = children

  if (!children) {
    if (to) {
      childElement = /^(http|mail|tel)/.test(to || '') ? (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a href={to} target="_blank" rel="noreferrer" className={valueClassName}>
          {objValue}
        </a>
      ) : (
        <Link to={to} className={valueClassName}>
          {objValue}
        </Link>
      )
    } else {
      childElement = <span className={valueClassName}>{objValue}</span>
    }
  }

  return (
    <Entry className={className}>
      <span className="key">{`"${objKey}"`}</span>
      <Mark>:</Mark>
      {childElement}
      {!isLast && <Mark>,</Mark>}
    </Entry>
  )
}

export default KeyValue
