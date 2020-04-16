import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import "./plugins/bootstrap-vue";
import "mutationobserver-shim";
import Argon from "./plugins/argon-kit";
import store from "./store/index";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
