<template>
    <div id="newLesson">
        <section class="section section-large">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="container pt-lg-5">
                        <h3 class="title-heading">New Lesson</h3>
                        <div class="container pt-lg-5">
                            <div class="form-container">
                                <form>
                                    <div class="fields">
                                        <h3 class="title-subheading">Lessons Title</h3>
                                        <base-input
                                            class="input-group-alternative mb-3"
                                            placeholder="Lesson Title"
                                            addon-left-icon="ni ni-email-83"
                                            v-model.trim="lessontitle"
                                        ></base-input>
                                    </div>
                                    <div class="fields">
                                        <h3 class="title-subheading">Lessons Number</h3>
                                        <base-input
                                            class="input-group-alternative mb-3"
                                            placeholder="Lesson Number"
                                            addon-left-icon="ni ni-email-83"
                                            v-model.trim="lessonnumber"
                                        ></base-input>
                                    </div>
                                    <div class="fields">
                                        <h3 class="title-subheading">Lessons Body</h3>
                                        <vue-ckeditor
                                            v-model="lessonbody"
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
                                        <base-button
                                            class="my-4 btn-success"
                                            @click="submitLesson"
                                        >Submit</base-button>
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
            lessontitle: '',
            lessonbody: '',
            lessonnumber: '',
        };
    },
    computed: {},
    methods: {
        submitLesson: async function() {
            const classID = this.$route.params.id;
            await axios({
                url: `/api/lessons/create/${classID}`,
                data: {
                    number: this.lessonnumber,
                    title: this.lessontitle,
                    body: this.lessonbody,
                },
                method: 'POST',
            })
                .then(() => {
                    this.$router.push({
                        name: 'classDetail',
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
        },
    },
    mounted() {},
};
</script>