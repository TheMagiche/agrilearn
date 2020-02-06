<template>
  <div id="classDetail">
    <section class="section section-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="container pt-lg-5">
            <div class>
              <b-card :img-src="classImageUrl" img-alt="Card image" img-top class="mb-3 ml-3">
                <b-card-text>
                  <h2>{{ classTitle | capitalize }}</h2>
                  <p>{{ classDescription }}</p>
                  <p>By: {{classInstructorUsername }}</p>
                  <p>Email: {{classInstructorEmail}}</p>
                  <h6>Lessons</h6>
                  <ol>
                    <li v-for="lesson in classLessons" :key="lesson._id">
                      <p>{{ lesson.title }}</p>
                      <a @click="viewLesson(lesson._id)" class>View lesson</a>
                    </li>
                  </ol>
                  <a @click="addLesson" class>Add lesson</a>
                </b-card-text>
              </b-card>
              <a @click="regClass" class>Register For Class</a>
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
      classID: "",
      classTitle: "",
      classDescription: "",
      classImageUrl: "",
      classInstructorID: "",
      classInstructorEmail: "",
      classInstructorUsername: "",
      classLessons: null
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
    getClass: function() {
      const classID = this.$route.params.id;
      axios({
        url: `/api/classes/details/${classID}`,
        method: "GET"
      })
        .then(resp => {
          this.classID = resp.data.class._id;
          this.classTitle = resp.data.class.title;
          this.classDescription = resp.data.class.description;
          this.classImageUrl = resp.data.class.imgUrl;
          this.classInstructorID = resp.data.class.instructor._id;
          this.classInstructorEmail = resp.data.class.instructor.email;
          this.classInstructorUsername = resp.data.class.instructor.username;
          this.classLessons = resp.data.class.lessons;
          // eslint-disable-next-line no-console
          // console.log(this.classLessons);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
    regClass: function() {
      const classID = this.$route.params.id;
      const userID = this.$store.getters.userID;
      axios({
        url: `/api/students/${userID}/class/${classID}/register`,
        method: "POST"
      })
        .then(resp => {
          // eslint-disable-next-line no-console
          console.log(resp.data.msg);
          this.$router
            .push({
              name: "studentClasses"
            })
            .then()
            .catch(err => {
              // eslint-disable-next-line no-console
              console.log(err);
            });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
    addLesson: function() {
      const classID = this.$route.params.id;
      this.$router
        .push({
          name: "newLesson",
          params: {
            id: classID
          }
        })
        .then()
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    viewLesson: function(val) {
      this.$router
        .push({
          name: "classLesson",
          params: {
            id: val
          }
        })
        .then()
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  },
  mounted() {
    this.getClass();
  }
};
</script>