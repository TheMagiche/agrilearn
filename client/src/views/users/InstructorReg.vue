<template>
  <div id="InstructorRegister">
    <section class="section section-lg mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="container">
              <div class="form-container">
                <base-alert v-if="error" type="danger" dismissible="true">{{
                  message
                }}</base-alert>
                <div class="text-center text-white mb-4">
                  <small class="smallTxt">Welcome to AgriSkul</small>
                </div>
                <form role="form">
                  <div class="fields">
                    <h3 class="title-subheading">Username</h3>
                    <span v-if="submitted && !$v.username.required"
                      >Username is required</span
                    >
                    <span v-if="!$v.username.maxLength"
                      >Username is too long</span
                    >
                    <base-input
                      alternative
                      class="mb-3"
                      :class="{
                        'is-invalid': submitted && $v.username.$error
                      }"
                      placeholder="Username"
                      v-model.trim="username"
                    ></base-input>
                  </div>

                  <div class="fields">
                    <h3 class="title-subheading">First name</h3>
                    <span v-if="submitted && !$v.first_name.required"
                      >First name is required</span
                    >
                    <span v-if="!$v.first_name.maxLength"
                      >Name is too long</span
                    >
                    <base-input
                      alternative
                      class="mb-3"
                      :class="{
                        'is-invalid': submitted && $v.first_name.$error
                      }"
                      placeholder="First name"
                      v-model.trim="first_name"
                    ></base-input>
                  </div>

                  <div class="fields">
                    <h3 class="title-subheading">Last name</h3>
                    <span v-if="submitted && !$v.last_name.required"
                      >Last name is required</span
                    >
                    <span v-if="!$v.last_name.maxLength">name is too long</span>
                    <base-input
                      alternative
                      class="mb-3"
                      :class="{
                        'is-invalid': submitted && $v.last_name.$error
                      }"
                      placeholder="Last name"
                      v-model.trim="last_name"
                    ></base-input>
                  </div>
                  <div class="fields">
                    <h3 class="title-subheading">Email</h3>
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
                  <div class="fields">
                    <h3 class="title-subheading">Phone number</h3>
                    <span v-if="submitted && !$v.phoneNumber.required"
                      >Phone number is required</span
                    >
                    <span v-if="!$v.phoneNumber.minLength"
                      >Enter correct phone number</span
                    >
                    <span v-if="!$v.phoneNumber.maxLength"
                      >please enter valid phone number</span
                    >
                    <base-input
                      alternative
                      class="mb-3"
                      :class="{
                        'is-invalid': submitted && $v.phoneNumber.$error
                      }"
                      placeholder="+254 - - -  - - -  - - -"
                      v-model.trim="phoneNumber"
                    ></base-input>
                  </div>
                  <div class="fields">
                    <h3 class="title-subheading">Password</h3>
                    <span v-if="submitted && !$v.password.required"
                      >Password is required</span
                    >
                    <span v-if="!$v.password.minLength"
                      >Password must be at least 6 characters</span
                    >
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
                    <span v-if="submitted && !$v.confirm_password.required"
                      >Confirm Password is required</span
                    >
                    <span v-else-if="!$v.confirm_password.sameAsPassword"
                      >Passwords must match</span
                    >
                    <base-input
                      alternative
                      type="password"
                      placeholder="Confirm Password"
                      v-model.trim="confirm_password"
                    ></base-input>
                  </div>
                  <div class="text-center">
                    <base-button
                      class="my-4 btn-green"
                      type="success"
                      @click="regSub"
                      >Create account</base-button
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <img
              :src="require('@/assets/images/instructor.svg')"
              class="reg-img"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  sameAs,
  maxLength
} from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  data: function() {
    return {
      submitted: false,
      error: false,
      message: "",
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirm_password: "",
      type: "instructor"
    };
  },
  validations: {
    username: { required, maxLength: maxLength(18) },
    first_name: { required, maxLength: maxLength(13) },
    last_name: { required, maxLength: maxLength(13) },
    email: { required, email, maxLength: maxLength(20) },
    phoneNumber: {
      required,
      minLength: minLength(13),
      maxLength: maxLength(13)
    },
    password: { required, minLength: minLength(6), maxLength: maxLength(13) },
    confirm_password: { required, sameAsPassword: sameAs("password") }
  },
  methods: {
    ...mapActions(["register"]),
    regSub: function(evt) {
      evt.preventDefault();

      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let user = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        username: this.username,
        password: this.password,
        password2: this.confirm_password,
        type: this.type,
        phoneNumber: this.phoneNumber
      };

      this.register(user).then(res => {
        if (res.data.success == true) {
          this.$router.push({ name: "SiteLogin" });
        } else if (res.data.success == false) {
          this.error = true;
          this.message = res.data.msg;
        }
      });
      this.error = false;
    }
  }
};
</script>
