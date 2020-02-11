<template>
  <div id="classIndex">
    <section class="section section-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="container pt-lg-5">
            <h3>All Classes</h3>
            <div class="card-container">
              <b-card
                v-for="item in classes"
                :key="item._id"
                :img-src="item.imgUrl"
                img-alt="Card image"
                img-top
                class="mb-3 ml-3 class-card"
              >
                <b-card-text>
                  <h6>{{ item.title | capitalize }}</h6>
                  <p>{{item.description | trim }} ...</p>
                  <p>By: {{item.instructor.username }}</p>

                  <a @click="viewClass(item._id)" class>View Class</a>
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
      classes: null
    };
  },
  computed: {},
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    trim: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.slice(0, 100);
    }
  },
  methods: {
    getClasses: function() {
      axios({
        url: "/api/classes/",
        method: "GET"
      })
        .then(resp => {
          // eslint-disable-next-line no-console
          // console.log(resp.data.classes);
          this.classes = resp.data.classes;
          // // eslint-disable-next-line no-console
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
          name: "classDetail",
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