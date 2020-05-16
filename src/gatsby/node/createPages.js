/* eslint-disable no-console, import/no-extraneous-dependencies, prefer-const, no-shadow */

require('dotenv').config()

const log = (message, section) => console.log(`\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`)

const path = require('path')
const createPaginatedPages = require('gatsby-paginate')

const templatesDirectory = path.resolve(__dirname, '../../templates')
const templates = {
  articles: path.resolve(templatesDirectory, 'articles.template.tsx'),
  article: path.resolve(templatesDirectory, 'article.template.tsx'),
  author: path.resolve(templatesDirectory, 'author.template.tsx'),
}

const query = require('../data/data.query')
const normalize = require('../data/data.normalize')

// ///////////////// Utility functions ///////////////////

function buildPaginatedPath(index, basePath) {
  if (basePath === '/') {
    return index > 1 ? `${basePath}page/${index}` : basePath
  }
  return index > 1 ? `${basePath}/page/${index}` : basePath
}

const byDate = (a, b) => new Date(b.dateForSEO) - new Date(a.dateForSEO)

// ///////////////////////////////////////////////////////

module.exports = async ({ actions: { createPage }, graphql }, themeOptions) => {
  const { rootPath, basePath = '/', pageLength = 6, sources = {}, mailchimp = '' } = themeOptions

  const { data } = await graphql(`
    query siteQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  let articles

  const dataSources = {
    local: { articles: [] },
    netlify: { articles: [] },
  }

  if (rootPath) {
    log('Config rootPath', rootPath)
  } else {
    log('Config rootPath not set, using basePath instead =>', basePath)
  }

  log('Config basePath', basePath)

  try {
    log('Querying Articles source:', 'Local')
    const localArticles = await graphql(query.local.articles)
    const hearts = await graphql(query.local.hearts)
    const comments = await graphql(query.local.comments)

    dataSources.local.articles = localArticles.data.articles.edges.map((edge) => {
      /* eslint-disable no-param-reassign */
      // attach hearts to article
      edge.node.hearts = hearts.data.allHeartsJson.nodes.filter(({ slug }) => slug === edge.node.slug)
      // attach comments to article
      edge.node.comments = comments.data.allCommentsJson.nodes.filter(({ slug }) => slug === edge.node.slug)
      return normalize.local.articles(edge)
    })
  } catch (error) {
    console.error(error)
  }

  // Combining together all the articles from different sources
  articles = [...dataSources.local.articles, ...dataSources.netlify.articles].sort(byDate)

  if (articles.length === 0) {
    throw new Error(`
    You must have at least one Post. As reference you can view the
    example repository. Look at the content folder in the example repo.
    https://github.com/narative/gatsby-theme-novela-example
  `)
  }

  /**
   * Once we've queried all our data sources and normalized them to the same structure
   * we can begin creating our pages. First, we'll want to create all main articles pages
   * that have pagination.
   * /articles
   * /articles/page/1
   * ...
   */
  log('Creating', 'articles page')
  createPaginatedPages({
    edges: articles,
    pathPrefix: basePath,
    createPage,
    pageLength,
    pageTemplate: templates.articles,
    buildPath: buildPaginatedPath,
    context: {
      basePath,
      skip: pageLength,
      limit: pageLength,
    },
  })

  log('Creating', 'article posts')
  articles.forEach((article, index) => {
    const articleUrl = `${data.site.siteMetadata.siteUrl}${article.slug}/`
    let next = articles.slice(index + 1, index + 3)
    // If it's the last item in the list, there will be no articles. So grab the first 2
    if (next.length === 0) next = articles.slice(0, 2)
    // If there's 1 item in the list, grab the first article
    if (next.length === 1 && articles.length !== 2) next = [...next, articles[0]]
    if (articles.length === 1) next = []
    createPage({
      path: article.slug,
      component: templates.article,
      context: {
        article,
        basePath,
        permalink: articleUrl,
        slug: article.slug,
        id: article.id,
        title: article.title,
        canonicalUrl: articleUrl,
        mailchimp,
        next,
      },
    })
  })
}
