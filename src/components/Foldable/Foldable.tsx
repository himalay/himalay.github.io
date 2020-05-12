import React from 'react'
import styled from '@emotion/styled'

import mediaqueries from '@styles/media'

interface Props {
  children: React.ReactChildren | string
  className: string
}

const Foldable: React.FC<Props> = ({ children, className }) => (
  <FoldableEl
    className={className}
    onClick={(e) => {
      const target = e.target as HTMLDivElement
      const content = (target.nextElementSibling || target.parentElement?.nextElementSibling) as HTMLDivElement

      target.classList.toggle('folded')
      if (content.style.display !== 'none') {
        content.style.display = 'none'
      } else {
        content.style.display = 'block'
      }
    }}
  >
    {children}
  </FoldableEl>
)

export default Foldable

const FoldableEl = styled.div`
  cursor: pointer;
  display: inline-block;
  display: flex;
  flex: 1;
  &:hover {
    &:before {
      content: '▸';
      position: absolute;
      left: 0.5em;
      ${mediaqueries.phablet`left: 0.2em;`};
    }
  }
  &.folded {
    &:hover {
      &:before {
        content: '▾';
        position: absolute;
        left: 0.5em;
        ${mediaqueries.phablet`left: 0.2em;`};
      }
    }
    &:after {
      color: grey;
      content: '⋯';
      display: inline;
      cursor: pointer;
    }
  }
`
