<template>
  <div id="newLesson">
    <section class="section section-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="container pt-lg-5">
            <h3>New Class</h3>
            <div class="container pt-lg-5">
              <div class="classForm">
                <form class="row">
                  <div class="col-lg-4">
                    <base-input
                      class="input-group-alternative mb-3"
                      placeholder="Class Title"
                      addon-left-icon="ni ni-email-83"
                      v-model.trim="title"
                    ></base-input>
                  </div>
                  <div class="col-lg-8">
                    <textarea
                      class="form-control form-control-alternative"
                      rows="5"
                      placeholder="Description..."
                      v-model.trim="description"
                    ></textarea>
                    <base-input
                      class="input-group-alternative mt-3"
                      placeholder="Image Url"
                      addon-left-icon="ni ni-email-83"
                      v-model.trim="imageUrl"
                    ></base-input>

                    <div class="text-center">
                      <base-button
                        class="my-4 btn-secondary"
                        type="secondary"
                        @click="submitClass"
                      >Submit</base-button>
                    </div>
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
.classForm {
  background: #dddddd;
  border-radius: 15px;
  height: 60vh;
  padding: 1em;
  box-shadow: 1px, 2px, 1px #000;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      description: "",
      imageUrl: ""
    };
  },
  computed: {
    getUsername: function() {
      let username = this.$store.getters.username;
      if (username == localStorage.getItem("username")) {
        return username;
      } else {
        return "Guest";
      }
    }
  },
  methods: {
    submitClass: async function() {
      const userID = this.$store.getters.userID;
      await axios({
        url: `/api/classes/create/${userID}`,
        data: {
          title: this.title,
          description: this.description,
          imageUrl: this.imageUrl
        },
        method: "POST"
      })
        .then(() => {
          this.$router.push({
            name: "instructorClasses"
          });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  },
  mounted() {}
};
</script>