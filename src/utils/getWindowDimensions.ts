export default () => {
  const dimensions = {
    width: 0,
    height: 0,
  }

  if (window) {
    dimensions.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    dimensions.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }

  return dimensions
}
