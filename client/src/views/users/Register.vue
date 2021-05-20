<template>
    <HomeLayout>
        <template v-slot:content>
            <div class="form-container">
                <a-card title="WELCOME TO AGRISKUL" class="formCard">
                    <a-row type="flex" align="middle" class="form-content">
                        <a-col :span="18">
                            <a-form-model class="regform" ref="ruleForm" :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" @submit="handleSubmit">
                                <a-form-model-item label="Username">
                                    <a-input placeholder="John1232 or Mary1232" allow-clear v-model.trim="form.username">
                                        <!-- <a-icon slot="prefix" type="user" /> -->
                                        <a-tooltip slot="suffix" title="Unique">
                                            <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
                                        </a-tooltip>
                                    </a-input>
                                    <span v-if="submitted && !$v.form.username.required">Required field</span>
                                    <span v-if="!$v.form.username.maxLength">Username is too long</span>
                                </a-form-model-item>
                                <a-form-model-item label="First name">
                                    <a-input placeholder="John or Mary" allow-clear v-model.trim="form.fname">
                                        <!-- <a-icon slot="prefix" type="user" /> -->
                                        <a-tooltip slot="suffix" title="Extra information">
                                            <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
                                        </a-tooltip>
                                    </a-input>
                                    <span v-if="submitted && !$v.form.fname.required">Required field</span>
                                    <span v-if="!$v.form.fname.maxLength">Name is too long</span>
                                </a-form-model-item>
                                <a-form-model-item label="Last name">
                                    <a-input placeholder="Doe" allow-clear v-model.trim="form.lname">
                                        <!-- <a-icon slot="prefix" type="user" /> -->
                                        <a-tooltip slot="suffix" title="Extra information">
                                            <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
                                        </a-tooltip>
                                    </a-input>
                                    <span v-if="submitted && !$v.form.lname.required">Required field</span>
                                    <span v-if="!$v.form.lname.maxLength">name is too long</span>
                                </a-form-model-item>
                                <a-form-model-item label="Email">
                                    <a-input placeholder="someone@gmail.com" allow-clear v-model.trim="form.email">
                                        <!-- <a-icon slot="prefix" type="user" /> -->
                                        <a-tooltip slot="suffix" title="Gmail preferably">
                                            <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
                                        </a-tooltip>
                                    </a-input>
                                    <span v-if="submitted && !$v.form.email.required">Required field</span>
                                    <span v-if="!$v.form.email.email">Email is invalid</span>
                                </a-form-model-item>
                                <a-form-model-item label="Phone">
                                    <a-input placeholder="+254700222000" allow-clear v-model.trim="form.phone">
                                        <!-- <a-icon slot="prefix" type="user" /> -->
                                        <a-tooltip slot="suffix" title="Add relevant phone number">
                                            <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
                                        </a-tooltip>
                                    </a-input>
                                    <span v-if="submitted && !$v.form.phone.required">Required field</span>
                                    <span v-if="!$v.form.phone.minLength">Enter correct phone number</span>
                                    <span v-if="!$v.form.phone.maxLength">Enter correct phone number</span>
                                </a-form-model-item>
                                <a-form-model-item label="Password">
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
                                <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">
                                    <a-button type="primary" html-type="submit" block> Submit </a-button>
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
import { required, email, minLength, sameAs, maxLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
    name: 'Register',
    title: 'Signup',
    components: {
        HomeLayout,
    },
    data() {
        return {
            formLayout: 'horizontal',
            submitted: false,
            form: {
                username: '',
                fname: '',
                lname: '',
                email: '',
                phone: '',
                password: '',
                confirm_password: '',
            },
            type: 'student',
        };
    },
    validations: {
        form: {
            username: { required, maxLength: maxLength(25) },
            fname: { required, maxLength: maxLength(25) },
            lname: { required, maxLength: maxLength(25) },
            email: { required, email, maxLength: maxLength(100) },
            phone: {
                required,
                minLength: minLength(13),
                maxLength: maxLength(13),
            },
            password: { required, minLength: minLength(6), maxLength: maxLength(13) },
            confirm_password: { required, sameAsPassword: sameAs('password') },
        },
    },
    methods: {
        ...mapActions(['register']),
        handleSubmit(e) {
            e.preventDefault();
            // stop here if form is invalid
            this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            let user = {
                fname: this.form.fname,
                lname: this.form.lname,
                email: this.form.email,
                username: this.form.username,
                password: this.form.password,
                password2: this.form.confirm_password,
                type: this.type,
                phone: this.form.phone,
            };
            this.register(user).then((res) => {
                if (res.data.success == true) {
                    this.$notification['success']({
                        message: 'Registation Successful',
                        description: `${res.data.msg}`,
                    });
                    this.$router.push('/signin');
                    this.$refs.ruleForm.resetFields();
                } else if (res.data.success == false) {
                    this.$notification['error']({
                        message: 'Registation Unsuccessful',
                        description: `${res.data.msg}`,
                    });
                    this.$refs.ruleForm.resetFields();
                }
            });
            this.error = false;
        },
    },
};
</script>
