/* eslint-disable no-prototype-builtins */

const crypto = require('crypto')
const generateSlug = require('./generateSlug')

// Create fields for post slugs and source
// This will change with schema customization with work
module.exports = ({ node, actions, getNode, createNodeId }, themeOptions) => {
  const { createNode, createParentChildLink } = actions
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
}
