<template>
  <div id="siteHeader">
    <header class="header-global">
      <base-nav class="navbar-main" transparent type effect="dark" expand>
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
              <span class="nav-link-inner--text black">Instructor Dashboard</span>
            </a>
            <div class="dropdown-menu-inner">
              <router-link
                :to="{ name:'instructorClasses'}"
                class="media d-flex align-items-center"
              >
                <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                  <i class="ni ni-spaceship"></i>
                </div>
                <div class="media-body ml-3">
                  <h6 class="heading text-primary mb-md-1">My classes</h6>
                  <p class="description d-none d-md-inline-block mb-0">View your classes</p>
                </div>
              </router-link>
              <router-link :to="{ name:'classCreate'}" class="media d-flex align-items-center">
                <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                  <i class="ni ni-ui-04"></i>
                </div>
                <div class="media-body ml-3">
                  <h5 class="heading text-warning mb-md-1">New Class</h5>
                  <p class="description d-none d-md-inline-block mb-0">Create new class</p>
                </div>
              </router-link>
            </div>
          </base-dropdown>
          <base-dropdown v-if="isLoggedIn && isStudent" tag="li" class="nav-item">
            <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
              <i class="ni ni-ui-04 d-lg-none"></i>
              <span class="nav-link-inner--text black">Student's Dashboard</span>
            </a>
            <div class="dropdown-menu-inner">
              <router-link :to="{ name:'studentClasses'}" class="media d-flex align-items-center">
                <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                  <i class="ni ni-ui-04"></i>
                </div>
                <div class="media-body ml-3">
                  <h5 class="heading text-warning mb-md-1">Classes</h5>
                  <p class="description d-none d-md-inline-block mb-0">View your Classes</p>
                </div>
              </router-link>
            </div>
          </base-dropdown>
        </ul>

        <ul class="navbar-nav align-items-lg-center ml-lg-auto">
          <!-- <li class="nav-item">
            <router-link to="/landing" class="nav-link">
              <span class="nav-link-inner--text black">How it works</span>
            </router-link>
          </li>-->
          <li class="nav-item">
            <router-link to="/classes" class="nav-link">
              <span class="nav-link-inner--text black">Classses</span>
            </router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/student-register" class="nav-link">
              <span class="nav-link-inner--text black">Register</span>
            </router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/signup" class="nav-link">
              <span class="nav-link-inner--text black">Sign In</span>
            </router-link>
          </li>
          <ul class="navbar-nav align-items-lg-center ml-lg-auto">
            <li class="nav-item">
              <a
                class="nav-link nav-link-icon"
                href="#"
                target="_blank"
                rel="noopener"
                data-toggle="tooltip"
                title="Follow us on Instagram"
              >
                <i class="fa fa-instagram"></i>
                <span class="nav-link-inner--text d-lg-none">Instagram</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link nav-link-icon"
                href="#"
                target="_blank"
                rel="noopener"
                data-toggle="tooltip"
                title="Follow us on Twitter"
              >
                <i class="fa fa-twitter-square"></i>
                <span class="nav-link-inner--text d-lg-none">Twitter</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link nav-link-icon"
                href="#"
                target="_blank"
                rel="noopener"
                data-toggle="tooltip"
                title="Follow on facebook"
              >
                <i class="fa fa-facebook"></i>
                <span class="nav-link-inner--text d-lg-none">Facebook</span>
              </a>
            </li>
          </ul>
          <ul v-if="isLoggedIn" class="navbar-nav navbar-nav-hover align-items-lg-center">
            <li class="nav-items">
              <a @click="logout" class="nav-log-link aLog">{{getUsername}}| Logout</a>
            </li>
          </ul>
          <li class="nav-item d-none d-lg-block ml-lg-4">
            <a href="#contact" target="_blank" rel="noopener" class="btn btn-success btn-icon">
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

<style>
i {
  color: #000;
}
.aLog {
  font-size: 80%;
}
.green {
  color: #20e434;
}
.black {
  color: black;
  text-transform: uppercase;
}
.navbar-transparent .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0,1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E") !important ;
  /* background: #20e434 !important; */
}
.btn-green {
  background: #20e434;
  color: white;
}
</style>

<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

import Axios from "axios";
import Vue from "vue";
Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
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
      if (username == localStorage.getItem("username")) {
        return username;
      } else {
        return "Guest";
      }
    },
    getUserID: function() {
      let userID = this.$store.getters.userID;
      if (userID == localStorage.getItem("userID")) {
        return userID;
      } else {
        return "Guest";
      }
    },
    isInstructor: function() {
      let instructor = this.$store.getters.isInstructor;
      const username = localStorage.getItem("username");
      if (instructor === true && username) {
        return true;
      }
      return false;
    },
    isStudent: function() {
      let stud = this.$store.getters.isStudent;
      const username = localStorage.getItem("username");
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
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ name: "home" });
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
            this.$store.dispatch("logout");
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
