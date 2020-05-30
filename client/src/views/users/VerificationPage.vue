<template>
  <div id="siteVerify">
    <section class="section section-lg">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="container pt-lg-5">
              <div class="form-container">
                <div class="text-center text-white mb-4">
                  <small class="smallTxt">Account verifiication</small>
                </div>
                <div class="text-center smimgContainer">
                  <img :src="require('@/assets/images/leaf.png')" alt="leafimg" />
                </div>
                <p v-if="success">
                  Proceed to
                  <router-link :to="{name: 'SiteLogin'}">Login Page</router-link>
                </p>
                <p v-if="!success">
                  Account unverified, Token expired.
                  Contact agriskul@gmail.com
                </p>
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
import axios from 'axios';
export default {
  data: function() {
    return {
      success: false
    };
  },

  methods: {
    verifyUser: function() {
      const token = this.$route.params.token;
      axios({
        url: `/api/users/verify/${token}`,
        method: 'GET'
      })
        .then(res => {
          if (res.data.success == false) {
            this.success = false;
            this.$notify({
              group: 'logins',
              type: 'error',
              title: 'Failed',
              text: `${res.data.msg}`
            });
          } else {
            this.success = true;
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
  },
  mounted() {
    this.verifyUser();
  }
};
</script>
