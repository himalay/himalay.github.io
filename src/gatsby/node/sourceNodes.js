module.exports = ({ actions }) => {
  actions.createTypes(`
    type Article implements Node {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 140): String!
      body: String!
      hero: File @fileByRelativePath
      timeToRead: Int
    }
  `)
}
