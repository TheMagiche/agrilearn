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
                  <div class="fields">
                    <h3 class="title-subheading">Class Title</h3>
                    <base-input
                      class="input-group-alternative mb-3"
                      placeholder="Class Title"
                      addon-left-icon="ni ni-email-83"
                      v-model.trim="classTitle"
                    ></base-input>
                  </div>
                  <div class="fields">
                    <h3 class="title-subheading">Class Image</h3>
                    <base-input
                      class="input-group-alternative mt-3"
                      placeholder="Image Url"
                      addon-left-icon="ni ni-email-83"
                      v-model.trim="classImageUrl"
                    ></base-input>
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
      classTitle: '',
      classDescription: '',
      classImageUrl: '',
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
  computed: {},
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
          description: this.classDescription.trim()
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
  mounted() {
    this.getClass();
  }
};
</script>
