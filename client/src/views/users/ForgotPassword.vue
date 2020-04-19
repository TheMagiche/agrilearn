<template>
  <div id="siteLogin">
    <section class="section section-lg">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="container pt-lg-5">
              <div class="form-container">
                <base-alert v-if="error" type="danger" :dismissible="true">
                  {{ message }}
                </base-alert>
                <base-alert v-if="success" type="success" :dismissible="true">
                  {{ message }}
                </base-alert>
                <div class="text-center text-white mb-4">
                  <small class="smallTxt">Password Recovery</small>
                </div>
                <form role="form">
                  <div class="fields">
                    <h3 class="title-subheading">
                      Enter your email to continue
                    </h3>
                    <span v-if="submitted && !$v.email.required"
                      >Email is required</span
                    >
                    <span v-if="!$v.email.maxLength"
                      >please enter valid email</span
                    >
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
                    <base-button
                      class="my-4 btn-success"
                      type="success"
                      @click="fogSub"
                      >Proceed</base-button
                    >
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
.green {
  background: #20e434;
}
.smallTxt {
  text-transform: uppercase;
}
.btn-green {
  background: #20e434;
}
</style>

<script>
import { required, maxLength, email } from 'vuelidate/lib/validators';
import axios from 'axios';
export default {
  data: function() {
    return {
      submitted: false,
      error: false,
      success: false,
      message: '',
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
            this.error = true;
            this.message = res.data.msg;
          } else {
            this.success = true;
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
