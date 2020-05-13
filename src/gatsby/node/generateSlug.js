const slugify = require('slugify')

function generateArticlePermalink(slug, date) {
  const [year, month, day] = date.match(/\d{4}-\d{2}-\d{2}/)[0].split('-')
  const permalinkData = {
    year,
    month,
    day,
    slug: slugify(slug, { lower: true }),
  }

  const articlePermalinkFormat = ':slug' // Possible values: `:slug`, `:year`, `:month`

  const permalink = articlePermalinkFormat.replace(/(:[a-z_]+)/g, (match) => {
    const key = match.substr(1)
    // eslint-disable-next-line no-prototype-builtins
    if (permalinkData.hasOwnProperty(key)) {
      return permalinkData[key]
    }
    throw new Error(`
        We could not find the value for: "${key}".
        Please verify the articlePermalinkFormat format in theme options.
        https://github.com/narative/gatsby-theme-novela#theme-options
      `)
  })

  return permalink
}

module.exports = (basePath, slug, date) => {
  return `/${basePath}/${generateArticlePermalink(slug, date)}`.toLowerCase().replace(/\/\/+/g, '/')
}
