const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  devServer: {
    proxy: 'https://wyrdwalkers.com:3000/api/',
  },

  configureWebpack:{
    plugins: process.env.NODE_ENV === 'production' ? [
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: [
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
          '/wiki/lore/hypérion',
          '/wiki/lore/aten',
          '/wiki/lore/héméra',
          '/wiki/lore/hélios',
          '/wiki/lore/zhulong',
          '/wiki/lore/amaunet',
          '/wiki/lore/typhon',
          '/wiki/lore/ouranos',
          '/wiki/lore/pazuzu',
          '/wiki/lore/huracán',
          '/wiki/lore/tlaloc',
          '/wiki/lore/raiju',
          '/wiki/lore/muspelheim',
          '/wiki/lore/surtr',
          '/wiki/lore/fafnir',
          '/wiki/lore/kagutsuchi',
          '/wiki/lore/vrtra',
          '/wiki/lore/prométhée',
          '/wiki/lore/xiuhtecuhtli',
          '/wiki/lore/némésis',
          '/wiki/lore/eris',
          '/wiki/lore/auahituroa-et-les-nga-manawa',
          '/wiki/lore/kosmos',
          '/wiki/lore/kronus',
          '/wiki/lore/atlas',
          '/wiki/lore/coeus',
          '/wiki/lore/chronos',
          '/wiki/lore/thémis',
          '/wiki/lore/euterpe',
          '/wiki/lore/iapétus',
          '/wiki/lore/idun',
          '/wiki/lore/ikenga',
          '/wiki/lore/issitoq',
          '/wiki/lore/mnémosyne',
          '/wiki/lore/viswakarma',
          '/wiki/lore/nyx',
          '/wiki/lore/fenrir',
          '/wiki/lore/nott',
          '/wiki/lore/dracula',
          '/wiki/lore/hypnos',
          '/wiki/lore/séléné',
          '/wiki/lore/nut',
          '/wiki/lore/apophis',
          '/wiki/lore/mikaboshi',
          '/wiki/lore/terra',
          '/wiki/lore/gaïa',
          '/wiki/lore/kur',
          '/wiki/lore/homme-vert',
          '/wiki/lore/ouréa',
          '/wiki/lore/sheol',
          '/wiki/lore/grande-faucheuse',
          '/wiki/lore/camazotz',
          '/wiki/lore/thanatos',
          '/wiki/lore/styx',
          '/wiki/lore/nirrti',
          '/wiki/lore/itztlacoliuhqui',
          '/wiki/lore/ammit',
          '/wiki/lore/cerbère',
          '/wiki/lore/océanus',
          '/wiki/lore/yam',
          '/wiki/lore/sedna',
          '/wiki/lore/tiamat',
          '/wiki/lore/akkorokamui',
          '/wiki/lore/charybde',
          '/wiki/lore/heqet',
          '/wiki/lore/patala',
          '/wiki/lore/crom-cruach',
          '/wiki/lore/abzu',
          '/wiki/lore/erlik',
          '/wiki/lore/dis-pater',
          '/wiki/lore/erébus',
          '/wiki/lore/illuminati',
          '/wiki/lore/cercle-de-merlin',
          '/wiki/lore/cabale',
          '/wiki/lore/ordre-du-poing-de-jade',
          '/wiki/lore/aesir',
          '/wiki/lore/thor',
          '/wiki/lore/odin',
          '/wiki/lore/loki',
          '/wiki/lore/heimdall',
          '/wiki/lore/sif',
          '/wiki/lore/freya',
          '/wiki/lore/frigg',
          '/wiki/lore/vidar',
          '/wiki/lore/asgard',
          '/wiki/lore/heilheim',
          '/wiki/lore/freyr',
          '/wiki/lore/hel',
          '/wiki/lore/tyr',
          '/wiki/lore/ullr',
          '/wiki/lore/bragi',
          '/wiki/lore/vali',
          '/wiki/lore/valhalla',
          '/wiki/lore/amatsukami',
          '/wiki/lore/izanagi',
          '/wiki/lore/izanami',
          '/wiki/lore/amaterasu',
          '/wiki/lore/susano-o',
          '/wiki/lore/tsuki-yomi',
          '/wiki/lore/raiden',
          '/wiki/lore/inari',
          '/wiki/lore/ryujin',
          '/wiki/lore/yomi',
          '/wiki/lore/takamagahara',
          '/wiki/lore/sarutahiko',
          '/wiki/lore/ame-no-uzume',
          '/wiki/lore/hachiman',
          '/wiki/lore/ayllus',
          '/wiki/lore/kilyamama',
          '/wiki/lore/viracocha',
          '/wiki/lore/inti',
          '/wiki/lore/hanan-pacha',
          '/wiki/lore/uku-pacha',
          '/wiki/lore/cochamama',
          '/wiki/lore/chasqua',
          '/wiki/lore/illapa',
          '/wiki/lore/supay',
          '/wiki/lore/urcaguary',
          '/wiki/lore/bureaucratie-céleste',
          '/wiki/lore/shangdi',
          '/wiki/lore/guan-yu',
          '/wiki/lore/erlang',
          '/wiki/lore/sun-wukong',
          '/wiki/lore/guanyin',
          '/wiki/lore/lei-gong',
          '/wiki/lore/di-yu',
          '/wiki/lore/tiàn',
          '/wiki/lore/fuxi',
          '/wiki/lore/nuwa',
          '/wiki/lore/zhuanxu',
          '/wiki/lore/chang\'e',
          '/wiki/lore/houyi',
          '/wiki/lore/shennong',
          '/wiki/lore/les-trois-purs',
          '/wiki/lore/xiwangmu',
          '/wiki/lore/yanluo',
          '/wiki/lore/nezha',
          '/wiki/lore/deva',
          '/wiki/lore/devaloka',
          '/wiki/lore/naraka',
          '/wiki/lore/brahma',
          '/wiki/lore/vishnu',
          '/wiki/lore/shiva',
          '/wiki/lore/indra',
          '/wiki/lore/ganesh',
          '/wiki/lore/agni',
          '/wiki/lore/kali',
          '/wiki/lore/lakshmi',
          '/wiki/lore/murugan',
          '/wiki/lore/parvati',
          '/wiki/lore/sarasvati',
          '/wiki/lore/surya',
          '/wiki/lore/yama',
          '/wiki/lore/neter',
          '/wiki/lore/râ',
          '/wiki/lore/seth',
          '/wiki/lore/thot',
          '/wiki/lore/horus',
          '/wiki/lore/isis',
          '/wiki/lore/osiris',
          '/wiki/lore/anubis',
          '/wiki/lore/sobek',
          '/wiki/lore/aunu',
          '/wiki/lore/duat',
          '/wiki/lore/bastet',
          '/wiki/lore/hathor',
          '/wiki/lore/ptah',
          '/wiki/lore/geb',
          '/wiki/lore/sekhmet',
          '/wiki/lore/k\'asunel',
          '/wiki/lore/les-treize-cieux',
          '/wiki/lore/xibalba',
          '/wiki/lore/itzamna',
          '/wiki/lore/kinich-ahau',
          '/wiki/lore/ixchel',
          '/wiki/lore/ek-chuah',
          '/wiki/lore/chaac',
          '/wiki/lore/kukulkan',
          '/wiki/lore/buluc-chabtan',
          '/wiki/lore/bacab',
          '/wiki/lore/xquic',
          '/wiki/lore/hunahpu',
          '/wiki/lore/xbalanque',
          '/wiki/lore/batz',
          '/wiki/lore/kisin',
          '/wiki/lore/theoï',
          '/wiki/lore/zeus',
          '/wiki/lore/apollon',
          '/wiki/lore/athéna',
          '/wiki/lore/aphrodite',
          '/wiki/lore/héra',
          '/wiki/lore/héphaïstos',
          '/wiki/lore/dionysos',
          '/wiki/lore/hermès',
          '/wiki/lore/hadès',
          '/wiki/lore/poséidon',
          '/wiki/lore/arès',
          '/wiki/lore/artémis',
          '/wiki/lore/déméter',
          '/wiki/lore/héraclès',
          '/wiki/lore/olympe',
          '/wiki/lore/hadès-enfer',
          '/wiki/lore/teotl',
          '/wiki/lore/mictlan',
          '/wiki/lore/tezcatlipoca',
          '/wiki/lore/quetzalcoatl',
          '/wiki/lore/xochipilli',
          '/wiki/lore/xochiquetzal',
          '/wiki/lore/huitzilopochtli',
          '/wiki/lore/xipe-totec',
          '/wiki/lore/miclantecuhtli',
          '/wiki/lore/tlazoltéotl',
          '/wiki/lore/xolotl',
          '/wiki/lore/tuatha-dé-danann',
          '/wiki/lore/tir-na-nog',
          '/wiki/lore/tech-duinn',
          '/wiki/lore/le-dagda',
          '/wiki/lore/dian-cècht',
          '/wiki/lore/fand',
          '/wiki/lore/lugh',
          '/wiki/lore/morrigan',
          '/wiki/lore/ogma',
          '/wiki/lore/aengus',
          '/wiki/lore/brigid',
          '/wiki/lore/aine',
          '/wiki/lore/niamh',
          '/wiki/lore/cernunnos',
          '/wiki/lore/donn',
          '/wiki/lore/manannán-mac-lir',
          '/wiki/lore/nga-tama-a-rangi',
          '/wiki/lore/haumia-tiketike',
          '/wiki/lore/rehua',
          '/wiki/lore/ruaumoko',
          '/wiki/lore/rongo',
          '/wiki/lore/tane-mahuta',
          '/wiki/lore/tangaroa',
          '/wiki/lore/mahuika',
          '/wiki/lore/hine-nui-te-po',
          '/wiki/lore/tumatauenga',
          '/wiki/lore/whiro',
          '/wiki/lore/tawhirimatea',
          '/wiki/lore/kahiki',
          '/wiki/lore/rarohenga',
          '/wiki/lore/orisha',
          '/wiki/lore/aganju',
          '/wiki/lore/damballa',
          '/wiki/lore/eledumare',
          '/wiki/lore/olorun',
          '/wiki/lore/yemoja',
          '/wiki/lore/anansi',
          '/wiki/lore/ayao',
          '/wiki/lore/azaka',
          '/wiki/lore/ogoun',
          '/wiki/lore/shapona',
          '/wiki/lore/simbi',
          '/wiki/lore/baron-samedi',
          '/wiki/lore/erzulie',
          '/wiki/lore/kalfu',
          '/wiki/lore/legba',
          '/wiki/lore/les-marassa',
          '/wiki/lore/maman-brigitte',
          '/wiki/lore/ikole-orun',
          '/wiki/lore/guinée'
        ],
        postProcess(renderedRoute) {
          renderedRoute.html = renderedRoute.html
            .replace(/<script (.*?)>/g, `<script $1 defer>`)
            .replace(`id="app"`, `id="app" data-server-rendered="true"`)

          return renderedRoute
        },
        renderer: new Renderer({
          ignoreJSErrors: true,
          headless: false,
          inject: {},
          devtools: false,
          renderAfterElementExists: "#app-content-custom",
          maxConcurrentRoutes: 1,
          navigationOptions: {
            timeout: 0
          }
        })
      })
    ] : []
  }
}
