<template>
    <HomeLayout>
        <template v-slot:content>
            <div class="form-container">
                <a-card title="Recover Account" class="formCard">
                    <a-row type="flex" align="middle" class="form-content">
                        <a-col :span="18" :lg="18" :md="18" :sm="24" :xs="24">
                            <a-form-model ref="ruleForm" :model="form" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" @submit="handleSubmit">
                                <a-form-model-item label="Email used on sign up">
                                    <a-input placeholder="someone@gmail.com" allow-clear v-model.trim="form.email">
                                        <!-- <a-icon slot="prefix" type="user" /> -->
                                        <a-tooltip slot="suffix" title="Gmail preferably">
                                            <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
                                        </a-tooltip>
                                    </a-input>
                                    <span v-if="submitted && !$v.form.email.required">Required field</span>
                                    <span v-if="!$v.form.email.email">Email is invalid</span>
                                </a-form-model-item>
                                <a-form-model-item>
                                    <a-button type="primary" html-type="submit" block> Proceed </a-button>
                                </a-form-model-item>
                            </a-form-model>
                        </a-col>
                        <a-col :span="6" :lg="6" :md="6" :sm="24" :xs="24" class="imgContainer">
                            <img :src="require('@/assets/images/leaf.png')" alt="leafimg" />
                        </a-col>
                    </a-row>
                </a-card>
            </div>
        </template>
    </HomeLayout>
</template>
<style scoped>
.form-container {
    padding: 6em;
}
.formCard {
    text-align: center;
}
.ant-form-item-control {
    line-height: 23px;
}
.formCard img {
    height: 9em;
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
import { required, email, maxLength } from 'vuelidate/lib/validators';
import axios from 'axios';
export default {
    name: 'ForgotPassword',
    title: 'Forgot Password',
    components: {
        HomeLayout,
    },
    data() {
        return {
            formLayout: 'horizontal',
            submitted: false,
            form: {
                email: '',
            },
        };
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

            axios({
                url: '/api/users/reset-password',
                method: 'POST',
                data: {
                    email: this.form.email,
                },
            })
                .then((res) => {
                    if (res.data.success == true) {
                        this.$notification['success']({
                            message: 'Successful',
                            description: `${res.data.msg}`,
                        });
                        this.$refs.ruleForm.resetFields();
                    } else {
                        this.$notification['error']({
                            message: 'Error',
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
    },
    validations: {
        form: {
            email: { required, email, maxLength: maxLength(100) },
        },
    },
};
</script>
