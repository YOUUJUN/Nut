import Vue from 'vue'
import Home from './Developer.vue'

import store from '../../store/index.js';

//全局组件
import  customComponents from '../../custom-components.js';
Vue.use(customComponents);

//eventBus
let bus = new Vue;
Vue.prototype.$bus = bus;

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(Home)
}).$mount('#app');



