import axios from 'axios';

const state = {
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
  email: localStorage.getItem('email') || null,
  type: localStorage.getItem('type') || null,
  userID: localStorage.getItem('userID') || null,
  status: '',
  error: null
};

const getters = {
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user,
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
  error: state => state.error
};

const actions = {
  // Login Action
  async login({ commit }, user) {
    commit('auth_request');

    let res = await axios.post('/api/users/login', user);
    if (res.data.success == true) {
      const token = res.data.token;
      const user = res.data.user;
      const username = user.username;
      const email = user.email;
      const type = user.type;
      const userID = user._id;

      // Store the token into the localstorage
      // eslint-disable-next-line no-console
      // console.log(user);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('type', type);
      localStorage.setItem('userID', userID);
      localStorage.setItem('token', token);
      // Set the axios defaults
      axios.defaults.headers.common['Authorization'] = token;
      commit('auth_success', token);

      return res;
    } else {
      commit('register_error', res);
      return res;
    }
  },
  // Register User
  async register({ commit }, userData) {
    commit('register_request');
    let res = await axios.post('/api/users/register', userData);
    if (res.data.success == true) {
      commit('register_success');
      return res;
    } else {
      commit('register_error', res);
      return res;
    }
  },
  // Get the user Profile
  async getProfile({ commit }) {
    commit('profile_request');
    let res = await axios.get('/api/users/profile');

    commit('user_profile');
    return res;
  },
  // Logout the user
  async logout({ commit }) {
    await localStorage.removeItem('token');
    await localStorage.removeItem('username');
    await localStorage.removeItem('email');
    await localStorage.removeItem('type');
    await localStorage.removeItem('userID');
    commit('logout');
    delete axios.defaults.headers.common['Authorization'];

    return;
  }
};

const mutations = {
  auth_request(state) {
    state.error = null;
    state.status = 'loading';
  },
  auth_success(state, token) {
    state.token = token;
    state.username = localStorage.getItem('username');
    state.email = localStorage.getItem('email');
    state.type = localStorage.getItem('type');
    state.userID = localStorage.getItem('userID');
    state.error = null;
  },
  auth_error(state, err) {
    state.error = err.response.data.msg;
  },
  register_request(state) {
    state.error = null;
    state.status = 'loading';
  },
  register_success(state) {
    state.error = null;
    state.status = 'success';
  },
  register_error(state, res) {
    state.error = res.data.msg;
  },
  logout(state) {
    state.error = null;
    state.status = '';
    state.token = null;
    state.username = null;
    state.email = null;
    state.type = null;
    state.user_id = null;
  },
  profile_request(state) {
    state.status = 'loading';
  },
  user_profile(state) {
    state.username = localStorage.getItem('username');
    state.email = localStorage.getItem('email');
    state.type = localStorage.getItem('type');
    state.user_id = localStorage.getItem('userID');
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
