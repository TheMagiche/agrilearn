<template>
    <HomeLayout>
        <template v-slot:content>
            <div>This is the password reset page</div>
            <a-form-model ref="ruleForm" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                <a-form-model-item label="New Password">
                    <a-input-password v-model.trim="form.password" placeholder="Must be atleast 6 characters" autocomplete="off" />
                    <span v-if="submitted && !$v.form.password.required">Required field</span>
                    <span v-if="!$v.form.password.minLength">Password must be at least 6 characters</span>
                    <span v-if="!$v.form.password.maxLength">password too long</span>
                </a-form-model-item>
                <a-form-model-item label="Confirm Password">
                    <a-input-password placeholder="Same as above" v-model.trim="form.confirm_password" autocomplete="off" />
                    <span v-if="submitted && !$v.form.confirm_password.required">Required field</span>
                    <span v-if="!$v.form.confirm_password.sameAsPassword">Passwords must match</span>
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" html-type="submit" block> Submit </a-button>
                </a-form-model-item>
            </a-form-model>
        </template>
    </HomeLayout>
</template>
<style scoped>
.ant-form-item-control {
    line-height: 23px;
}
span {
    display: inline;
    margin: 0px;
    padding: 0px;
    color: red;
}
</style>
<script>
// @ is an alias to /src
import HomeLayout from '@/Layouts/HomeLayout.vue';
import axios from 'axios';
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';
export default {
    name: 'PasswordReset',
    title: 'Password Reset',
    components: {
        HomeLayout,
    },
    data() {
        return {
            formLayout: 'horizontal',
            submitted: false,
            form: {
                password: '',
                confirm_password: '',
            },
        };
    },
    validations: {
        form: { confirm_password: { required, sameAsPassword: sameAs('password') }, password: { required, minLength: minLength(6), maxLength: maxLength(13) } },
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.submitted = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            const token = this.$route.params.token;
            axios({
                url: `/api/users/reset/${token}`,
                method: 'POST',
                data: {
                    password: this.password,
                },
            })
                .then((res) => {
                    if (res.data.success == false) {
                        this.$notification['error']({
                            message: 'Password Reset Unsuccessful',
                            description: `${res.data.msg}`,
                        });
                        this.$refs.ruleForm.resetFields();
                    } else {
                        this.$notification['success']({
                            message: 'Password Reset Successful',
                            description: `${res.data.msg}`,
                        });
                        this.$refs.ruleForm.resetFields();
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        checkToken: function () {
            const token = this.$route.params.token;
            axios({
                url: `/api/users/reset/${token}`,
                method: 'GET',
            })
                .then((res) => {
                    if (res.data.success == false) {
                        this.$notification['error']({
                            message: 'Password Reset Token unverified',
                            description: `${res.data.msg}`,
                        });
                    } else {
                        this.$notification['success']({
                            message: 'Password Reset Token verified',
                            description: `${res.data.msg}`,
                        });
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    this.$notification['error']({
                        message: 'Password Reset Token unverified',
                        description: `${err}`,
                    });
                });
        },
    },
    mounted() {
        this.checkToken();
    },
};
</script>
