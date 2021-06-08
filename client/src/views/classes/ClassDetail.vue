<template>
    <div>
        <DashboardLayout>
            <template v-slot:dashboard-content>
                <a-spin :spinning="spinning">
                    <a-row :gutter="[16, 16]">
                        <a-col :span="14" :lg="14" :md="14" :sm="24" :xs="24">
                            <a-card :loading="loading" hoverable class="detailCard">
                                <img slot="cover" alt="example" :src="resolveCover(classImageUrl)" />
                                <div class="rating">
                                    <a-row>
                                        <a-col :span="18"> <star-rating v-bind:increment="0.5" v-bind:star-size="20" v-model="classRating" :read-only="true"></star-rating> </a-col>
                                        <a-col :span="6"
                                            ><div class="clsStatus">
                                                {{ classStatus }}
                                            </div></a-col
                                        >
                                    </a-row>
                                </div>
                                <template slot="actions" class="ant-card-actions">
                                    <a-button v-if="checkisStudent && studentCompatibility && !ifRegistered" type="primary" icon="thunderbolt" @click="regClass"> Register </a-button>
                                    <a-button v-if="checkisStudent && ifRegistered" type="warning" icon="api" @click="deRegClass"> Deregister </a-button>

                                    <a-button v-if="checkisInstructor && checkInstructor" type="warning" icon="edit" @click="editClass"> Edit </a-button>
                                    <a-popconfirm title="Are you sure delete this class?" ok-text="Yes" cancel-text="No" @confirm="deleteClass(classID)" @cancel="cancel">
                                        <a-button v-if="checkisInstructor && checkInstructor" type="danger" icon="delete"> Delete </a-button>
                                    </a-popconfirm>
                                    <a-button v-if="checkisInstructor && checkInstructor" type="primary" icon="diff" @click="addLesson"> Add lesson </a-button>
                                    <a-button v-if="checkisStudent && ifRegistered" type="primary" icon="smile" @click="rateClass"> Rate </a-button>
                                </template>
                                <br />
                                <a-row align="top" style="margin: '1em 0'">
                                    <a-col :span="2" :lg="2" :md="2" :sm="2" :xs="4">
                                        <a-tooltip :title="classInstructorUsername">
                                            <a-avatar class="avatarI" :src="resolveImage(classInstructorAvatar)" />
                                        </a-tooltip>
                                    </a-col>
                                    <a-col :span="22" :lg="22" :md="22" :sm="22" :xs="20">
                                        <h2 class="classTitle">
                                            <strong>{{ classTitle }}</strong>
                                        </h2>
                                        <a-tag color="orange">{{ classStudents.length }} students </a-tag>
                                        <a-tag color="green"> {{ classLessons.length }} lessons </a-tag>
                                        <a-tag color="cyan"> {{ classReadTime }} minute read </a-tag>
                                    </a-col>
                                </a-row>

                                <br />
                                <p v-html="classDescription"></p>
                            </a-card>
                        </a-col>
                        <a-col :span="10" :lg="10" :md="10" :sm="24" :xs="24">
                            <a-card :loading="loading" title="Lessons">
                                <a-empty v-if="classLessons.length == 0" />
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
                                                        <strong slot="title"
                                                            >{{ item.author.username }} <span v-if="checkisInstructor && checkInstructor">~ {{ item.author.email }} </span></strong
                                                        >
                                                        <a-avatar slot="avatar" class="avatarI" :src="resolveImage(item.author.avatar)" />
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
        <EditClassModal />
        <CreateLessonModal />
        <RatingModal />
    </div>
</template>
<style scoped>
.avatarI {
    background: #ddd;
    padding: 2px;
}
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
    margin: 0.5em auto 1em;
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
.clsStatus {
    padding: 0.1em 0.5em;
    text-align: center;
    color: white;
    background: burlywood;
}
@media (min-width: 500px) {
    .classTitle {
        font-size: 18px;
    }
}
</style>
<script>
// @ is an alias to /src
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import axios from 'axios';

import EditClassModal from '@/components/modals/instructor/editClassModal';
import CreateLessonModal from '@/components/modals/instructor/newLessonModal';
import RatingModal from '@/components/modals/students/ratingModal';
import { bus } from '@/event-bus';

export default {
    name: 'ClassDetail',
    title: 'Class',
    components: {
        DashboardLayout,
        EditClassModal,
        CreateLessonModal,
        RatingModal,
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
            classInstructorAvatar: 'Artboard 1',
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
        resolveCover: function (cover) {
            if (typeof cover == 'string' && cover !== '') {
                return cover;
            } else {
                return 'https://images.pexels.com/photos/2280569/pexels-photo-2280569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
            }
        },
        resolveImage: function (avatar) {
            if (typeof avatar == 'string') {
                return require(`@/assets/avatars/${avatar}.png`);
            } else {
                return require(`@/assets/avatars/Artboard 1.png`);
            }
        },
        cancel(e) {
            this.$message.error('Not deleted');
        },
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
                    this.classInstructorAvatar = resp.data.class.instructor.avatar;
                    this.classLessons = resp.data.class.lessons;

                    this.classStudents = resp.data.class.students;
                    this.classReadTime = resp.data.class.readTime;
                    this.classRating = parseInt(resp.data.class.rating);
                    if (resp.data.class.pro == true) {
                        this.classPro = true;
                        this.classStatus = 'Pro';
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
                    this.$notification['success']({
                        message: 'Delete Successful',
                        description: `${resp.data.msg}`,
                    });
                    this.$router.push({
                        name: 'InstructorClasses',
                    });
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        editClass() {
            bus.$emit('editClass-visible', true);
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
            bus.$emit('createLesson-visible', true);
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
            bus.$emit('rating-visible', true);
        },
    },
    created() {
        bus.$on('added-rating', (val) => {
            this.getReviews();
        });
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
