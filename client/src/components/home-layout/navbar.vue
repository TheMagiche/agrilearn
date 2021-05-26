<template>
    <div class="navbar">
        <a-menu v-if="!isLoggedIn" theme="light" mode="horizontal" :style="{ lineHeight: '64px', textAlign: 'right' }">
            <a-menu-item key="home">
                <router-link to="/">Home</router-link>
            </a-menu-item>
            <a-menu-item key="register">
                <router-link to="/signup">Register</router-link>
            </a-menu-item>
            <a-menu-item key="login">
                <router-link to="/signin">Login</router-link>
            </a-menu-item>
            <a-menu-item key="contact">
                <a-button type="primary" icon="notification" @click="contact"> Contact </a-button>
            </a-menu-item>
        </a-menu>
        <a-menu v-if="isLoggedIn" theme="light" mode="horizontal" :style="{ lineHeight: '64px', textAlign: 'right' }">
            <a-menu-item v-if="isLoggedIn && isStudent" key="std-classes">
                <router-link to="/student/classes">
                    <a-button type="primary" icon="dashboard"> {{ getUsername | capitalize }}'s Dashboard </a-button>
                </router-link>
            </a-menu-item>
            <a-menu-item v-if="isLoggedIn && isInstructor" key="inst-classes">
                <router-link to="/instructor/classes">
                    <a-button type="primary" icon="dashboard"> {{ getUsername | capitalize }}'s Dashboard </a-button>
                </router-link>
            </a-menu-item>
            <a-menu-item key="contact">
                <a-button type="primary" icon="notification" @click="contact"> Contact </a-button>
            </a-menu-item>
            <a-menu-item key="logout">
                <a-button type="dashed" icon="logout" @click="logout"> Logout </a-button>
            </a-menu-item>
        </a-menu>
        <ContactModal />
    </div>
</template>
<style scoped></style>
<script>
import ContactModal from '@/components/modals/users/contactModal';
import { bus } from '@/event-bus';
export default {
    name: 'Navabar',
    components: {
        ContactModal,
    },
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
        contact: function () {
            bus.$emit('contact-visible', true);
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
