<template>
    <a-menu theme="light" mode="horizontal" :style="{ textAlign: 'right', lineHeight: '64px' }">
        <a-menu-item key="logout">
            <a-button type="dashed" icon="logout" @click="logout"> Logout </a-button>
        </a-menu-item>
        <a-menu-item key="home">
            <a-row>
                {{ getUsername | capitalize }}'s Dashboard
                <span style="margin-right: 24px; text-align: center !important">
                    <a-badge dot><a-avatar /></a-badge>
                </span>
            </a-row>
        </a-menu-item>
    </a-menu>
</template>
<style scoped></style>
<script>
import Axios from 'axios';
import Vue from 'vue';
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}
export default {
    name: 'Navabar',
    data() {
        return {
            current: ['home'],
        };
    },
    filters: {
        capitalize: function (value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
    },
    computed: {
        getUsername: function () {
            let username = this.$store.getters.username;
            if (username == localStorage.getItem('username')) {
                return username;
            } else {
                return 'Guest';
            }
        },
        getUserID: function () {
            let userID = this.$store.getters.userID;
            if (userID == localStorage.getItem('userID')) {
                return userID;
            } else {
                return 'Guest';
            }
        },
        isInstructor: function () {
            let instructor = this.$store.getters.isInstructor;
            const username = localStorage.getItem('username');
            if (instructor === true && username) {
                return true;
            }
            return false;
        },
        isStudent: function () {
            let stud = this.$store.getters.isStudent;
            const username = localStorage.getItem('username');
            if (stud === true && username) {
                return true;
            }
            return false;
        },
        isLoggedIn: function () {
            return this.$store.getters.isLoggedIn;
        },
    },
    methods: {
        logout: function () {
            this.$cookies.remove('connect.sid');
            this.$store.dispatch('logout').then(() => {
                this.$router.push({ name: 'Login' });
            });
            this.$notification['success']({
                message: 'Logout Successful',
                description: `Hope to see you soon`,
            });
        },
        checkOudatedToken: function () {
            this.$http.interceptors.response.use(undefined, function (err) {
                // eslint-disable-next-line
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        this.$store.dispatch('logout');
                    }
                    throw err;
                });
            });
        },
    },
    created() {
        this.checkOudatedToken();
    },
};
</script>
