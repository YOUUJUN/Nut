import Vue from 'vue';
import VueRouter from 'vue-router';
// import index from './../pages/test/private/index.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'index',
  //   component: index
  // }

];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
