const generateSlug = require('./src/gatsby/node/generateSlug')

/* eslint-disable no-param-reassign */
const name = 'Himalay Sunuwar'
const siteMetadata = {
  name,
  bio: "I'm a programmer from Himalayas, I listen to Metal and eat Rice. No I don't smoke, drink, or do drugs.",
  title: `${name} - Full-stack Developer, Software Architect`,
  description:
    'A full-stack developer with 5+ years of experience in architecting and building scalable systems for web applications.',
  siteUrl: 'https://himalay.com.np',
  pathPrefix: '',
  social: {
    github: 'himalay',
    linkedin: 'sunuwar',
    twitter: 'HimalaySunuwar',
    instagram: 'HimalaySunuwar',
    email: 'contact@himalay.com.np',
  },
}

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name,
        short_name: name.split(' ')[0],
        start_url: '/',
        background_color: '#002b36',
        theme_color: '#002b36',
        display: 'standalone',
        icon: 'src/assets/himalay_logo.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-xxxxxx-3',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
        `,
        setup: ({ query, ...rest }) => {
          const { siteUrl } = query.site.siteMetadata
          query.site.siteMetadata.feed_url = `${siteUrl}/rss.xml`
          query.site.siteMetadata.image_url = `${siteUrl}/icons/icon-512x512.png`
          const siteMetadataModified = query.site.siteMetadata
          siteMetadataModified.feed_url = `${siteUrl}/rss.xml`
          siteMetadataModified.image_url = `${siteUrl}/icons/icon-512x512.png`
          return {
            ...siteMetadataModified,
            ...rest,
          }
        },
        feeds: [
          {
            serialize: ({ query: { allMdx } }) => {
              return allMdx.edges.map((edge) => {
                const { frontmatter, html } = edge.node
                const basePath = '/'
                const slug = generateSlug(basePath, frontmatter.slug || frontmatter.title, frontmatter.date)

                return {
                  title: frontmatter.title,
                  date: frontmatter.date,
                  description: frontmatter.excerpt,
                  url: siteMetadata.siteUrl + slug,
                  guid: siteMetadata.siteUrl + slug,
                  enclosure: {
                    url: siteMetadata.siteUrl + (frontmatter.hero.publicURL || '/icons/icon-512x512.png'),
                  },
                  custom_elements: [{ 'content:encoded': html }],
                }
              })
            },
            query: `
            {
              allMdx(sort: {order: DESC, fields: frontmatter___date}) {
              edges {
                node {
                  html
                  frontmatter {
                    title
                    excerpt
                    date
                    hero {
                      publicURL
                    }
                  }
                }
              }
            }
            }
            `,
            output: '/rss.xml',
            title: `${siteMetadata.title} RSS Feed`,
            description: `${siteMetadata.description}`,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',

        // GraphQL query used to fetch all data for the search index.
        query: `
        {
          allArticle(
            sort: { fields: [date, title], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                id
                slug
                title
                excerpt
                date(formatString: "MMMM Do, YYYY")
              }
            }
          }
        }
        `,

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['title', 'excerpt'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        store: ['id', 'title', 'slug', 'excerpt', 'date'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index.
        normalizer: ({ data }) => data.allArticle.edges.map(({ node }) => node),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'content/posts',
        name: 'content/posts',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true,
            },
          },
          {
            resolve: '@raae/gatsby-remark-oembed',
            options: {
              providers: {
                include: ['Instagram'],
              },
            },
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 680,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, // Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], // Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            },
          },
          { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-numbered-footnotes' },
          { resolve: 'gatsby-remark-smartypants' },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer',
            },
          },
        ],
        remarkPlugins: [require('remark-slug')], // eslint-disable-line global-require
      },
    },
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        displayName: process.env.NODE_ENV === 'development',
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: siteMetadata.siteUrl,
      },
    },
  ],
}
