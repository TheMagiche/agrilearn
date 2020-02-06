import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/bootstrap-vue";
import "mutationobserver-shim";
import Argon from "./plugins/argon-kit";
import store from "./store/index";

Vue.config.productionTip = false;
Vue.use(Argon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
