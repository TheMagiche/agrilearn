<template>
    <div id="siteLogin">
        <section class="section section-lg">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <div class="container pt-lg-5">
                            <div class="form-container">
                                <div class="text-center text-white mb-4">
                                    <small class="smallTxt">Welcome to Agrilearn</small>
                                </div>
                                <form role="form">
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
                                    <div class="text-center">
                                        <base-button
                                            class="my-4 btn-success"
                                            type="success"
                                            @click="logSub"
                                        >Login</base-button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
.green {
    background: #20e434;
}
.smallTxt {
    text-transform: uppercase;
}
.btn-green {
    background: #20e434;
}
</style>

<script>
import { mapActions } from 'vuex';
export default {
    data: function() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        ...mapActions(['login']),
        logSub: function(evt) {
            evt.preventDefault();

            let user = {
                username: this.username,
                password: this.password,
            };

            this.login(user)
                .then(res => {
                    if (res.data.success) {
                        this.$router.push('/');
                    }
                })
                .catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
    },
};
</script>
