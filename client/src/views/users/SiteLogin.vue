<template>
  <div id="siteLogin">
    <section class="section section-lg">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <card
              type="secondary"
              shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0"
            >
              <template>
                <div class="text-center text-muted mb-4">
                  <small class="smallTxt">Welcome to agrilearn</small>
                </div>
                <form role="form">
                  <base-input
                    alternative
                    class="mb-3"
                    placeholder="Username"
                    addon-left-icon="ni ni-hat-3"
                    v-model.trim="username"
                  ></base-input>
                  <base-input
                    alternative
                    type="password"
                    placeholder="Password"
                    addon-left-icon="ni ni-lock-circle-open"
                    v-model.trim="password"
                  ></base-input>
                  <div class="text-center">
                    <base-button
                      class="my-4 btn-green"
                      type="success"
                      @click="logSub"
                      >Login</base-button
                    >
                  </div>
                </form>
              </template>
            </card>
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
import { mapActions } from "vuex";
export default {
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    logSub: function(evt) {
      evt.preventDefault();

      let user = {
        username: this.username,
        password: this.password
      };

      this.login(user)
        .then(res => {
          if (res.data.success) {
            this.$router.push("/");
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
