import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './Auth/auth';
Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    modules: {
        Auth,
    },
});
