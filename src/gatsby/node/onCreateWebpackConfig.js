const path = require('path')

module.exports = ({ actions }) => {
  const config = {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, '../../components/'),
        '@icons': path.resolve(__dirname, '../../icons/'),
        '@styles': path.resolve(__dirname, '../../styles/'),
        '@utils': path.resolve(__dirname, '../../utils/'),
        '@types': path.resolve(__dirname, '../../types/'),
        '@assets': path.resolve(__dirname, '../../assets/'),
        '@sections': path.resolve(__dirname, '../../sections/'),
      },
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  }

  if (process.env.NODE_ENV === 'production') config.devtool = false

  actions.setWebpackConfig(config)
}
