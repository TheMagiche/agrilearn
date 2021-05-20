<template>
    <DashboardLayout>
        <template v-slot:dashboard-content>
            <a-spin :spinning="spinning">
                <a-row :gutter="[16, 16]">
                    <a-col :span="14">
                        <a-card :loading="loading" hoverable class="detailCard">
                            <img slot="cover" alt="example" :src="defaultImg" />
                            <template slot="actions" class="ant-card-actions">
                                <a-button v-if="checkisInstructor && checkInstructor" type="warning" icon="edit" @click="editLesson(lessonID)"> Edit </a-button>
                                <a-button v-if="checkisInstructor && checkInstructor" type="danger" icon="ellipsis" @click="deleteLesson(lessonID)"> Delete </a-button>
                                <a-button type="primary" icon="ellipsis" @click="addLesson"> Add Comment </a-button>
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
                    <a-col :span="10">
                        <a-card :loading="loading" title="Forum">
                            <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
                                <div slot="footer"><b>ant design vue</b> footer part</div>
                                <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                                    <template v-for="{ type, text } in actions" slot="actions">
                                        <span :key="type">
                                            <a-icon :type="type" style="margin-right: 8px" />
                                            {{ text }}
                                        </span>
                                    </template>

                                    <a-list-item-meta :description="item.description">
                                        <a slot="title" :href="item.href">{{ item.title }}</a>
                                        <a-avatar slot="avatar" :src="item.avatar" />
                                    </a-list-item-meta>
                                    {{ item.content }}
                                </a-list-item>
                            </a-list>
                            <!-- <div class="pag">
                                <a-pagination v-model="page" :total="totalPages" />
                            </div> -->
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
</style>
<script>
// @ is an alias to /src
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import axios from 'axios';
const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://www.antdv.com/',
        title: `ant design vue part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}
export default {
    name: 'LessonDetail',
    title: 'Lesson',
    components: {
        DashboardLayout,
    },
    data() {
        return {
            listData,
            defaultImg: 'https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            lessonID: '',
            pagination: {
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 3,
            },
            lessonBody: '',
            lessonNumber: '',
            lessonTitle: '',
            forum: [],
            currentPage: 1,
            totalPages: 1,
            page: 1,
            limit: 3,
            spinning: true,
            loading: true,
            actions: [
                { type: 'star-o', text: '156' },
                { type: 'like-o', text: '156' },
                { type: 'message', text: '2' },
            ],
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
        deleteLesson: function () {
            const lessonID = this.$route.params.id;
            axios({
                url: `/api/lessons/delete/${lessonID}`,
                method: 'DELETE',
            })
                .then((resp) => {
                    // eslint-disable-next-line no-console
                    console.log(resp.data.msg);
                    this.$router
                        .go(-1)
                        .then()
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
        editLesson: function () {
            const lessonID = this.$route.params.id;
            this.$router
                .push({
                    name: 'editLesson',
                    params: {
                        id: lessonID,
                    },
                })
                .then()
                .catch((err) => {
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
