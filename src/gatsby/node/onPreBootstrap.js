const fs = require('fs-extra') // eslint-disable-line import/no-extraneous-dependencies

module.exports = async ({ reporter }, themeOptions) => {
  const postsPath = themeOptions.contentPosts || 'content/posts'

  if (!fs.existsSync(postsPath)) {
    reporter.warn(`
      Missing directory for Posts.
      We are creating the "${postsPath}" directory for you.
      Please ensure you add your posts within "${postsPath}"
    `)

    fs.mkdirSync(postsPath, { recursive: true })
  }
}
