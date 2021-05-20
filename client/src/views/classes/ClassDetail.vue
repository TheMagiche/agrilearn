<template>
    <DashboardLayout>
        <template v-slot:dashboard-content>
            <a-spin :spinning="spinning">
                <a-row :gutter="[16, 16]">
                    <a-col :span="14">
                        <a-card :loading="loading" hoverable class="detailCard">
                            <img slot="cover" alt="example" :src="classImageUrl" />
                            <div class="rating">
                                <star-rating v-bind:increment="0.5" v-bind:star-size="20" v-model="classRating" :read-only="true"></star-rating>
                            </div>
                            <template slot="actions" class="ant-card-actions">
                                <a-button v-if="checkisStudent && studentCompatibility && !ifRegistered" type="primary" icon="setting" @click="regClass"> Register </a-button>
                                <a-button v-if="checkisStudent && ifRegistered" type="warning" icon="setting" @click="deRegClass"> Deregister </a-button>
                                <a-button v-if="checkisStudent && ifRegistered" type="primary" icon="setting" @click="rateClass"> Rate </a-button>
                                <a-button v-if="checkisInstructor && checkInstructor" type="warning" icon="edit" @click="editClass(classID)"> Edit </a-button>
                                <a-button v-if="checkisInstructor && checkInstructor" type="danger" icon="ellipsis" @click="deleteClass(classID)"> Delete </a-button>
                                <a-button v-if="checkisInstructor && checkInstructor" type="primary" icon="ellipsis" @click="addLesson"> Add lesson </a-button>
                            </template>
                            <a-row type="flex" align="top">
                                <a-col :span="22">
                                    <h2>
                                        <strong>{{ classTitle }}</strong>
                                    </h2>
                                    <br />
                                    <p v-html="classDescription"></p>
                                </a-col>
                                <a-col :span="2">
                                    <a-tooltip :title="classInstructorUsername">
                                        <a-avatar><a-icon slot="icon" type="user"></a-icon></a-avatar>
                                    </a-tooltip>
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                    <a-col :span="10">
                        <a-card :loading="loading" title="Lessons">
                            <ul class="lesson-ul">
                                <li class="lesson-li" v-for="lesson in classLessons" :key="lesson._id">
                                    <p class="lesson-title">{{ lesson.title }}</p>

                                    <div class="lesson-detail">
                                        <!-- <p v-html="Texttrim(lesson.body)" class="lesson-line"></p> -->
                                        <a v-if="registered || checkisInstructor" @click="viewLesson(lesson._id)" class="lessonAnchor text-right">View lesson</a>
                                    </div>
                                </li>
                            </ul>
                        </a-card>
                        <br />
                        <a-card :loading="loading" title="Reviews">
                            <a-list item-layout="horizontal" :data-source="classReviews">
                                <a-list-item slot="renderItem" slot-scope="item">
                                    <a-row>
                                        <a-col>
                                            <star-rating v-bind:increment="0.5" v-bind:max-rating="5" inactive-color="#ddd" active-color="#20e434" v-bind:star-size="20" :read-only="true" v-model="item.rating"></star-rating>
                                        </a-col>
                                        <a-col>
                                          <a-skeleton :loading="loading" active avatar>
                                            <a-list-item-meta :description="item.comment">
                                                <strong slot="title">{{ item.author.username }} ~ {{ item.author.email }}</strong>
                                                <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            </a-list-item-meta>
                                          </a-skeleton>
                                        </a-col>
                                    </a-row>
                                </a-list-item>
                            </a-list>
                            <div class="pag">
                                <a-pagination v-model="page" :total="totalPages" />
                            </div>
                        </a-card>
                    </a-col>
                </a-row>
            </a-spin>
        </template>
    </DashboardLayout>
</template>
<style scoped>
.detailCard {
    width: 100%;
}
.detailCard img {
    max-height: 60vh;
    object-fit: cover;
}
.rating {
    margin-bottom: 10px;
}
.lesson-ul {
    width: 100%;
    list-style: none;
    counter-reset: counter-name;
}

