const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Important: return the modified config
      return config
    },
  }