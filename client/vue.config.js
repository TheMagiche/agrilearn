const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_URL,
        ws: true,
        changeOrigin: true,
        secure: false
      }
    }
  },
  outputDir: path.resolve(__dirname, "../public")
};
