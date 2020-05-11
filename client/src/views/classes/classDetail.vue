<template>
  <div id="classDetail">
    <section class="section section-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="blog-container">
              <div class="blog-header">
                <div class="blog-cover" :style="{ backgroundImage: `url(${classImageUrl})` }">
                  <div class="blog-author"></div>
                </div>
              </div>

              <div class="blog-body">
                <base-alert v-if="error" type="danger" :dismissible="true">{{ message }}</base-alert>
                <base-alert v-if="success" type="success" :dismissible="true">{{ message }}</base-alert>
                <div class="blog-title">
                  <h3>{{ classTitle | capitalize }}</h3>
                </div>
                <div class="blog-menu">
                  <div class="submenu">
                    <div class="class-ratings">
                      <span>Class Rating</span>
                      <star-rating
                        v-bind:increment="0.5"
                        v-bind:max-rating="5"
                        inactive-color="#ddd"
                        active-color="#20e434"
                        v-bind:star-size="20"
                        :read-only="true"
                        v-model="classRating"
                      ></star-rating>
                    </div>
                  </div>
                  <div class="submenu"></div>
                  <div class="submenu"></div>
                </div>

                <div class="blog-summary">
                  <p v-html="classDescription"></p>
                </div>
                <div class="blog-tags">
                  <ul>
                    <li>
                      <a
                        v-if="checkisInstructor && checkInstructor"
                        @click="editClass(classID)"
                        class
                      >Edit class</a>
                    </li>
                    <li>
                      <a
                        v-if="checkisInstructor && checkInstructor"
                        @click="deleteClass(classID)"
                        class
                      >Delete class</a>
                    </li>
                    <li>
                      <a
                        v-if="checkisInstructor && checkInstructor"
                        @click="addLesson"
                        class
                      >Add lesson</a>
                    </li>
                    <li>
                      <a
                        v-if="checkisStudent && registered==false"
                        @click="regClass"
                        class
                      >Register For Class</a>
                    </li>
                    <li>
                      <a
                        v-if="checkisStudent && registered"
                        @click="deRegClass"
                        class="deReg"
                      >Deregister Class</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="section-lesson">
                <div class="heading-section">
                  <h3 class="title-heading">Lessons</h3>
                </div>
                <ul class="lesson-ul">
                  <li class="lesson-li" v-for="lesson in classLessons" :key="lesson._id">
                    <p class="lesson-title">{{ lesson.title }}</p>

                    <div class="lesson-detail">
                      <!-- <p v-html="Texttrim(lesson.body)" class="lesson-line"></p> -->
                      <a @click="viewLesson(lesson._id)" class="lessonAnchor text-right">View lesson</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="class-sidebar">
              <div class="sidebar-item">
                <p class="sidebar-heading">Class Details</p>
                <ul class="classdetails">
                  <li class="listdetails">
                    <span class="spanheading">By (Username)</span>
                    <span class="spandetails">{{ classInstructorUsername }}</span>
                  </li>
                  <li class="listdetails">
                    <span class="spanheading">Email</span>
                    <span class="spandetails">{{ classInstructorEmail }}</span>
                  </li>
                  <li class="listdetails">
                    <span class="spanheading">Number of students</span>
                    <span class="spandetails">{{classStudents.length}} students</span>
                  </li>
                  <li class="listdetails">
                    <span class="spanheading">Number of lessons</span>
                    <span class="spandetails">{{classLessons.length}} lessons</span>
                  </li>
                  <li class="listdetails">
                    <span class="spanheading">Estimated time</span>
                    <span class="spandetails">{{classReadTime}}</span>
                  </li>
                  <li class="listdetails">
                    <span class="spanheading">Free or Pro</span>
                    <span class="spandetails">{{classStatus}}</span>
                  </li>
                </ul>
              </div>
              <hr />
              <div v-if="checkisStudent && registered" class="sidebar-item">
                <p class="sidebar-heading">Give this class a rating</p>

                <div class="classRating">
                  <div class="ratingfields">
                    <span style="display:block; color:red" v-if="!$v.rate.required">Rate is required</span>
                    <span>Class Rating</span>
                    <star-rating
                      v-bind:increment="0.5"
                      v-bind:max-rating="5"
                      inactive-color="#dddddd"
                      active-color="#20e434"
                      v-bind:star-size="20"
                      v-model="rate"
                    ></star-rating>
                  </div>

                  <div class="ratingfields">
                    <span
                      style="display:block; color:red"
                      v-if="submitted && !$v.comment.required"
                    >Comment is required</span>
                    <span style="display:block; color:red" v-if="!$v.comment.minLength">Too short..</span>
                    <span
                      style="display:block; color:red"
                      v-if="!$v.comment.maxLength"
                    >Comment is too long</span>
                    <span>Comment</span>
                    <base-input alternative placeholder="Your view" v-model.trim="comment"></base-input>
                  </div>
                  <div class="text-center">
                    <base-button
                      tag="a"
                      href="#"
                      class="mb-3 mb-sm-0 btn-green btn-sm"
                      type="success"
                      @click="rateClass"
                    >SEND</base-button>
                  </div>
                </div>
              </div>
              <div v-if="checkisInstructor && checkInstructor" class="sidebar-item">
                <p class="sidebar-heading">Class reviews</p>
                <div v-for="review in classReviews" :key="review.id" class="class-reviews">
                  <star-rating
                    v-bind:increment="0.5"
                    v-bind:max-rating="5"
                    inactive-color="#ddd"
                    active-color="#20e434"
                    v-bind:star-size="20"
                    :read-only="true"
                    v-model="review.rating"
                  ></star-rating>
                  <p>"{{review.comment}}"</p>
                  <p>{{review.author.username}} ~ {{review.author.email}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      classRating: 0,
      success: false,
      error: false,
      message: '',
      classID: '',
      classTitle: '',
      classDescription: '',
      classImageUrl: '',
      classInstructorID: '',
      classInstructorEmail: '',
      classInstructorUsername: '',
      classLessons: [],
      classStudents: [],
      classReviews: [],
      classReadTime: '',
      classStatus: '',
      submitted: false,
      rate: 0,
      comment: '',
      registered: false
    };
  },
  validations: {
    rate: { required },
    comment: { required, maxLength: maxLength(50), minLength: minLength(5) }
  },
  computed: {
    checkInstructor: function() {
      if (this.$store.getters.username == this.classInstructorUsername) {
        return true;
      } else {
        return false;
      }
    },
    checkisStudent: function() {
      if (this.$store.getters.isStudent) {
        return true;
      } else {
        return false;
      }
    },
    checkisInstructor: function() {
      if (this.$store.getters.isInstructor) {
        return true;
      } else {
        return false;
      }
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    Texttrim: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.slice(0, 15);
    },
    getClass: function() {
      const classID = this.$route.params.id;
      axios({
        url: `/api/classes/details/${classID}`,
        method: 'GET'
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
          this.classReviews = resp.data.class.ratings;
          this.classStudents = resp.data.class.students;
          this.classReadTime = resp.data.class.readTime;
          this.classRating = parseInt(resp.data.class.rating);
          if (resp.data.class.pro == true) {
            this.classStatus = 'Pro';
          } else {
            this.classStatus = 'Free';
          }
          // eslint-disable-next-line no-console
          // console.log(this.classLessons);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
    deleteClass: function() {
      const classID = this.$route.params.id;
      axios({
        url: `/api/classes/${classID}/delete`,
        data: {
          instructorID: this.classInstructorID
        },
        method: 'DELETE'
      })
        .then(resp => {
          // eslint-disable-next-line no-console
          console.log(resp.data.msg);
          this.$router
            .push({
              name: 'instructorClasses'
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
    editClass: function() {
      const classID = this.$route.params.id;
      this.$router
        .push({
          name: 'classEdit',
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
    checkReg: function() {
      const classID = this.$route.params.id;
      const userID = this.$store.getters.userID;
      axios({
        url: `/api/students/${userID}/class/${classID}/checkReg`,
        method: 'GET'
      })
        .then(res => {
          this.registered = res.data.registered;
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
        method: 'POST'
      })
        .then(res => {
          window.location.reload();
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
    },
    deRegClass: function() {
      const classID = this.$route.params.id;
      const userID = this.$store.getters.userID;
      axios({
        url: `/api/students/${userID}/class/${classID}/deregister`,
        method: 'POST'
      })
        .then(() => {
          this.$router
            .push({
              name: 'studentClasses'
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
          name: 'newLesson',
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
          name: 'classLesson',
          params: {
            id: val
          }
        })
        .then()
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    rateClass: function(evt) {
      evt.preventDefault();

      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const classID = this.$route.params.id;
      const userID = this.$store.getters.userID;
      axios({
        url: `/api/students/${userID}/class/${classID}/rate`,
        method: 'POST',
        data: {
          rate: this.rate,
          comment: this.comment
        }
      })
        .then(res => {
          if (res.data.success == false) {
            this.error = true;
            this.message = res.data.msg;
            this.rate = 0;
            this.comment = '';
            window.location.reload();
          } else {
            this.success = true;
            this.message = res.data.msg;
            this.rate = 0;
            this.comment = '';
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  },
  mounted() {
    this.getClass();
    this.checkReg();
  }
};
</script>
