import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueMeta from 'vue-meta'
import VueQuillEditor from 'vue-quill-editor'

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

Vue.use(VueMeta);
Vue.use(VueQuillEditor);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
