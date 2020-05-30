<template>
  <div id="siteLogin">
    <section class="section section-lg">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="container pt-lg-5">
              <div class="form-container">
                <div class="text-center smimgContainer">
                  <img :src="require('@/assets/images/leaf.png')" alt="leafimg" />
                </div>
                <div class="text-center text-white mb-4">
                  <small class="smallTxt">Reset Password</small>
                </div>
                <form role="form">
                  <div class="fields">
                    <h3 class="title-subheading">New password</h3>
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
                  <div class="fields">
                    <h3 class="title-subheading">Confirm password</h3>
                    <span
                      v-if="submitted && !$v.confirm_password.required"
                    >Confirm Password is required</span>
                    <span v-else-if="!$v.confirm_password.sameAsPassword">Passwords must match</span>
                    <base-input
                      alternative
                      type="password"
                      placeholder="Confirm Password"
                      v-model.trim="confirm_password"
                    ></base-input>
                  </div>
                  <div class="text-center">
                    <base-button class="my-4 btn-success" type="success" @click="resetSub">Reset</base-button>
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
import {
  required,
  minLength,
  maxLength,
  sameAs
} from 'vuelidate/lib/validators';
import axios from 'axios';
export default {
  data: function() {
    return {
      submitted: false,
      password: '',
      confirm_password: ''
    };
  },
  validations: {
    confirm_password: { required, sameAsPassword: sameAs('password') },
    password: { required, minLength: minLength(6), maxLength: maxLength(13) }
  },
  methods: {
    checkToken: function() {
      const token = this.$route.params.token;
      axios({
        url: `/api/users/reset/${token}`,
        method: 'GET'
      })
        .then(res => {
          if (res.data.success == false) {
            this.$notify({
              group: 'logins',
              type: 'error',
              title: 'Failed',
              text: `${res.data.msg}`
            });
          } else {
            this.$notify({
              group: 'logins',
              type: 'success',
              title: 'Success',
              text: `${res.data.msg}`
            });
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
    resetSub: function(evt) {
      evt.preventDefault();
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const token = this.$route.params.token;
      axios({
        url: `/api/users/reset/${token}`,
        method: 'POST',
        data: {
          password: this.password
        }
      })
        .then(res => {
          if (res.data.success == false) {
            this.error = true;
            this.message = res.data.msg;
          } else {
            this.success = true;
            this.message = res.data.msg;
            this.password = '';
            this.confirm_password = '';
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  },
  mounted() {
    this.checkToken();
  }
};
</script>
