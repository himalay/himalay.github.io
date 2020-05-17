/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Returns the X and Y coordinates of a selected piece of Text.
 * This will always return the top left corner of the selection.
 */
export const getHighlightedTextPositioning = () => {
  let x = 0
  let y = 0

  const sel = window.getSelection()
  if (sel?.rangeCount) {
    const range = sel.getRangeAt(0).cloneRange()

    if (range.getClientRects) {
      range.collapse(true)
      const rects = range.getClientRects()

      if (rects.length > 0) {
        const { left, top } = rects[0]
        x = left
        y = top
      }
    }

    // Fall back to inserting a temporary element
    if (x === 0 && y === 0) {
      const span = document.createElement('span')
      if (span.getClientRects) {
        // Ensure span has dimensions and position by
        // adding a zero-width space character
        span.appendChild(document.createTextNode('\u200b'))
        range.insertNode(span)

        const rects = span.getClientRects()

        if (rects.length > 0) {
          const { left, top } = rects[0]
          x = left
          y = top
        }
        const spanParent = span.parentNode
        if (spanParent) {
          spanParent.removeChild(span)
          // Glue any broken text nodes back together
          spanParent.normalize()
        }
      }
    }
  }

  return { x, y }
}

const isOrContains = (node: Node | null, container: Node) => {
  while (node) {
    if (node === container) {
      return true
    }
    node = node.parentNode
  }
  return false
}

const elementContainsSelection = (el: Element) => {
  const sel = window.getSelection()
  if (sel && sel.rangeCount > 0) {
    for (let i = 0; i < sel.rangeCount; ++i) {
      if (!isOrContains(sel.getRangeAt(i).commonAncestorContainer, el)) {
        return false
      }
    }
    return true
  }

  return false
}

export const getSelectionDimensions = () => {
  const dimensions = {
    width: 0,
    height: 0,
  }

  const isSelectedInPrism = Array.from(document.getElementsByClassName('prism-code'))
    .map((el) => elementContainsSelection(el))
    .some((bool) => bool)

  const isSelectedInArticle = Array.from(document.getElementsByTagName('article'))
    .map((el) => elementContainsSelection(el))
    .some((bool) => bool)

  /**
   * we don't want to show the ArticleShare option when it's outside of
   * the article body or within prism code.
   */
  if (isSelectedInPrism || !isSelectedInArticle) {
    return dimensions
  }

  const sel = window.getSelection()
  if (sel?.rangeCount) {
    const range = sel.getRangeAt(0).cloneRange()
    const rect = range.getBoundingClientRect()
    dimensions.width = rect.right - rect.left
    dimensions.height = rect.bottom - rect.top
  }

  return dimensions
}
