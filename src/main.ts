import '@babel/polyfill';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/plugins/fontawesome';
import '@/plugins/axios';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import i18n from '@/i18n';
import bus from '@/bus';
import Ref from '@/ref';
const ref = new Ref();

Vue.config.productionTip = false;

import appconfig from '@/appconfig';
Vue.prototype.$appconfig = appconfig;
// @ts-ignore
axios.get(appconfig.ApiRoot + '/api/ref_version', {
}).then((response: any) => {
    ref.testVersions( response.data );
}, (err: any) => {
     // tslint:disable-next-line:no-console
     console.log(err);
});


const routes = store.getters.getRoutes();
router.addRoutes(routes);

router.beforeEach((to, from, next) => {
  // tslint:disable-next-line
  bus.$emit('loadWindow', {value: true, info: 'main.vue:router.beforeEach://start function'}); // добавляем окно загрузки
  // tslint:disable-next-line:only-arrow-functions

  setTimeout( () => {  // задержка позволит отобразиться окну загрузки
    if ( Object.keys(to.meta).length !== 0) {
      next();
    } else {
      next('/404');
    }
  }, 500);
});
// eslint-disable-next-line
router.afterEach((to, from) => {
  window.scrollTo(0, 0); // проматываем страницу вверх
  let lang = localStorage.getItem('language');
  if ( lang ) {
    /* store.dispatch('setLanguage', lang); */
    i18n.locale = lang;
    bus.$emit('loadWindow', {value: false, info: 'main.vue:router.afterEach://if(lang)'}); // убираем окно загрузки
    return true;
  }
  lang = 'ru';
  /* store.dispatch('setLanguage', lang); */
  localStorage.setItem('language', lang);
  i18n.locale = lang;
  bus.$emit('loadWindow', {value: false, info: 'main.vue:router.afterEach://end function'}); // убираем окно загрузки
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
