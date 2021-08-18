import Vue from 'vue'
import LoadingComponent from './index.vue'


let LoadingConstructor = Vue.extend(LoadingComponent);

let initComponent = null;
export const showLoading = (option={}) => {
    initComponent = new LoadingConstructor();
    initComponent.$mount();
    document.querySelector(option.container || 'body').appendChild(initComponent.$el);
}

export const hideLoading = () => {
    initComponent.$el.parentNode.removeChild(initComponent.$el)
}
