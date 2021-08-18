import {showLoading, hideLoading} from './components/DefaultLoading/index.js';

const install = (Vue) => {

    Vue.prototype.$showLoading = showLoading;
    Vue.prototype.$hideLoading = hideLoading;

};

export default install

