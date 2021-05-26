<template>
    <DashboardLayout>
        <template v-slot:dashboard-content>
            <a-spin :spinning="spinning">
                <a-row type="flex" align="middle" :gutter="[16, 16]">
                    <a-col :span="10">
                        <a-card hoverable class="profileCard">
                            <img slot="cover" alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                            <template slot="actions" class="ant-card-actions">
                                <a-button @click="editProfile" type="primary">
                                    <a-icon key="setting" type="setting" />
                                    Edit profile
                                </a-button>
                                <a-button @click="getPremium" type="warning">
                                    <a-icon key="trophy" type="trophy" />
                                    Get Premium
                                </a-button>
                            </template>
                            <a-card-meta :title="username" :description="type"> </a-card-meta>
                        </a-card>
                    </a-col>
                    <a-col :span="14">
                        <div class="greyArea" style="">
                            <a-card title="General Details" :bordered="false">
                                <div class="profile-section">
                                    <div class="profile-heading">Name:</div>
                                    <div class="profile-detail">{{ first_name | capitalize }} {{ last_name | capitalize }}</div>
                                </div>
                                <div class="profile-section">
                                    <div class="profile-heading">Email:</div>
                                    <div class="profile-detail">
                                        {{ email }}
                                    </div>
                                </div>
                                <div class="profile-section">
                                    <div class="profile-heading">Phone:</div>
                                    <div class="profile-detail">
                                        {{ phoneNumber }}
                                    </div>
                                </div>
                            </a-card>
                        </div>
                        <br />
                        <div class="greyArea">
                            <a-card title="Contextual Information" :bordered="false">
                                <div class="profile-section">
                                    <div class="profile-heading">Status:</div>
                                    <div class="profile-detail">{{ status }}</div>
                                </div>
                                <div class="profile-section">
                                    <div class="profile-heading">Number of enrolled classes:</div>
                                    <div class="profile-detail">
                                        {{ classes.length }}
                                    </div>
                                </div>
                                <div class="profile-section">
                                    <div class="profile-heading">Verified:</div>
                                    <div class="profile-detail">
                                        {{ verified }}
                                    </div>
                                </div>
                            </a-card>
                        </div>
                    </a-col>
                </a-row>
                <EditProfileModal />
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
.profile-section {
    padding: 0.2em;
}
.profile-heading {
    font-weight: bold;
}
.profile-detail {
    padding: 0 0.5em;
    background: #30a679;
    color: #fff;
    border-radius: 5px;
}
</style>
<script>
// @ is an alias to /src
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import axios from 'axios';

import { bus } from '@/event-bus';
import EditProfileModal from '@/components/modals/students/editStudProfileModal';

export default {
    name: 'StudentProfile',
    title: 'Student Profile',
    components: {
        DashboardLayout,
        EditProfileModal,
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
        editProfile: function () {
            bus.$emit('stud-profile-visible', true);
        },
        getPremium() {
            bus.$emit('premium-visible', true);
        },
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
    created(){
        bus.$on('stud-profile-updated', (val) => {
            if (val) {
                this.getDetails();
            }
        });
        bus.$on('stud-premium', (val) => {
            if (val) {
                this.getDetails();
            }
        });
    },
    mounted() {
        this.getDetails();
        this.checkPremium();
    },
};
</script>
