module.exports = () => {
  document.body.addEventListener('copy', function copyHandler(e) {
    let selection = document.getSelection().toString()
    try {
      selection = selection.replace(/^[\w\s]+\n?/gm, '').replace(/^,/gm, '"",')
      selection = JSON.stringify(JSON.parse(selection), null, 2)
    } catch (err) {
      //
    }
    e.clipboardData.setData('text/plain', selection)
    e.preventDefault()
  })
}
