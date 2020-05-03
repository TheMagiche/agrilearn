<template>
  <div id="siteLogin">
    <section class="section section-lg">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="container pt-lg-5">
              <div class="form-container">
                <base-alert v-if="error" type="danger" v-add:dismissible="true">{{ message }}</base-alert>
                <base-alert v-if="success" type="success" :dismissible="true">{{ message }}</base-alert>
                <div class="text-center text-white mb-4">
                  <small class="smallTxt">Log in to continue</small>
                </div>
                <form role="form">
                  <div class="fields">
                    <h3 class="title-subheading">Username or Email</h3>
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="Username"
                      v-model.trim="detail"
                    ></base-input>
                    <span v-if="submitted && !$v.detail.required">Details required</span>
                    <span v-if="!$v.detail.maxLength">Don't try!</span>
                  </div>
                  <div class="fields">
                    <h3 class="title-subheading">Password</h3>
                    <span v-if="submitted && !$v.password.required">Password is required</span>
                    <span v-if="!$v.password.minLength">Password must be at least 6 characters</span>
                    <span v-if="!$v.password.maxLength">password too long</span>
                    <base-input
                      alternative
                      type="password"
                      placeholder="Password"
                      v-model.trim="password"
                    ></base-input>
                  </div>
                  <p class="text-right forgot-txt">
                    <router-link to="/password-recovery">forgot password?</router-link>
                  </p>
                  <div class="text-center">
                    <base-button class="my-4 btn-success" type="success" @click="logSub">Login</base-button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
</style>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
export default {
  data: function() {
    return {
      submitted: false,
      error: false,
      message: '',
      detail: '',
      password: ''
    };
  },
  validations: {
    detail: { required, maxLength: maxLength(30) },
    password: { required, minLength: minLength(6), maxLength: maxLength(13) }
  },
  methods: {
    ...mapActions(['login']),
    logSub: function(evt) {
      evt.preventDefault();
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let user = {
        detail: this.detail,
        password: this.password
      };

      this.login(user)
        .then(res => {
          if (res.data.success) {
            this.$router.push('/');
          } else if (res.data.success == false) {
            this.error = true;
            this.message = res.data.msg;
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }
};
</script>
