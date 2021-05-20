import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue.js';
import VuePageTitle from 'vue-page-title';
import Vuelidate from 'vuelidate';
import VueCookies from 'vue-cookies';
import Meta from 'vue-meta';
import StarRating from 'vue-star-rating';

Vue.component('star-rating', StarRating);
Vue.use(Vuelidate);
Vue.use(VuePageTitle, {
    suffix: '- Agriskul ',
});
Vue.use(VueCookies);
Vue.use(Meta);
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

export const bus = new Vue();
