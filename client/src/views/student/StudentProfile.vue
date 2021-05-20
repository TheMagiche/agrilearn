<template>
    <DashboardLayout>
        <template v-slot:dashboard-content>
            <a-spin :spinning="spinning">
                <a-row type="flex" align="middle" :gutter="[16, 16]">
                    <a-col :span="10">
                        <a-card hoverable class="profileCard">
                            <img slot="cover" alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                            <template slot="actions" class="ant-card-actions">
                                <a-icon key="setting" type="setting" />
                            </template>
                            <a-card-meta :title="username" :description="type"> </a-card-meta>
                        </a-card>
                    </a-col>
                    <a-col :span="14">
                        <div class="greyArea" style="">
                            <a-card title="General Details" :bordered="false">
                                <a-row>
                                    <a-col :span="6"><strong>Name</strong></a-col>
                                    <a-col :span="18"
                                        ><p>{{ first_name | capitalize }} {{ last_name | capitalize }}</p></a-col
                                    >
                                </a-row>
                                <a-row>
                                    <a-col :span="6"><strong>Email</strong></a-col>
                                    <a-col :span="18"
                                        ><p>{{ email }}</p></a-col
                                    >
                                </a-row>
                                <a-row>
                                    <a-col :span="6"><strong>Phone</strong></a-col>
                                    <a-col :span="18"
                                        ><p>{{ phoneNumber }}</p></a-col
                                    >
                                </a-row>
                            </a-card>
                        </div>
                        <br />
                        <div class="greyArea">
                            <a-card title="Contextual Information" :bordered="false">
                                <a-row>
                                    <a-col :span="16"><strong>Number of enrolled classes</strong></a-col>
                                    <a-col :span="8"
                                        ><p>{{ classes.length }}</p></a-col
                                    >
                                </a-row>
                                <a-row>
                                    <a-col :span="16"><strong>Verified:</strong></a-col>
                                    <a-col :span="8"
                                        ><p>{{ verified }}</p></a-col
                                    >
                                </a-row>
                                <a-row>
                                    <a-col :span="16"><strong>Status:</strong></a-col>
                                    <a-col :span="8"
                                        ><p>{{ status }}</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </div>
                    </a-col>
                </a-row>
            </a-spin>
        </template>
    </DashboardLayout>
</template>
<style scoped>
.profileCard {
    width: 80%;
}
.greyArea {
    background: #ececec;
    padding: 30px;
}
</style>
<script>
// @ is an alias to /src
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import axios from 'axios';
export default {
    name: 'StudentProfile',
    title: 'Student Profile',
    components: {
        DashboardLayout,
    },
    data() {
        return {
            spinning: true,
            loading: true,
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            phoneNumber: null,
            verified: false,
            classes: 0,
            type: '',
            status: 'Free Account',
        };
    },
    computed: {
        getusername: function () {
            return this.$store.getters.username;
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
        checkPremium: function () {
            const studID = this.$store.getters.userID;
            axios({
                url: `/api/students/${studID}/premium`,
                method: 'GET',
            })
                .then((resp) => {
                    // eslint-disable-next-line no-console
                    console.log(resp.data);
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        getDetails: function () {
            const studID = this.$store.getters.userID;
            axios({
                url: `/api/students/${studID}/profile`,
                method: 'GET',
            })
                .then((resp) => {
                    this.username = resp.data.username;
                    this.email = resp.data.email;
                    this.type = resp.data.type;
                    this.verified = resp.data.verified;
                    this.phoneNumber = resp.data.phoneNumber;
                    this.first_name = resp.data.first_name;
                    this.last_name = resp.data.last_name;
                    this.classes = resp.data.classes;
                    if (resp.data.status == true) {
                        this.pro = true;
                        this.status = 'Paid Account';
                    } else {
                        this.pro = false;
                        this.status = 'Free Account';
                    }
                    this.spinning = false;
                    this.loading = false;
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
    },
    mounted() {
        this.getDetails();
        this.checkPremium();
    },
};
</script>
