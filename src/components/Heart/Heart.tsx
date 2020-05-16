import React, { useEffect, useState } from 'react'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'

import { makeApiCall } from '@utils'

const HEARTS = 'HEARTS'

const Heart: React.FC<{ slug: string; count: number }> = ({ slug, count = 0 }) => {
  const [hearted, setHearted] = useState(false)
  const [heartCount, setHeartCount] = useState(count)

  useEffect(() => {
    const hearts: string[] = JSON.parse(localStorage.getItem(HEARTS) || '[]')

    if (!hearted && hearts.includes(slug)) {
      setHearted(true)
    }
  }, [slug])

  const changeHandler = async () => {
    if (hearted) return

    setHearted(true)
    setHeartCount(heartCount + 1)
    const hearts: string[] = JSON.parse(localStorage.getItem(HEARTS) || '[]')
    hearts.push(slug)
    localStorage.setItem(HEARTS, JSON.stringify(hearts))
    makeApiCall('/hearts', { slug }).catch(({ message, stack }) =>
      makeApiCall('/errors', { message, stack, slug, context: 'hearts' }).catch(() => {
        //
      }),
    )
  }

  return (
    <HeartWrapper>
      <Input id="heartToggle" type="radio" checked={hearted} onChange={changeHandler} />
      <Label htmlFor="heartToggle" aria-label="like" title="Like">
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
          />
        </svg>
      </Label>
      <span title="Like counts">{heartCount}</span>
    </HeartWrapper>
  )
}

export default Heart

/* This Twitter Heart Animation is based on : https://css-tricks.com/recreating-the-twitter-heart-animation/ */

const heart = keyframes`
0%,
17.5% {
  height: 0;
  width: 0;
}
`

const bubble = keyframes`
15% {
  transform: scale(1);
  border-color: #cc8ef5;
  border-width: 2.25rem;
}
30%,
100% {
  transform: scale(1);
  border-color: #cc8ef5;
  border-width: 0;
}
`
const sparkles = keyframes`
0%,
20% {
  opacity: 0;
}
25% {
  opacity: 1;
  box-shadow: 0.32476rem -2.4375rem 0 0rem #ff8080, -0.32476rem -2.0625rem 0 0rem #ffed80,
    2.1082rem -1.26585rem 0 0rem #ffed80, 1.41004rem -1.53985rem 0 0rem #a4ff80, 2.30412rem 0.85901rem 0 0rem #a4ff80,
    2.08305rem 0.14233rem 0 0rem #80ffc8, 0.76499rem 2.33702rem 0 0rem #80ffc8, 1.18748rem 1.71734rem 0 0rem #80c8ff,
    -1.35019rem 2.0552rem 0 0rem #80c8ff, -0.60229rem 1.99916rem 0 0rem #a480ff, -2.44865rem 0.22578rem 0 0rem #a480ff,
    -1.93852rem 0.77557rem 0 0rem #ff80ed, -1.70323rem -1.77366rem 0 0rem #ff80ed,
    -1.81501rem -1.03204rem 0 0rem #ff8080;
}
`

const HeartWrapper = styled.div`
  width: 100px;
  height: 90px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > span {
    color: #888;
  }
`

const Input = styled.input`
  position: absolute;
  left: -100vw;
  &:checked + label {
    filter: none;
    will-change: height width;
    animation: ${heart} 1s cubic-bezier(0.17, 0.89, 0.32, 1.49);
    cursor: default;
    &:before {
      animation: inherit;
      animation-timing-function: ease-out;
      will-change: transform, border-width, border-color;
      animation-name: ${bubble};
    }
    &:after {
      animation: inherit;
      animation-timing-function: ease-out;
      will-change: opacity, box-shadow;
      animation-name: ${sparkles};
    }
  }
  &:focus + label > svg {
    stroke: #e9daac;
  }
`

const labelBeforeAfter = `
position: absolute;
z-index: -1;
top: 50%;
left: 50%;
border-radius: 50%;
content: '';
`

const Label = styled.label`
  align-self: center;
  position: relative;
  color: #e2264d;
  font-size: 2em;
  height: 1em;
  width: 1em;
  filter: grayscale(1);
  user-select: none;
  cursor: pointer;
  transition: filter 0.5s ease-out;
  line-height: 0.6em;
  &:before {
    ${labelBeforeAfter}
    box-sizing: border-box;
    margin: -2.25rem;
    border: solid 2.25rem #e2264d;
    width: 4.5rem;
    height: 4.5rem;
    transform: scale(0);
  }
  &:after {
    ${labelBeforeAfter}
    margin: -0.1875rem;
    width: 0.375rem;
    height: 0.375rem;
    box-shadow: 0.32476rem -3rem 0 -0.1875rem #ff8080, -0.32476rem -2.625rem 0 -0.1875rem #ffed80,
      2.54798rem -1.61656rem 0 -0.1875rem #ffed80, 1.84982rem -1.89057rem 0 -0.1875rem #a4ff80,
      2.85252rem 0.98418rem 0 -0.1875rem #a4ff80, 2.63145rem 0.2675rem 0 -0.1875rem #80ffc8,
      1.00905rem 2.84381rem 0 -0.1875rem #80ffc8, 1.43154rem 2.22414rem 0 -0.1875rem #80c8ff,
      -1.59425rem 2.562rem 0 -0.1875rem #80c8ff, -0.84635rem 2.50595rem 0 -0.1875rem #a480ff,
      -2.99705rem 0.35095rem 0 -0.1875rem #a480ff, -2.48692rem 0.90073rem 0 -0.1875rem #ff80ed,
      -2.14301rem -2.12438rem 0 -0.1875rem #ff80ed, -2.25479rem -1.38275rem 0 -0.1875rem #ff8080;
  }

  > svg {
    width: inherit;
    height: inherit;
  }
`
