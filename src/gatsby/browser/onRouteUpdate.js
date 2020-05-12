/* eslint-disable */

function handleAccessibilityFocus() {
  const elementsWithA11yFocus = [...document.querySelectorAll('[data-a11y]')]

  document.addEventListener('keyup', (event) => {
    elementsWithA11yFocus.forEach((element) => {
      if (element === event.target || element.contains(event.target)) {
        element.setAttribute('data-a11y', 'true')
      } else {
        element.setAttribute('data-a11y', 'false')
      }
    })
  })

  // On mouse click change data-a11y attribute false
  document.addEventListener('mousedown', (event) => {
    elementsWithA11yFocus.forEach((element) => {
      if (element === event.target || element.contains(event.target)) {
        element.setAttribute('data-a11y', 'false')
      }
    })
  })
}

module.exports = ({ prevLocation }) => {
  const valueString = document.querySelectorAll('.value-string')
  for (let i = 0; i < valueString.length; i++) {
    valueString[i].innerHTML = `"${valueString[i].innerHTML}"`
  }

  handleAccessibilityFocus()

  if (prevLocation) {
    localStorage.setItem('previousPath', prevLocation.pathname)
  }
}
