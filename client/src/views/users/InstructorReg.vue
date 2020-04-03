<template>
    <div id="InstructorRegister">
        <section class="section section-lg mb-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="container">
                            <div class="form-container">
                                <div class="text-center text-white mb-4">
                                    <small class="smallTxt">Welcome to Agrilearn</small>
                                </div>
                                <form role="form">
                                    <div class="fields">
                                        <h3 class="title-subheading">First Name</h3>
                                        <base-input
                                            alternative
                                            class="mb-3"
                                            placeholder="First Name"
                                            v-model.trim="first_name"
                                        ></base-input>
                                    </div>
                                    <div class="fields">
                                        <h3 class="title-subheading">Last Name</h3>
                                        <base-input
                                            alternative
                                            class="mb-3"
                                            placeholder="Last Name"
                                            v-model.trim="last_name"
                                        ></base-input>
                                    </div>
                                    <div class="fields">
                                        <h3 class="title-subheading">Email</h3>
                                        <base-input
                                            alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            v-model.trim="email"
                                        ></base-input>
                                    </div>
                                    <div class="fields">
                                        <h3 class="title-subheading">Username</h3>
                                        <base-input
                                            alternative
                                            class="mb-3"
                                            placeholder="Username"
                                            v-model.trim="username"
                                        ></base-input>
                                    </div>
                                    <div class="fields">
                                        <h3 class="title-subheading">Password</h3>
                                        <base-input
                                            alternative
                                            type="password"
                                            placeholder="Password"
                                            v-model.trim="password"
                                        ></base-input>
                                    </div>
                                    <div class="fields">
                                        <h3 class="title-subheading">Confirm Password</h3>
                                        <base-input
                                            alternative
                                            type="password"
                                            placeholder="Confirm Password"
                                            v-model.trim="confirm_password"
                                        ></base-input>
                                    </div>
                                    <div class="text-center">
                                        <base-button
                                            class="my-4 btn-green"
                                            type="success"
                                            @click="regSub"
                                        >Create account</base-button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <img :src="require('@/assets/images/instructor.svg')" class="reg-img" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data: function() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            password2: '',
            type: 'instructor',
        };
    },
    methods: {
        ...mapActions(['register']),
        regSub: function(evt) {
            evt.preventDefault();

            let user = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                username: this.username,
                password: this.password,
                password2: this.password2,
                type: this.type,
            };

            this.register(user).then(res => {
                if (res.data.success) {
                    this.$router.push({ name: 'SiteLogin' });
                }
            });
        },
    },
};
</script>
