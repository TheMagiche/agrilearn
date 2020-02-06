<template>
  <div id="classLesson">
    <section class="section section-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="container pt-lg-5">
            <div class>
              <b-card img-src img-alt="Card image" img-top class="mb-3 ml-3">
                <b-card-text>
                  <h2>Lesson {{ lessonNumber }}: {{ lessonTitle | capitalize }}</h2>
                  <p>{{ lessonBody }} ...</p>
                  <!-- <a @click="addLesson" class>Add lesson</a> -->
                </b-card-text>
              </b-card>
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
import axios from "axios";

export default {
  data() {
    return {
      lessonID: "",
      lessonBody: "",
      lessonNumber: "",
      lessonTitle: ""
    };
  },
  computed: {},
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    getLesson: function() {
      const lessonID = this.$route.params.id;
      axios({
        url: `/api/lessons/details/${lessonID}`,
        method: "GET"
      })
        .then(resp => {
          this.lessonID = resp.data.lesson._id;
          this.lessonTitle = resp.data.lesson.title;
          this.lessonBody = resp.data.lesson.body;
          this.lessonNumber = resp.data.lesson.number;
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  },
  mounted() {
    this.getLesson();
  }
};
</script>