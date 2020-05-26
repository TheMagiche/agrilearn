<template>
  <div id="classIndex">
    <section class="section section-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="container pt-lg-5">
            <h3 class="title-heading">All Classes</h3>
            <div v-for="item in classes" :key="item._id" class="example-2 Classcard">
              <div class="wrapper" :style="{ backgroundImage: `url(${item.imgUrl})` }">
                <div class="header">
                  <div class="ratings">
                    <span>Class Rating</span>
                    <star-rating
                      v-bind:increment="0.5"
                      v-bind:star-size="20"
                      v-model="item.rating"
                      :read-only="true"
                    ></star-rating>
                  </div>
                </div>
                <div class="data">
                  <div class="content">
                   <div class="top-content">
                        <div v-if="item.pro" class="class-status">Pro</div>
                        <div v-if="!item.pro" class="class-status">Free</div>
                        <div class="author">By: {{ item.instructor.username }}</div>
                      </div>
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
          <div class="pagination-container">
            <base-pagination :pageCount="totalPages" v-model="page"></base-pagination>
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
      classes: null,
      currentPage: 1,
      totalPages: 1,
      page: 1,
      limit: 2
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
  watch: {
    page: {
      immediate: true,
      handler(page) {
        page = parseInt(this.page) || 1;
        if (page !== this.currentPage) {
          axios({
            url: '/api/classes/all',
            method: 'POST',
            data: { page: this.page, limit: this.limit }
          })
            .then(resp => {
              // eslint-disable-next-line no-console
              // console.log(resp.data.classes);
              this.classes = resp.data.classes;
              this.totalPages = resp.data.totalPages;
              this.currentPage = resp.data.currentPage;
              // // eslint-disable-next-line no-console
              // console.log(this.classes);
            })
            .catch(err => {
              // eslint-disable-next-line no-console
              console.log(err);
            });
        }
      }
    }
  },
  methods: {
    Texttrim: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.slice(0, 100);
    },

    getClasses: function() {
      axios({
        url: '/api/classes/all',
        method: 'POST',
        data: {
          page: this.page,
          limit: this.limit
        }
      })
        .then(resp => {
          // eslint-disable-next-line no-console
          // console.log(resp.data.classes);
          this.classes = resp.data.classes;
          this.totalPages = resp.data.totalPages;
          this.currentPage = resp.data.currentPage;
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
