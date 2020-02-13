<template>
    <div id="InstructorRegister">
        <section class="section section-lg">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
                            <template>
                                <div class="text-center text-muted mb-4">
                                    <small class="smallTxt">Welcome to agrilearn</small>
                                </div>
                                <form role="form">
                                    <base-input alternative class="mb-3" placeholder="First Name" addon-left-icon="ni ni-hat-3" v-model.trim="first_name"></base-input>
                                    <base-input alternative class="mb-3" placeholder="Last Name" addon-left-icon="ni ni-hat-3" v-model.trim="last_name"></base-input>
                                    <base-input alternative class="mb-3" placeholder="Email" addon-left-icon="ni ni-email-83" v-model.trim="email"></base-input>
                                    <base-input alternative class="mb-3" placeholder="Username" addon-left-icon="ni ni-hat-3" v-model.trim="username"></base-input>
                                    <base-input alternative type="password" placeholder="Password" addon-left-icon="ni ni-lock-circle-open" v-model.trim="password"></base-input>
                                    <base-input alternative type="password" placeholder="Confirm Password" addon-left-icon="ni ni-lock-circle-open" v-model.trim="password2"></base-input>
                                    <div class="text-center">
                                        <base-button class="my-4 btn-green" type="success" @click="regSub">Create account</base-button>
                                    </div>
                                </form>
                            </template>
                        </card>
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
