module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.loader && rule.loader.includes('source-map-loader')) {
          rule.exclude = [/node_modules\/@emotion/, /node_modules\/cookie/];
        }
      });
      return webpackConfig;
    },
  },
};
