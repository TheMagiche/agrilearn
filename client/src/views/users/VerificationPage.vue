<template>
    <HomeLayout>
        <template v-slot:content>
            <div>Account Verification</div>
            <div class="text-center">
                <img :src="require('@/assets/images/leaf.png')" alt="leafimg" />
            </div>
            <p v-if="success">
                Proceed to
                <router-link to="/login">Login Page</router-link>
            </p>
            <p v-if="!success">Account unverified, Token expired. Contact agriskul@gmail.com</p>
        </template>
    </HomeLayout>
</template>

<script>
// @ is an alias to /src
import HomeLayout from '@/Layouts/HomeLayout.vue';
import axios from 'axios';
export default {
    name: 'Verification',
    title: 'Verification',
    components: {
        HomeLayout,
    },
    data() {
        return {
            success: false,
        };
    },
    methods: {
        verifyUser: function () {
            const token = this.$route.params.token;
            axios({
                url: `/api/users/verify/${token}`,
                method: 'GET',
            })
                .then((res) => {
                    if (res.data.success == false) {
                        this.success = false;
                        this.$notification['error']({
                            message: 'Verification Unsuccessful',
                            description: `${res.data.msg}`,
                        });
                    } else {
                        this.success = true;
                        this.$notification['success']({
                            message: 'Verification Successful',
                            description: `${res.data.msg}`,
                        });
                    }
                })
                .catch((err) => {
                    this.$notification['error']({
                        message: 'Verification Unsuccessful',
                        description: `${err}`,
                    });
                });
        },
    },

    mounted() {
        this.verifyUser();
    },
};
</script>
