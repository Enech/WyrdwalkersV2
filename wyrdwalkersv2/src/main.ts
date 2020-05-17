import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueMeta from 'vue-meta'
import Highcharts from "highcharts";
import HighChartsVue from "highcharts-vue";
import highchartsMoreInit from "highcharts/highcharts-more";
import solidGaugeInit from "highcharts/modules/solid-gauge";
import sankeyInit from "highcharts/modules/sankey";
import dependencyWheelInit from "highcharts/modules/dependency-wheel";

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/assets/css/base.css'
import '@/assets/css/wiki.scss'
import '@/assets/css/content-styles.css'
import i18n from './i18n'

if(process.env.NODE_ENV === 'production'){
  Vue.config.productionTip = false;
  Vue.config.devtools = false;
  Vue.config.silent = true;
}

highchartsMoreInit(Highcharts);
solidGaugeInit(Highcharts);
sankeyInit(Highcharts);
dependencyWheelInit(Highcharts);

Vue.use(VueMeta);
Vue.use(HighChartsVue);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
