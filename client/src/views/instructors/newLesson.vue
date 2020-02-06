<template>
  <div id="newLesson">
    <section class="section section-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="container pt-lg-5">
            <h3>New Lesson</h3>
            <div class="container pt-lg-5">
              <div class="lessonForm">
                <form class="row">
                  <div class="col-lg-4">
                    <base-input
                      class="input-group-alternative mb-3"
                      placeholder="Lesson Title"
                      addon-left-icon="ni ni-email-83"
                      v-model.trim="lessontitle"
                    ></base-input>
                    <base-input
                      class="input-group-alternative mb-3"
                      placeholder="Lesson Number"
                      addon-left-icon="ni ni-email-83"
                      v-model.trim="lessonnumber"
                    ></base-input>
                  </div>
                  <div class="col-lg-8">
                    <textarea
                      class="form-control form-control-alternative"
                      rows="15"
                      placeholder="Content..."
                      v-model.trim="lessonbody"
                    ></textarea>

                    <div class="text-center">
                      <base-button
                        class="my-4 btn-secondary"
                        type="secondary"
                        @click="submitLesson"
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
.lessonForm {
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
      lessontitle: "",
      lessonbody: "",
      lessonnumber: ""
    };
  },
  computed: {},
  methods: {
    submitLesson: async function() {
      const classID = this.$route.params.id;
      await axios({
        url: `/api/lessons/create/${classID}`,
        data: {
          number: this.lessonnumber,
          title: this.lessontitle,
          body: this.lessonbody
        },
        method: "POST"
      })
        .then(() => {
          this.$router.push({
            name: "classDetail"
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