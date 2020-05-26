<template>
  <div id="siteLogin">
    <section class="section section-lg">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="container pt-lg-5">
              <div class="form-container">
                <div class="text-center text-white mb-4">
                  <small class="smallTxt">Password Recovery</small>
                </div>
                <form role="form">
                  <div class="fields">
                    <h3 class="title-subheading">Enter your email to continue</h3>
                    <span v-if="submitted && !$v.email.required">Email is required</span>
                    <span v-if="!$v.email.maxLength">please enter valid email</span>
                    <span v-if="!$v.email.email">Email is invalid</span>
                    <base-input
                      alternative
                      class="mb-3"
                      :class="{
                        'is-invalid': submitted && $v.email.$error
                      }"
                      placeholder="Email"
                      v-model.trim="email"
                    ></base-input>
                  </div>
                  <div class="text-center">
                    <base-button class="my-4 btn-success" type="success" @click="fogSub">Proceed</base-button>
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
import { required, maxLength, email } from 'vuelidate/lib/validators';
import axios from 'axios';
export default {
  data: function() {
    return {
      submitted: false,
      email: ''
    };
  },
  validations: {
    email: { required, email, maxLength: maxLength(100) }
  },
  methods: {
    fogSub: function(evt) {
      evt.preventDefault();
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      axios({
        url: '/api/users/reset-password',
        method: 'POST',
        data: {
          email: this.email
        }
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
    }
  }
};
</script>
