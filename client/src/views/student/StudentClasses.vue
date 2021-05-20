<template>
    <DashboardLayout>
        <template v-slot:dashboard-content>
            <a-spin :spinning="spinning">
                <a-row class="rowContainer" :gutter="[16, 16]">
                    <a-col v-for="item in classes" :key="item._id" :span="8">
                        <a-card hoverable style="width: 100%">
                            <img slot="cover" class="classImg" alt="example" :src="item.imgUrl" />
                            <div class="rating">
                                <star-rating v-bind:increment="0.5" v-bind:star-size="20" v-model="item.rating" :read-only="true"></star-rating>
                            </div>
                            <template slot="actions" class="ant-card-actions">
                                <a-button type="dashed" icon="ellipsis" @click="viewClass(item._id)">view</a-button>
                            </template>
                            <a-row>
                                <a-col :span="4">
                                    <a-tooltip :title="item.instructor.username">
                                        <a-avatar><a-icon slot="icon" type="user"></a-icon></a-avatar>
                                    </a-tooltip>
                                </a-col>
                                <a-col :span="20">
                                    <span
                                        ><strong>{{ item.title }}</strong></span
                                    >
                                    <br />
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
            </a-spin>
            <div class="pag">
                <a-pagination v-model="page" :total="totalPages" />
            </div>
        </template>
    </DashboardLayout>
</template>
<style scoped>
.spin-content {
    width: 100%;
    background: wheat;
}
.rowContainer {
    min-height: 70vh;
}
.rating {
    margin-bottom: 10px;
}
.pag {
    margin-top: 2em;
    text-align: center;
}
.classImg {
    height: 20em;
}
</style>
<script>
// @ is an alias to /src
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import axios from 'axios';
export default {
    name: 'StudentClasses',
    title: 'Student Classes',
    components: {
        DashboardLayout,
    },
    data() {
        return {
            classes: null,
            currentPage: 1,
            totalPages: 1,
            total: 1,
            page: 1,
            limit: 6,
            spinning: true,
        };
    },
    filters: {
        trim: function (value) {
            if (!value) return '';
            value = value.toString();
            return value.slice(0, 100);
        },
    },
    watch: {
        page: {
            immediate: true,
            handler(page) {
                page = parseInt(this.page) || 1;
                if (page !== this.currentPage) {
                    this.spinning = true;
                    const userID = this.$store.getters.userID;
                    axios({
                        url: `/api/students/classes/${userID}`,
                        method: 'POST',
                        data: { page: this.page, limit: this.limit },
                    })
                        .then((resp) => {
                            this.classes = resp.data.classes;
                            this.totalPages = resp.data.totalPages * 10;
                            this.currentPage = resp.data.currentPage;
                            this.spinning = false;
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
            return value.slice(0, 100);
        },
        getClasses: function () {
            const userID = this.$store.getters.userID;
            axios({
                url: `/api/students/classes/${userID}`,
                method: 'POST',
                data: {
                    page: this.page,
                    limit: this.limit,
                },
            })
                .then((resp) => {
                    // eslint-disable-next-line no-console
                    this.classes = resp.data.classes;
                    this.currentPage = resp.data.currentPage;
                    this.totalPages = resp.data.totalPages * 10;
                    this.spinning = false;
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        viewClass: function (val) {
            this.$router
                .push({
                    name: 'ClassDetail',
                    params: { id: val },
                })
                .then()
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
    },
    mounted() {
        this.getClasses();
    },
};
</script>
