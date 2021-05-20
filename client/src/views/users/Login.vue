<template>
    <HomeLayout>
        <template v-slot:content>
            <div class="form-container">
                <a-card title="LOG IN TO CONTINUE" class="formCard">
                    <a-row type="flex" align="middle" class="form-content">
                        <a-col :span="18">
                            <a-form-model ref="ruleForm" :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" @submit="handleSubmit">
                                <a-form-model-item label="Username or email">
                                    <a-input placeholder="John1232 or someone@gmail.com" v-model.trim="form.detail">
                                        <!-- <a-icon slot="prefix" type="user" /> -->
                                        <a-tooltip slot="suffix" title="Username or email">
                                            <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
                                        </a-tooltip>
                                    </a-input>
                                    <span v-if="submitted && !$v.form.detail.required">Required field</span>
                                    <span v-if="!$v.form.detail.maxLength">invalid data</span>
                                </a-form-model-item>

                                <a-form-model-item label="Password">
                                    <a-input-password v-model.trim="form.password" placeholder="Must be atleast 6 characters" autocomplete="off" />
                                    <span v-if="!$v.form.password.minLength">Password must be at least 6 characters</span>
                                    <span v-if="!$v.form.password.maxLength">Password is too long</span>
                                </a-form-model-item>
                                <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                                    <a-button type="primary" html-type="submit"> Submit </a-button>
                                    <a-button class="forgotPass" @click="forgotPass" type="dashed"> Forgot Password </a-button>
                                </a-form-model-item>
                            </a-form-model>
                        </a-col>
                        <a-col :span="6" class="imgContainer">
                            <img :src="require('@/assets/images/leaf.png')" alt="leafimg" />
                        </a-col>
                    </a-row>
                </a-card>
            </div>
        </template>
    </HomeLayout>
</template>
<style scoped>
.forgotPass {
    margin-left: 2px;
}
.ant-form-item-control {
    line-height: 23px;
}
span {
    display: inline;
    margin: 0px;
    padding: 0px;
    color: red;
}
.form-container {
    padding: 6em;
}
.formCard {
    text-align: center;
}
.formCard img {
    height: 9em;
}
</style>
<script>
// @ is an alias to /src
import HomeLayout from '@/Layouts/HomeLayout.vue';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    title: 'Signin',
    components: {
        HomeLayout,
    },
    data() {
        return {
            formLayout: 'horizontal',
            submitted: false,
            form: {
                detail: '',
                password: '',
            },
        };
    },
    validations: {
        form: {
            detail: { required, maxLength: maxLength(30) },
            password: { required, minLength: minLength(6), maxLength: maxLength(13) },
        },
    },
    methods: {
        ...mapActions(['login']),
        handleSubmit(e) {
            e.preventDefault();
            // stop here if form is invalid
            this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            let user = {
                detail: this.form.detail,
                password: this.form.password,
            };
            this.login(user).then((res) => {
                if (res.data.success == true) {
                    this.$notification['success']({
                        message: 'Login Successful',
                        description: `${res.data.msg}`,
                    });
                    this.$refs.ruleForm.resetFields();
                    const type = localStorage.getItem('type');
                    if (type == 'student') {
                        this.$router.push('/student/classes/');
                    } else {
                        this.$router.push('/instructor/classes/');
                    }
                } else if (res.data.success == false) {
                    this.$notification['error']({
                        message: 'Login Unsuccessful',
                        description: `${res.data.msg}`,
                    });
                    this.$refs.ruleForm.resetFields();
                }
            });
            this.error = false;
        },
        forgotPass() {
            this.$router.push('/forgot-password');
        },
    },
};
</script>
