import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueMeta from 'vue-meta'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/assets/css/base.css'
import '@/assets/css/wiki.scss'

Vue.config.productionTip = false;
/*Vue.config.devtools = false;
Vue.config.silent = true;*/

Vue.use(VueMeta);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
