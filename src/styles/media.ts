import { css, SerializedStyles } from '@emotion/core'

import theme from '../gatsby-plugin-theme-ui'

const toEm = (size: number) => `${size / 16}em`

/**
 * All breakpoints can be found inside of theme.breakpoints.
 * Each is turned in to a min + 1 and max-width version.
 *
 * There are also break points to cover coarse and fine pointer devices
 *
 * @example
 *
 *    ${mediaqueries.phone` width: 100px; `};
 *    ${mediaqueries.tablet_up` width: 200px; `};
 */
interface Mediaqueries {
  /* eslint-disable camelcase */
  desktop: (param: TemplateStringsArray) => SerializedStyles
  desktop_large: (param: TemplateStringsArray) => SerializedStyles
  desktop_large_up: (param: TemplateStringsArray) => SerializedStyles
  desktop_medium: (param: TemplateStringsArray) => SerializedStyles
  desktop_medium_up: (param: TemplateStringsArray) => SerializedStyles
  desktop_up: (param: TemplateStringsArray) => SerializedStyles
  phablet: (param: TemplateStringsArray) => SerializedStyles
  phablet_up: (param: TemplateStringsArray) => SerializedStyles
  phone: (param: TemplateStringsArray) => SerializedStyles
  phone_small: (param: TemplateStringsArray) => SerializedStyles
  phone_small_up: (param: TemplateStringsArray) => SerializedStyles
  phone_up: (param: TemplateStringsArray) => SerializedStyles
  tablet: (param: TemplateStringsArray) => SerializedStyles
  tablet_up: (param: TemplateStringsArray) => SerializedStyles
}

const mediaqueries = theme.breakpoints.reduce(
  (acc, [label, size], i) => ({
    ...acc,
    // max-width media query e.g. mediaqueries.desktop
    [label]: (...args: string[]) => css`
      @media (max-width: ${toEm(size)}) {
        ${css(...args)};
      }
    `,
    // min-width media query e.g. mediaqueries.desktop_up
    // This is the breakpoint prior's size +1
    [`${label}_up`]: (...args: string[]) => css`
      @media (min-width: ${toEm(theme.breakpoints[i - 1][1] + 1)}) {
        ${css(...args)};
      }
    `,
  }),
  {} as Mediaqueries,
)

export const media = mediaqueries

export default mediaqueries
