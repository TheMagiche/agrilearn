<template>
  <div id="createClass">
    <section class="section section-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="container pt-lg-5">
            <h3 class="title-heading">Class Create</h3>
            <div class="container pt-lg-5">
              <div class="form-container">
                <form>
                  <div class="form-card">
                    <div class="row">
                      <div class="col-lg-9">
                        <div class="fields">
                          <h3 class="title-subheading">Class Title</h3>
                          <base-input
                            class="input-group-alternative mb-3"
                            placeholder="Class Title"
                            v-model.trim="title"
                          ></base-input>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="fields">
                          <h3 class="title-subheading">Pro ?</h3>
                          <base-switch :v-model="pro"></base-switch>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-9">
                        <div class="fields">
                          <h3 class="title-subheading">Class Image</h3>
                          <base-input
                            class="input-group-alternative mt-3"
                            placeholder="Image Url"
                            v-model.trim="imageUrl"
                          ></base-input>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="fields">
                          <h3 class="title-subheading">Study Time</h3>
                          <base-input
                            class="input-group-alternative mb-3"
                            placeholder="10 minutes"
                            v-model.trim="estTime"
                          ></base-input>
                        </div>
                      </div>
                    </div>

                    <div class="fields">
                      <h3 class="title-subheading">Class Body</h3>
                      <vue-ckeditor
                        :config="config"
                        @blur="onBlur($event)"
                        @focus="onFocus($event)"
                        @contentDom="onContentDom($event)"
                        @dialogDefinition="onDialogDefinition($event)"
                        @fileUploadRequest="onFileUploadRequest($event)"
                        @fileUploadResponse="onFileUploadResponse($event)"
                        v-model="description"
                      />
                    </div>

                    <div class="text-center">
                      <base-button
                        class="my-4 btn-secondary btn-success"
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
</style>

<script>
import axios from 'axios';
import VueCkeditor from 'vue-ckeditor2';

export default {
  components: { VueCkeditor },
  data() {
    return {
      title: '',
      description: '',
      imageUrl: '',
      pro: false,
      estTime: '',
      config: {
        toolbar: [
          'Format',
          ['Bold', 'Italic', 'Strike', 'Underline'],
          ['BulletedList', 'NumberedList', 'Blockquote'],
          ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
          ['Link', 'Unlink'],
          ['FontSize', 'TextColor'],
          ['Image'],
          ['Undo', 'Redo'],
          ['Source', 'Maximize']
        ],
        height: 300
      }
    };
  },
  computed: {
    getUsername: function() {
      let username = this.$store.getters.username;
      if (username == localStorage.getItem('username')) {
        return username;
      } else {
        return 'Guest';
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
          description: this.description.trim(),
          imageUrl: this.imageUrl,
          pro: this.pro,
          readTime: this.estTime
        },
        method: 'POST'
      })
        .then(() => {
          this.$router.push({
            name: 'instructorClasses'
          });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
    onBlur(evt) {
      // eslint-disable-next-line no-console
      console.log(evt);
    },
    onFocus(evt) {
      // eslint-disable-next-line no-console
      console.log(evt);
    },
    onContentDom(evt) {
      // eslint-disable-next-line no-console
      console.log(evt);
    },
    onDialogDefinition(evt) {
      // eslint-disable-next-line no-console
      console.log(evt);
    },
    onFileUploadRequest(evt) {
      // eslint-disable-next-line no-console
      console.log(evt);
    },
    onFileUploadResponse(evt) {
      // eslint-disable-next-line no-console
      console.log(evt);
    }
  },
  mounted() {}
};
</script>
