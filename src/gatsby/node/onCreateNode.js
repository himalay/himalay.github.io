/* eslint-disable no-prototype-builtins */

const crypto = require('crypto')
const toHAST = require('mdast-util-to-hast')
const hastToHTML = require('hast-util-to-html')
const Remark = require('remark')

const generateSlug = require('./generateSlug')

const remark = new Remark().data('settings', {
  commonmark: true,
  footnotes: true,
  pedantic: true,
})

// Create fields for post slugs and source
// This will change with schema customization with work
module.exports = ({ node, actions, getNode, createNodeId }, themeOptions) => {
  const { createNode, createParentChildLink, createNodeField } = actions
  const contentPath = themeOptions.contentPath || 'content/posts'
  const basePath = themeOptions.basePath || '/'

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode && fileNode.sourceInstanceName

  if (node.internal.type === 'Mdx' && source === contentPath) {
    const fieldData = {
      date: node.frontmatter.date,
      hero: node.frontmatter.hero,
      slug: generateSlug(basePath, node.frontmatter.slug || node.frontmatter.title, node.frontmatter.date),
      title: node.frontmatter.title,
    }

    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Article`),
      parent: node.id,
      children: [],
      internal: {
        type: 'Article',
        contentDigest: crypto.createHash('md5').update(JSON.stringify(fieldData)).digest('hex'),
        content: JSON.stringify(fieldData),
        description: 'Article Posts',
      },
    })

    createParentChildLink({ parent: fileNode, child: node })
  }

  // For comment nodes (which are stored in JSON) parse the `message` field from
  // markdown into HTML, and add it to the node as a field called `messageHtml`.
  // Then we can use that field to render the comments.
  if (node.internal.type === 'CommentsJson' && source === 'data/comments') {
    // Generate an HTML version of the markdown field `message`
    const ast = remark.parse(node.message)
    const htmlAst = toHAST(ast, { allowDangerousHtml: true })
    const html = hastToHTML(htmlAst, {
      allowDangerousHtml: true,
    })

    createNodeField({
      node,
      name: 'messageHtml',
      value: html,
    })
  }
}
