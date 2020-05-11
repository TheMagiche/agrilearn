<template>
  <div id="editLesson">
    <section class="section section-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="container pt-lg-5">
            <h3 class="title-heading">Edit Lesson</h3>
            <div class="container pt-lg-5">
              <div class="form-container">
                <form>
                  <div class="fields">
                    <h3 class="title-subheading">Lessons Title</h3>
                    <base-input
                      class="input-group-alternative mb-3"
                      placeholder="Lesson Title"
                      addon-left-icon="ni ni-email-83"
                      v-model.trim="lessonTitle"
                    ></base-input>
                  </div>
                  <div class="fields">
                    <h3 class="title-subheading">Lessons Number</h3>
                    <base-input
                      class="input-group-alternative mb-3"
                      placeholder="Lesson Number"
                      addon-left-icon="ni ni-email-83"
                      v-model.trim="lessonNumber"
                    ></base-input>
                  </div>
                  <div class="fields">
                    <h3 class="title-subheading">Lessons Body</h3>
                    <vue-ckeditor
                      v-model="lessonBody"
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
                    <base-button class="my-4 btn-success" @click="updateLesson">Submit</base-button>
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
      lessonID: '',
      lessonBody: '',
      lessonNumber: '',
      lessonTitle: '',
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
    getLesson: function() {
      const lessonID = this.$route.params.id;
      axios({
        url: `/api/lessons/details/${lessonID}`,
        method: 'GET'
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
    },
    updateLesson: async function() {
      const lessonID = this.$route.params.id;
      await axios({
        url: `/api/lessons/update/${lessonID}`,
        data: {
          title: this.lessonTitle,
          body: this.lessonBody.trim(),
          number: this.lessonNumber
        },
        method: 'PUT'
      })
        .then(() => {
          this.$router.go(-1);
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
    this.getLesson();
  }
};
</script>
