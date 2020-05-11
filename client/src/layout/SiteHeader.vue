<template>
  <div id="siteHeader">
    <header class="header-global">
      <base-nav class="navbar-main" type effect="dark" expand>
        <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
          <img :src="require('@/assets/images/logo.png')" alt="logo" />
        </router-link>

        <div class="row" slot="content-header" slot-scope="{ closeMenu }">
          <div class="col-6 collapse-brand">
            <a href="#">
              <img :src="require('@/assets/images/logo.png')" />
            </a>
          </div>
          <div class="col-6 collapse-close black">
            <close-button @click="closeMenu"></close-button>
          </div>
        </div>

        <ul tag="li" class="navbar-nav navbar-nav-hover align-items-lg-center">
          <base-dropdown
            v-if="isLoggedIn && isInstructor"
            class="nav-item"
            menu-classes="dropdown-menu-xl"
          >
            <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
              <i class="ni ni-ui-04 d-lg-none"></i>
              <span class="nav-link-inner--text username-text">{{ getUsername }} 's Dashboard</span>
            </a>
            <div class="dropdown-menu-inner">
              <router-link
                :to="{ name: 'instructorClasses' }"
                class="media d-flex align-items-center"
              >
                <div class="icon icon-shape bg-gradient-success rounded-circle text-white">
                  <i class="ni ni-book-bookmark"></i>
                </div>
                <div class="media-body ml-3">
                  <h6 class="heading text-green mb-md-1">My classes</h6>
                  <p class="description d-none d-md-inline-block mb-0">View your classes</p>
                </div>
              </router-link>
              <router-link :to="{ name: 'classCreate' }" class="media d-flex align-items-center">
                <div class="icon icon-shape bg-gradient-success rounded-circle text-white">
                  <i class="ni ni-curved-next"></i>
                </div>
                <div class="media-body ml-3">
                  <h5 class="heading text-green mb-md-1">New Class</h5>
                  <p class="description d-none d-md-inline-block mb-0">Create new class</p>
                </div>
              </router-link>
              <hr />
              <li class="nav-items logout icon">
                <a @click="logout" class="nav-log-link aLog">
                  <i class="ni ni-button-power"></i>Logout
                </a>
              </li>
            </div>
          </base-dropdown>
          <base-dropdown
            v-if="isLoggedIn && isStudent"
            tag="li"
            class="nav-item"
            menu-classes="dropdown-menu-xl"
          >
            <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
              <i class="ni ni-ui-04 d-lg-none"></i>
              <span class="nav-link-inner--text username-text">{{ getUsername }} 's Dashboard</span>
            </a>
            <div class="dropdown-menu-inner">
              <router-link :to="{ name: 'studentClasses' }" class="media d-flex align-items-center">
                <div class="icon icon-shape bg-gradient-success rounded-circle text-white">
                  <i class="ni ni-book-bookmark"></i>
                </div>
                <div class="media-body ml-3">
                  <h5 class="heading text-green mb-md-1">Classes</h5>
                  <p class="description d-none d-md-inline-block mb-0">View your Classes</p>
                </div>
              </router-link>
              <hr />
              <li class="nav-items logout icon">
                <a @click="logout" class="nav-log-link aLog">
                  <i class="ni ni-button-power"></i>Logout
                </a>
              </li>
            </div>
          </base-dropdown>
        </ul>

        <ul class="navbar-nav align-items-lg-center ml-lg-auto navUl">
          <li class="nav-item">
            <router-link to="/classes" class="nav-link">
              <span class="nav-link-inner--text navlink">Classses</span>
            </router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/student-register" class="nav-link">
              <span class="nav-link-inner--text navlink">Register</span>
            </router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/signup" class="nav-link">
              <span class="nav-link-inner--text navlink">Login</span>
            </router-link>
          </li>
          <ul class="navbar-nav align-items-lg-center ml-lg-auto">
            <li class="nav-item">
              <a
                class="nav-link nav-link-icon"
                href="https://www.instagram.com/agriskul/"
                target="_blank"
                rel="noopener"
                data-toggle="tooltip"
                title="Follow us on Instagram"
              >
                <i class="fa fa-instagram social-instagram"></i>
                <span class="nav-link-inner--text d-lg-none social-text-instagram">Instagram</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link nav-link-icon"
                href="https://twitter.com/@agriskul"
                target="_blank"
                rel="noopener"
                data-toggle="tooltip"
                title="Follow us on Twitter"
              >
                <i class="fa fa-twitter-square social-twitter"></i>
                <span class="nav-link-inner--text d-lg-none social-text-twitter">Twitter</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link nav-link-icon"
                href="https://facebook.com/Agriskul-E-Learning-107826230930848/"
                target="_blank"
                rel="noopener"
                data-toggle="tooltip"
                title="Follow on facebook"
              >
                <i class="fa fa-facebook social-facebook"></i>
                <span class="nav-link-inner--text d-lg-none social-text-facebook">Facebook</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link nav-link-icon"
                href="https://youtube.com/channel/UC_Wdbx9QwsdmW3H78vPf7Gw"
                target="_blank"
                rel="noopener"
                data-toggle="tooltip"
                title="Follow on Youtube"
              >
                <i class="fa fa-youtube social-youtube"></i>
                <span class="nav-link-inner--text d-lg-none social-text-youtube">Youtube</span>
              </a>
            </li>
          </ul>
          <li class="nav-item d-none d-lg-block ml-lg-4">
            <a href="#contact" class="btn btn-success btn-icon">
              <span class="btn-inner--icon">
                <i class="fa fa-cloud-download mr-2"></i>
              </span>
              <span class="nav-link-inner--text">Contact Us</span>
            </a>
          </li>
        </ul>
      </base-nav>
    </header>
  </div>
</template>

<style></style>

<script>
import BaseNav from '@/components/BaseNav';
import BaseDropdown from '@/components/BaseDropdown';
import CloseButton from '@/components/CloseButton';

import Axios from 'axios';
import Vue from 'vue';
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  data() {
    return {};
  },
  computed: {
    getUsername: function() {
      let username = this.$store.getters.username;
      if (username == localStorage.getItem('username')) {
        return username;
      } else {
        return 'Guest';
      }
    },
    getUserID: function() {
      let userID = this.$store.getters.userID;
      if (userID == localStorage.getItem('userID')) {
        return userID;
      } else {
        return 'Guest';
      }
    },
    isInstructor: function() {
      let instructor = this.$store.getters.isInstructor;
      const username = localStorage.getItem('username');
      if (instructor === true && username) {
        return true;
      }
      return false;
    },
    isStudent: function() {
      let stud = this.$store.getters.isStudent;
      const username = localStorage.getItem('username');
      if (stud === true && username) {
        return true;
      }
      return false;
    },
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$cookies.remove('connect.sid');
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'SiteLogin' });
      });
    },
    checkOudatedToken: function() {
      this.$http.interceptors.response.use(undefined, function(err) {
        // eslint-disable-next-line
        return new Promise(function(resolve, reject) {
          if (
            err.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            this.$store.dispatch('logout');
          }
          throw err;
        });
      });
    }
  },
  created() {
    this.checkOudatedToken();
  }
};
</script>
