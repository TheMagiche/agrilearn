<template>
    <DashboardLayout>
        <template v-slot:dashboard-content>
            <a-spin :spinning="spinning">
                <a-row :gutter="[16, 16]">
                    <a-col :span="14" :lg="14" :md="14" :sm="24" :xs="24">
                        <a-card :loading="loading" hoverable class="detailCard">
                            <img slot="cover" alt="example" :src="defaultImg" />
                            <template slot="actions" class="ant-card-actions">
                                <a-button v-if="checkisInstructor && checkInstructor" type="warning" icon="edit" @click="editLesson"> Edit </a-button>
                                <a-popconfirm title="Are you sure delete this lesson?" ok-text="Yes" cancel-text="No" @confirm="deleteLesson(lessonID)" @cancel="cancel">
                                    <a-button v-if="checkisInstructor && checkInstructor" type="danger" icon="delete"> Delete </a-button>
                                </a-popconfirm>
                                <a-button type="primary" icon="ellipsis" @click="goBack"> Back to class </a-button>
                            </template>
                            <a-row type="flex" align="top">
                                <a-col>
                                    <span>Lesson {{ lessonNumber }} </span>
                                    <h2>
                                        <strong>{{ lessonTitle }}</strong>
                                    </h2>
                                    <br />
                                    <div v-html="lessonBody"></div>
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                    <a-col :span="10" :lg="10" :md="10" :sm="24" :xs="24">
                        <a-card :loading="loading" title="Forum">
                            <Disqus :pageConfig="pageConfig" />
                        </a-card>
                    </a-col>
                </a-row>
                <EditLessonModal />
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
</style>
<script>
// @ is an alias to /src
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import axios from 'axios';
import EditLessonModal from '@/components/modals/instructor/editLessonModal';

import { bus } from '@/event-bus';

export default {
    name: 'LessonDetail',
    title: 'Lesson',
    components: {
        DashboardLayout,
        EditLessonModal,
    },
    data() {
        return {
            defaultImg: 'https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            lessonID: '',
            lessonBody: '',
            lessonNumber: '',
            lessonTitle: '',
            spinning: true,
            loading: true,
            pageConfig: {
                identifier: this.$router.currentRoute,
                title: `${this.lessonTitle}`,
            },
        };
    },
    computed: {
        checkInstructor: function () {
            if (this.$store.getters.username) {
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
    },
    filters: {
        capitalize: function (value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
    },
    methods: {
        cancel(e) {
            this.$message.error('Not deleted');
        },
        getLesson: function () {
            const lessonID = this.$route.params.id;
            axios({
                url: `/api/lessons/details/${lessonID}`,
                method: 'GET',
            })
                .then((resp) => {
                    this.lessonID = resp.data.lesson._id;
                    this.lessonTitle = resp.data.lesson.title;
                    this.lessonBody = resp.data.lesson.body;
                    this.lessonNumber = resp.data.lesson.number.toLowerCase();
                    this.loading = false;
                    this.spinning = false;
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        goBack: function () {
            this.$router.go(-1);
        },
        deleteLesson: function () {
            const lessonID = this.$route.params.id;
            axios({
                url: `/api/lessons/delete/${lessonID}`,
                method: 'DELETE',
            })
                .then((resp) => {
                    this.$notification['success']({
                        message: 'Delete Successful',
                        description: `${resp.data.msg}`,
                    });
                    this.$router.go(-1);
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        editLesson: function () {
            bus.$emit('editLesson-visible', true);
        },
        addComment: function () {
            bus.$emit('addCommment-visible', true);
        },
    },
    mounted() {
        this.getLesson();
    },
};
</script>