.lesson-li {
    margin: 2em auto;
    padding-left: 2em;
    width: 100%;
    position: relative;
}

.lesson-li::before {
    counter-increment: counter-name;
    content: counter(counter-name);
    position: absolute;
    left: -2em;
    /* top: 30%; */
    background-color: #fff;
    border: 1px solid #20e434;
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}
</style>
<script>
// @ is an alias to /src
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import axios from 'axios';

export default {
    name: 'ClassDetail',
    title: 'Class',
    components: {
        DashboardLayout,
    },
    data() {
        return {
            spinning: true,
            loading: true,
            classID: '',
            classTitle: '',
            classDescription: '',
            classImageUrl: '',
            classInstructorID: '',
            classInstructorEmail: '',
            classInstructorUsername: '',
            classLessons: [],
            classStudents: [],
            classReviews: [],
            classReadTime: '',
            classStatus: '',
            classRating: 0.0,
            rate: 0,
            classPro: false,
            comment: '',
            currentPage: 1,
            totalPages: 1,
            page: 1,
            limit: 3,
            registered: false,
            reviewText: 'See reviews',
            studentStatus: false,
        };
    },
    computed: {
        checkInstructor: function () {
            if (this.$store.getters.username == this.classInstructorUsername) {
                return true;
            } else {
                return false;
            }
        },
        checkisStudent: function () {
            if (this.$store.getters.isStudent) {
                return true;
            } else {
                return false;
            }
        },
        checkisInstructor: function () {
            if (this.$store.getters.isInstructor) {
                return true;
            } else {
                return false;
            }
        },
        ifRegistered: function () {
            if (this.registered) {
                return true;
            }
            return false;
        },
        studentCompatibility: function () {
            if (this.studentStatus == false && this.classPro == true) {
                return false;
            }
            return true;
        },
    },
    filters: {
        capitalize: function (value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
    },
    watch: {
        page: {
            immediate: true,
            handler(page) {
                const classID = this.classID;
                page = parseInt(this.page) || 1;
                if (page !== this.currentPage) {
                    axios({
                        url: `/api/classes/ratings/${classID}`,
                        method: 'POST',
                        data: { page: this.page, limit: this.limit },
                    })
                        .then((resp) => {
                            this.classReviews = resp.data.ratings;
                            this.totalPages = resp.data.totalPages * 10;
                            this.currentPage = resp.data.currentPage;
                        })
                        .catch((err) => {
                            // eslint-disable-next-line no-console
                            console.log(err);
                        });
                }
            },
        },
    },
    methods: {
        Texttrim: function (value) {
            if (!value) return '';
            value = value.toString();
            return value.slice(0, 15);
        },
        getReviews: function () {
            const classID = this.$route.params.id;
            axios({
                url: `/api/classes/ratings/${classID}`,
                method: 'POST',
                data: { page: this.page, limit: this.limit },
            })
                .then((resp) => {
                    this.classReviews = resp.data.ratings;
                    this.totalPages = resp.data.totalPages * 10;
                    this.currentPage = resp.data.currentPage;
                    this.loading = false;
                    if (this.classReviews.length == 0) {
                        this.reviewText = 'No reviews yet';
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        removeReviews: function () {
            this.classReviews = [];
        },
        getClass: function () {
            const classID = this.$route.params.id;
            axios({
                url: `/api/classes/details/${classID}`,
                method: 'GET',
            })
                .then((resp) => {
                    this.classID = resp.data.class._id;
                    this.classTitle = resp.data.class.title;
                    this.classDescription = resp.data.class.description;
                    this.classImageUrl = resp.data.class.imgUrl;
                    this.classInstructorID = resp.data.class.instructor._id;
                    this.classInstructorEmail = resp.data.class.instructor.email;
                    this.classInstructorUsername = resp.data.class.instructor.username;
                    this.classLessons = resp.data.class.lessons;

                    this.classStudents = resp.data.class.students;
                    this.classReadTime = resp.data.class.readTime;
                    this.classRating = parseInt(resp.data.class.rating);
                    if (resp.data.class.pro == true) {
                        this.classPro = true;
                        this.classStatus = 'Pro (for premium students only)';
                    } else {
                        this.classPro = false;
                        this.classStatus = 'Free';
                    }
                    this.spinning = false;
                    // eslint-disable-next-line no-console
                    // console.log(this.classLessons);
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        deleteClass: function () {
            const classID = this.$route.params.id;
            axios({
                url: `/api/classes/${classID}/delete`,
                data: {
                    instructorID: this.classInstructorID,
                },
                method: 'DELETE',
            })
                .then((resp) => {
                    // eslint-disable-next-line no-console
                    console.log(resp.data.msg);
                    this.$router
                        .push({
                            name: 'InstructorClasses',
                        })
                        .then((res) => {
                            this.$notification['success']({
                                message: 'Delete Successful',
                                description: `${res.data.msg}`,
                            });
                        })
                        .catch((err) => {
                            // eslint-disable-next-line no-console
                            console.log(err);
                        });
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        editClass: function () {
            const classID = this.$route.params.id;
            this.$router
                .push({
                    name: 'classEdit',
                    params: {
                        id: classID,
                    },
                })
                .then()
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        checkReg: function () {
            const classID = this.$route.params.id;
            const userID = this.$store.getters.userID;
            axios({
                url: `/api/students/${userID}/class/${classID}/checkReg`,
                method: 'GET',
            })
                .then((res) => {
                    this.registered = res.data.registered;
                    this.studentStatus = res.data.studentStatus;
                    this.$notification['warning']({
                        message: 'Go Premium',
                        description: `Classes that are marked 'pro' are for premium students. Please support us and become a premium member by checking out your profile page`,
                    });
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        regClass: function () {
            const classID = this.$route.params.id;
            const userID = this.$store.getters.userID;
            axios({
                url: `/api/students/${userID}/class/${classID}/register`,
                method: 'POST',
            })
                .then((res) => {
                    if (res.data.success == false) {
                        this.$notification['error']({
                            message: 'Something went wrong',
                            description: `${res.data.msg}`,
                        });
                    } else {
                        this.registered = true;
                        this.$notification['success']({
                            message: 'Welcome',
                            description: `${res.data.msg}`,
                        });
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        deRegClass: function () {
            const classID = this.$route.params.id;
            const userID = this.$store.getters.userID;
            axios({
                url: `/api/students/${userID}/class/${classID}/deregister`,
                method: 'POST',
            })
                .then((res) => {
                    if (res.data.success == false) {
                        this.$notification['error']({
                            message: 'Something went wrong',
                            description: `${res.data.msg}`,
                        });
                    } else {
                        this.registered = false;
                        this.$notification['success']({
                            message: 'Deregistered, try our other classes',
                            description: `${res.data.msg}`,
                        });
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        addLesson: function () {
            const classID = this.$route.params.id;
            this.$router
                .push({
                    name: 'newLesson',
                    params: {
                        id: classID,
                    },
                })
                .then()
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        viewLesson: function (val) {
            this.$router
                .push({
                    name: 'LessonDetail',
                    params: {
                        id: val,
                    },
                })
                .then()
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        rateClass: function (evt) {
            evt.preventDefault();

            this.submitted = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            const classID = this.$route.params.id;
            const userID = this.$store.getters.userID;
            axios({
                url: `/api/students/${userID}/class/${classID}/rate`,
                method: 'POST',
                data: {
                    rate: this.rate,
                    comment: this.comment,
                },
            })
                .then((res) => {
                    if (res.data.success == false) {
                        this.$notification['error']({
                            message: 'Something went wrong',
                            description: `${res.data.msg}`,
                        });
                        this.rate = 0;
                        this.comment = '';
                    } else {
                        this.$notification['success']({
                            message: 'Added your review',
                            description: `${res.data.msg}`,
                        });
                        this.rate = 0;
                        this.comment = '';
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
    },
    mounted() {
        this.getClass();
        this.getReviews();
        if (this.$store.getters.isStudent) {
            this.checkReg();
        }
    },
};
</script>
