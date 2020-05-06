<template>
  <div id="instructorClasses">
    <section class="section section-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="container pt-lg-5">
            <h3 class="title-heading">Classes</h3>
            <div v-for="item in classes" :key="item._id" class="example-2 Classcard">
              <div class="wrapper" :style="{ backgroundImage: `url(${item.imgUrl})` }">
                <div class="header">
                  <div class="ratings">
                    <span>Class Rating</span>
                    <star-rating
                      v-bind:increment="0.5"
                      v-bind:max-rating="5"
                      inactive-color="#dddddd"
                      active-color="#20e434"
                      v-bind:star-size="20"
                      v-model="rating"
                    ></star-rating>
                  </div>
                </div>
                <div class="data">
                  <div class="content">
                    <!-- <span class="author">By: {{ item.instructor.username }}</span> -->
                    <h1 class="title">
                      <a href="#">{{ item.title }}</a>
                    </h1>
                    <p class="text" v-html="Texttrim(item.description)"></p>
                    <a @click="viewClass(item._id)" class="button">Read more</a>
                  </div>
                </div>
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
  data() {
    return {
      classes: null
    };
  },
  computed: {},
  filters: {
    trim: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.slice(0, 100);
    }
  },
  methods: {
    Texttrim: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.slice(0, 100);
    },
    getClasses: function() {
      const userID = this.$store.getters.userID;
      axios({
        url: `/api/instructors/classes/${userID}`,
        method: 'GET'
      })
        .then(resp => {
          // eslint-disable-next-line no-console
          // console.log(resp.data.classes);
          this.classes = resp.data.classes;
          // eslint-disable-next-line no-console
          // console.log(this.classes);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
    viewClass: function(val) {
      this.$router
        .push({
          name: 'classDetail',
          params: { id: val }
        })
        .then()
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  },
  mounted() {
    this.getClasses();
  }
};
</script>
