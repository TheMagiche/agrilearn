<template>
    <div class="sideBar">
        <a-menu v-if="isLoggedIn && isStudent" theme="dark" :open-keys="openKeys" @openChange="onOpenChange" mode="inline">
            <a-sub-menu key="sub1" :default-selected-keys="['1']">
                <span slot="title"><a-icon type="read" /><span>Classes</span></span>
                <a-menu-item key="1">
                    <router-link to="/classes">
                        <a-icon type="small-dash" />
                        <span>All classes</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link to="/student/classes/">
                        <a-icon type="project" />
                        <span>Enrolled Classes </span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="user" /><span>Profile</span></span>
                <a-menu-item key="3">
                    <router-link to="/student/profile">
                        <a-icon type="fire" />
                        <span>View Profile </span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
        <a-menu v-if="isLoggedIn && isInstructor" theme="dark" :open-keys="openKeys" mode="inline" @openChange="onOpenChange">
            <a-sub-menu key="sub1" :default-selected-keys="['3']">
                <span slot="title"><a-icon type="read" /><span>Classes</span></span>
                <a-menu-item key="3">
                    <router-link to="/instructor/classes">
                        <a-icon type="small-dash" />
                        <span>All classes</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="4">
                    <a-button type="link" @click="createClass">
                        <a-icon type="form" />
                        <span>New Class </span>
                    </a-button>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="user" /><span>Profile</span></span>
                <a-menu-item key="1">
                    <router-link to="/instructor/profile">
                        <a-icon type="fire" />
                        <span>View Profile </span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
        <CreateClassModal />
        <GetPremimumModal />
    </div>
</template>

<style></style>

<script>
import Axios from 'axios';
import Vue from 'vue';

import CreateClassModal from '@/components/modals/instructor/newClassModal';

import GetPremimumModal from '@/components/modals/students/getPremiumModal.vue';

import { bus } from '@/event-bus';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');

if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

export default {
    name: 'SideBar',
    components: {
        CreateClassModal,
        GetPremimumModal,
    },
    data() {
        return {
            rootSubmenuKeys: ['sub1', 'sub2'],
            openKeys: ['sub1', 'sub2'],
        };
    },
    methods: {
        onOpenChange(openKeys) {
            const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1);
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys;
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
        },
        createClass() {
            bus.$emit('createClass-visible', true);
        },
    },
    computed: {
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
};
</script>
