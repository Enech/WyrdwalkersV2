module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'https://wyrdwalkers.com:3000/api/',
  }
}