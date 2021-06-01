<template>
    <DashboardLayout>
        <template v-slot:dashboard-content>
            <a-spin :spinning="spinning">
                <a-row type="flex" align="middle" :gutter="[16, 16]">
                    <a-col :span="10" :lg="10" :md="10" :sm="24" :xs="24">
                        <a-card hoverable class="profileCard">
                            <div class="imageContainer">
                                <img slot="cover" :alt="avatar" :src="resolveImage(avatar)" />
                            </div>
                            <br />
                            <template slot="actions" class="ant-card-actions">
                                <a-button @click="editProfile" type="primary">
                                    <a-icon key="setting" type="setting" />
                                    Edit profile
                                </a-button>
                            </template>
                            <a-card-meta :title="username" :description="type"> </a-card-meta>
                        </a-card>
                    </a-col>
                    <a-col :span="14" :lg="14" :md="14" :sm="24" :xs="24">
                        <div class="greyArea" style="">
                            <a-card title="General Details" :bordered="false">
                                <div class="profile-section">
                                    <span class="profile-heading">Name:</span>
                                    <a-tag color="orange">{{ first_name | capitalize }} {{ last_name | capitalize }}</a-tag>
                                </div>
                                <div class="profile-section">
                                    <span class="profile-heading">Email:</span>
                                    <a-tag color="cyan">{{ email }}</a-tag>
                                </div>
                                <div class="profile-section">
                                    <span class="profile-heading">Phone:</span>
                                    <a-tag color="pink">{{ phoneNumber }}</a-tag>
                                </div>
                            </a-card>
                        </div>
                        <br />
                        <div class="greyArea">
                            <a-card title="Contextual Information" :bordered="false">
                                <div class="profile-section">
                                    <span class="profile-heading">Number of classes:</span>
                                    <a-tag color="purple">{{ classes.length }}</a-tag>
                                </div>
                                <div class="profile-section">
                                    <span class="profile-heading">Verified:</span>
                                    <a-tag color="blue">{{ verified }}</a-tag>
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
@media (max-width: 500px) {
    .profileCard {
        width: 100%;
    }
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
    margin-right: 2em;
}
.profile-detail {
    padding: 0 0.5em;
    background: #30a679;
    color: #fff;
    border-radius: 5px;
}
.imageContainer {
    background: #eee;
    padding: 1em;
    height: 250px;
    width: 250px;
}
.imageContainer img {
    height: 100%;
    width: 100%;
}
</style>
<script>
// @ is an alias to /src
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import axios from 'axios';

import { bus } from '@/event-bus';
import EditProfileModal from '@/components/modals/instructor/editInstProfileModal';

export default {
    name: 'InstructorProfile',
    title: 'Instructor Profile',
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
            avatar: 'Artboard 1',
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
        resolveImage: function (avatar) {
            return require(`@/assets/avatars/${avatar}.png`);
        },
        editProfile: function () {
            bus.$emit('inst-profile-visible', true);
        },
        getDetails: function () {
            const instructorID = this.$store.getters.userID;
            axios({
                url: `/api/instructors/${instructorID}/profile`,
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
                    this.avatar = resp.data.avatar;
                    this.spinning = false;
                    this.loading = false;
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
    },
    created() {
        bus.$on('inst-profile-updated', (val) => {
            if (val) {
                this.getDetails();
            }
        });
    },
    mounted() {
        this.getDetails();
    },
};
</script>
