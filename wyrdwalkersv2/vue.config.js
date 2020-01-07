module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  devServer: {
    proxy: 'https://wyrdwalkers.com:3000/api/',
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/home/presentation',
        '/home/join',
        '/home/murder-parties',
        '/home/rpg-history',
        '/home/activities',
        '/home/workshops',
        '/home/personality-test',
        '/wiki',
        '/wiki/home',
        '/wiki/gameplay/rules',
        '/wiki/gameplay/legendary-abilities',
        '/wiki/timelines',
        '/philosophy',
        '/wiki/lore/panthéons',
        '/wiki/lore/sociétés-secrètes',
        '/wiki/lore/titans',
        '/wiki/lore/forêt-noire',
        '/wiki/lore/mer-de-jade',
        '/wiki/lore/utopia',
        '/wiki/lore/el-dorado',
        '/wiki/lore/shambhala',
        '/wiki/lore/fairie',
        '/wiki/lore/aether',
        '/wiki/lore/amaunet',
        '/wiki/lore/muspelheim',
        '/wiki/lore/kosmos',
        '/wiki/lore/nyx',
        '/wiki/lore/terra',
        '/wiki/lore/sheol',
        '/wiki/lore/patala',
        '/wiki/lore/océanus',
        '/wiki/lore/illuminati',
        '/wiki/lore/cercle-de-merlin',
        '/wiki/lore/cabale',
        '/wiki/lore/ordre-du-poing-de-jade',
        '/wiki/lore/aesir',
        '/wiki/lore/amatsukami',
        '/wiki/lore/ayllus',
        '/wiki/lore/bureaucratie-céleste',
        '/wiki/lore/deva',
        '/wiki/lore/neter',
        '/wiki/lore/k\'asunel',
        '/wiki/lore/theoï',
        '/wiki/lore/teotl',
        '/wiki/lore/tuatha-dé-danann',
        '/wiki/lore/nga-tama-a-rangi',
        '/wiki/lore/orisha'
      ],
      useRenderEvent: false,
      headless: true,
      onlyProduction: true
    }
  }
}
