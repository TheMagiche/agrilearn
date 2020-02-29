<template>
    <div id="classDetail">
        <section class="section section-large">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="container">
                        <div class="blog-container">
                            <div class="blog-header">
                                <div
                                    class="blog-cover"
                                    :style="{ backgroundImage: `url(${classImageUrl})` }"
                                >
                                    <div class="blog-author"></div>
                                </div>
                            </div>

                            <div class="blog-body">
                                <div class="blog-title">
                                    <h3>{{ classTitle | capitalize }}</h3>
                                </div>
                                <h6>By: {{ classInstructorUsername }}</h6>
                                <h6>Email: {{ classInstructorEmail }}</h6>
                                <div class="blog-summary">
                                    <p v-html="classDescription"></p>
                                </div>
                                <div class="blog-tags">
                                    <ul>
                                        <li>
                                            <a
                                                v-if="checkInstructor"
                                                @click="editClass(classID)"
                                                class
                                            >Edit class</a>
                                        </li>
                                        <li>
                                            <a
                                                v-if="checkInstructor"
                                                @click="deleteClass(classID)"
                                                class
                                            >Delete class</a>
                                        </li>
                                        <li>
                                            <a
                                                v-if="checkInstructor"
                                                @click="addLesson"
                                                class
                                            >Add lesson</a>
                                        </li>
                                        <li>
                                            <a
                                                v-if="checkisStudent"
                                                @click="regClass"
                                                class
                                            >Register For Class</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class>
                                <h3 class="title-heading">Lessons</h3>
                                <ol>
                                    <li v-for="lesson in classLessons" :key="lesson._id">
                                        <p>{{ lesson.title }}</p>
                                        <p v-html="Texttrim(lesson.body)"></p>
                                        <a @click="viewLesson(lesson._id)" class>View lesson</a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
a {
    cursor: pointer;
}
.blog-container {
    background: #fff;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 0 4px 2px -2px;
    margin: 1em auto;
    width: 100%;
}
@media screen and (min-width: 480px) {
    .blog-container {
        width: 100%;
    }
}
@media screen and (min-width: 767px) {
    .blog-container {
        width: 100%;
    }
}
@media screen and (min-width: 959px) {
    .blog-container {
        width: 100%;
    }
}

.blog-container a {
    color: #20e434;
    text-decoration: none;
    -webkit-transition: 0.25s ease;
    transition: 0.25s ease;
}
.blog-container a:hover {
    border-color: #20e434;
    color: #ff4d4d;
}

.blog-cover {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px 5px 0 0;
    height: 25rem;
    box-shadow: inset rgba(0, 0, 0, 0.2) 0 64px 64px 16px;
}

.blog-author,
.blog-author--no-cover {
    margin: 0 auto;
    padding-top: 0.125rem;
    width: 80%;
}

.blog-author h3::before,
.blog-author--no-cover h3::before {
    background-size: cover;
    border-radius: 50%;
    content: ' ';
    display: inline-block;
    height: 32px;
    margin-right: 0.5rem;
    position: relative;
    top: 8px;
    width: 32px;
}

.blog-author h3 {
    color: #fff;
    font-size: 18px;
}

.blog-author--no-cover h3 {
    color: #999999;
    font-weight: 100;
}

.blog-body {
    margin: 0 auto;
    width: 100%;
}

.blog-title {
    color: #000;
    font-weight: 100;
}

.blog-summary p {
    color: #4d4d4d;
}

.blog-tags ul {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    flex-wrap: wrap;
    list-style: none;
    padding-left: 0;
}

.blog-tags li + li {
    margin-left: 0.5rem;
}

.blog-tags a {
    border: 1px solid #999999;
    border-radius: 3px;
    color: #999999;
    font-size: 0.75rem;
    height: 1.5rem;
    line-height: 1.5rem;
    letter-spacing: 1px;
    padding: 0 0.5rem;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    width: 5rem;
}

.blog-footer {
    border-top: 1px solid #e6e6e6;
    margin: 0 auto;
    padding-bottom: 0.125rem;
    width: 80%;
}

.blog-footer ol {
    padding-left: 0;
}

.blog-footer li:first-child {
    margin-right: auto;
}

.blog-footer li + li {
    margin-left: 0.5rem;
}

.blog-footer li {
    color: #999999;
    font-size: 0.75rem;
    height: 1.5rem;
    letter-spacing: 1px;
    line-height: 1.5rem;

    text-transform: uppercase;
}
.blog-footer li a {
    color: #999999;
}

.comments {
    margin-right: 1rem;
}

.published-date {
    border: 1px solid #999999;
    border-radius: 3px;
    padding: 0 0.5rem;
}

.numero {
    position: relative;
    top: -0.5rem;
}

.icon-star,
.icon-bubble {
    fill: #999999;
    height: 24px;
    margin-right: 0.5rem;
    -webkit-transition: 0.25s ease;
    transition: 0.25s ease;
    width: 24px;
}
.icon-star:hover,
.icon-bubble:hover {
    fill: #ff4d4d;
}
</style>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            classID: '',
            classTitle: '',
            classDescription: '',
            classImageUrl: '',
            classInstructorID: '',
            classInstructorEmail: '',
            classInstructorUsername: '',
            classLessons: null,
        };
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
        Texttrim: function(value) {
            if (!value) return '';
            value = value.toString();
            return value.slice(0, 100);
        },
        getClass: function() {
            const classID = this.$route.params.id;
            axios({
                url: `/api/classes/details/${classID}`,
                method: 'GET',
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
                    instructorID: this.classInstructorID,
                },
                method: 'DELETE',
            })
                .then(resp => {
                    // eslint-disable-next-line no-console
                    console.log(resp.data.msg);
                    this.$router
                        .push({
                            name: 'instructorClasses',
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
                        id: classID,
                    },
                })
                .then()
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
                method: 'POST',
            })
                .then(resp => {
                    // eslint-disable-next-line no-console
                    console.log(resp.data.msg);
                    this.$router
                        .push({
                            name: 'studentClasses',
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
                        id: classID,
                    },
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
                        id: val,
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
        this.getClass();
    },
};
</script>
