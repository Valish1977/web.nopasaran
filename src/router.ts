import Vue from 'vue';
import Router from 'vue-router';
import Error404 from './views/Error404.vue';
import Home from './views/Home.vue';
import Events from './views/pages/Events.vue';
import Layout from './views/Layout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // tslint:disable-next-line:max-line-length
    { path: '/events', alias: '/', component: Layout,
     children: [
          // tslint:disable-next-line:max-line-length
         {path: '/events', name: 'events', component: Events, meta: {regAuth: false, pageName: 'events', title: 'События', icon: 'chart-bar', noCache: true }},
     ],
    },
    {
      path: '/404',
      name: 'error404',
      component: Error404,
      meta: { regAuth: false, showToolbar: false, showDrawer: false, showAddItem: false, showInMenu: false },
    },
  ],
});
