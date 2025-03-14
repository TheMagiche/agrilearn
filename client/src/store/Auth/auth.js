import axios from 'axios';

const state = {
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
  email: localStorage.getItem('email') || null,
  type: localStorage.getItem('type') || null,
  userID: localStorage.getItem('userID') || null,
  verified: localStorage.getItem('verified') || null,
};

const getters = {
  isLoggedIn: state => !!state.token,
  username: state => state.username,
  userID: state => state.userID,
  isStudent: state => {
    if (state.type == 'student') {
      return true;
    } else {
      return false;
    }
  },
  isInstructor: state => {
    if (state.type == 'instructor') {
      return true;
    } else {
      return false;
    }
  },
  isVerified: state =>{
    if (state.verified == false) {
      return false
    } else {
      return true
    }
  }
};

const actions = {
  // Login Action
  async login({ commit }, user) {

    let res = await axios.post('/api/users/login', user);
    if (res.data.success == true) {
      const token = res.data.token;
      const user = res.data.user;
      const username = user.username;
      const email = user.email;
      const type = user.type;
      const userID = user._id;
      const verified = user.verified;
      // Store the token into the localstorage
      // eslint-disable-next-line no-console
      // console.log(user);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('type', type);
      localStorage.setItem('userID', userID);
      localStorage.setItem('token', token);
      localStorage.setItem('verified', verified);
      // Set the axios defaults
      axios.defaults.headers.common['Authorization'] = token;
      commit('auth_success', token);

      return res;
    } else {
      return res;
    }
  },
  // Register User
  async register({commit},userData) {
    commit('reg_success');
    let res = await axios.post('/api/users/register', userData);
    if (res.data.success) {
      return res
    } else {
      return res
    }
  },
  // Logout the user
  async logout({ commit }) {
    await localStorage.removeItem('token');
    await localStorage.removeItem('username');
    await localStorage.removeItem('email');
    await localStorage.removeItem('type');
    await localStorage.removeItem('userID');
    await localStorage.removeItem('verified');
    commit('logout');
    delete axios.defaults.headers.common['Authorization'];

    return;
  }
};

const mutations = {
  auth_success(state, token) {
    state.token = token;
    state.username = localStorage.getItem('username');
    state.email = localStorage.getItem('email');
    state.type = localStorage.getItem('type');
    state.userID = localStorage.getItem('userID');
    state.verified = localStorage.getItem('verified');
    state.error = null;
  },
  reg_success(state){
    state.error = null;
  },
  logout(state) {
    state.error = null;
    state.token = null;
    state.username = null;
    state.email = null;
    state.type = null;
    state.userID = null;
    state.verified = null;
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};
