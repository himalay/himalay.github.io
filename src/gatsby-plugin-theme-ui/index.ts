import colors from './colors'
import tags from './tags'

type BreakPoint = [string, number]

const breakpoints: BreakPoint[] = [
  ['phone_small', 320],
  ['phone', 376],
  ['phablet', 540],
  ['tablet', 735],
  ['desktop', 1070],
  ['desktop_medium', 1280],
  ['desktop_large', 1440],
]

const fonts = {
  serif: "'Merriweather', Georgia, Serif",
  sansSerif:
    "'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', " +
    "'Noto', 'Segoe UI', 'Arial', sans-serif",
  monospace: '"Droid Sans Mono", monospace, monospace, "Droid Sans Fallback"', // '"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace',
}

const colorModeTransition = 'background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad)'

export default {
  initialColorMode: 'dark',
  useCustomProperties: true,
  colorModeTransition,
  colors,
  fonts,
  breakpoints,
  tags,
}
