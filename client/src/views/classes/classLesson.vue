<template>
    <div id="classLesson">
        <section class="section section-large">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="container">
                        <div class="blog-container">
                            <div class="blog-header">
                                <div
                                    class="blog-cover"
                                    :style="{ backgroundImage: `url(${defaultImg})` }"
                                >
                                    <div class="blog-author"></div>
                                </div>
                            </div>

                            <div class="blog-body">
                                <div class="blog-title">
                                    <h3>Lesson {{ lessonNumber }}: {{ lessonTitle | capitalize }}</h3>
                                </div>
                                <div class="blog-summary">
                                    <p v-html="lessonBody"></p>
                                </div>
                                <div class="blog-tags">
                                    <ul>
                                        <li>
                                            <a
                                                v-if="checkisInstructor"
                                                @click="deleteLesson"
                                                class
                                            >Delete Lesson</a>
                                        </li>
                                        <li>
                                            <a
                                                v-if="checkisInstructor"
                                                @click="editLesson"
                                                class
                                            >Edit lesson</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style></style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            defaultImg: 'https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            lessonID: '',
            lessonBody: '',
            lessonNumber: '',
            lessonTitle: '',
        };
    },
    computed: {
        checkInstructor: function() {
            if (this.$store.getters.username) {
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
        },
    },
    filters: {
        capitalize: function(value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
    },
    methods: {
        getLesson: function() {
            const lessonID = this.$route.params.id;
            axios({
                url: `/api/lessons/details/${lessonID}`,
                method: 'GET',
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
        deleteLesson: function() {
            const lessonID = this.$route.params.id;
            axios({
                url: `/api/lessons/delete/${lessonID}`,
                method: 'DELETE',
            })
                .then(resp => {
                    // eslint-disable-next-line no-console
                    console.log(resp.data.msg);
                    this.$router
                        .go(-1)
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
        editLesson: function() {
            const lessonID = this.$route.params.id;
            this.$router
                .push({
                    name: 'editLesson',
                    params: {
                        id: lessonID,
                    },
                })
                .then()
                .catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
    },
    mounted() {
        this.getLesson();
    },
};
</script>
