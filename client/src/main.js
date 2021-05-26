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
import VueFriendlyIframe from 'vue-friendly-iframe';
import VueDisqus from 'vue-disqus';

Vue.component('star-rating', StarRating);
Vue.use(Vuelidate);
Vue.use(VuePageTitle, {
    suffix: '- Agriskul ',
});
Vue.use(VueFriendlyIframe);
Vue.use(VueCookies);
Vue.use(Meta);

Vue.use(VueDisqus, {
    shortname: 'agriskul',
});

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
