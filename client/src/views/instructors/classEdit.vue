<template>
  <div id="editClass">
    <section class="section section-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="container pt-lg-5">
            <h3 class="title-heading">Edit Class</h3>
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
                            addon-left-icon="ni ni-email-83"
                            v-model.trim="classTitle"
                          ></base-input>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="fields">
                          <h3 class="title-subheading">Pro ?</h3>
                          <switches :label="isPro" v-model="pro" theme="default" color="green"></switches>
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
                            addon-left-icon="ni ni-email-83"
                            v-model.trim="classImageUrl"
                          ></base-input>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="fields">
                          <h3 class="title-subheading">Study Time</h3>
                          <base-input
                            class="input-group-alternative mb-3"
                            placeholder="10 minutes"
                            v-model.trim="readTime"
                          ></base-input>
                        </div>
                      </div>
                    </div>

                    <div class="fields">
                      <vue-ckeditor
                        v-model="classDescription"
                        :config="config"
                        @blur="onBlur($event)"
                        @focus="onFocus($event)"
                        @contentDom="onContentDom($event)"
                        @dialogDefinition="onDialogDefinition($event)"
                        @fileUploadRequest="onFileUploadRequest($event)"
                        @fileUploadResponse="onFileUploadResponse($event)"
                      />
                    </div>

                    <div class="text-center">
                      <base-button class="my-4 btn-success" @click="updateClass">Submit</base-button>
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

<script>
import axios from 'axios';
import VueCkeditor from 'vue-ckeditor2';
import Switches from 'vue-switches';
export default {
  components: { VueCkeditor, Switches },
  data() {
    return {
      classTitle: '',
      classDescription: '',
      classImageUrl: '',
      pro: false,

      readTime: '',
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
    isPro: function() {
      if (this.pro) {
        return 'Pro';
      }
      return 'Free';
    }
  },
  methods: {
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
          this.pro = resp.data.class.pro;
          this.readTime = resp.data.class.readTime;
          // eslint-disable-next-line no-console
          // console.log(this.classLessons);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
    updateClass: async function() {
      const classID = this.$route.params.id;
      await axios({
        url: `/api/classes/${classID}/update`,
        data: {
          title: this.classTitle,
          imgUrl: this.classImageUrl,
          description: this.classDescription.trim(),
          pro: this.pro,
          readTime: this.readTime
        },
        method: 'PUT'
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
    onBlur() {},
    onFocus() {},
    onContentDom() {},
    onDialogDefinition() {},
    onFileUploadRequest() {},
    onFileUploadResponse() {}
  },
  mounted() {
    this.getClass();
  }
};
</script>
