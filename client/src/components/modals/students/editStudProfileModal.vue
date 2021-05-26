<template>
    <a-drawer title="Edit Profile" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
        <a-form-model ref="profileForm" :model="form" layout="vertical" @submit="updateDetails">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-model-item label="Your username">
                        <a-input placeholder="Please enter username" v-model.trim="form.username" />
                        <span v-if="submitted && !$v.form.username.required">Required field</span>
                        <span v-if="!$v.form.username.maxLength">Username is too long</span>
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="Your email">
                        <a-input placeholder="Please enter email" v-model.trim="form.email" />
                        <span v-if="submitted && !$v.form.email.required">Required field</span>
                        <span v-if="!$v.form.email.email">Email is invalid</span>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-model-item label="Your first name">
                        <a-input placeholder="Please enter first name" v-model.trim="form.fname" />
                        <span v-if="submitted && !$v.form.fname.required">Required field</span>
                        <span v-if="!$v.form.fname.maxLength">Name is too long</span>
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="Your last name">
                        <a-input placeholder="Please enter last name" v-model.trim="form.lname" />
                        <span v-if="submitted && !$v.form.lname.required">Required field</span>
                        <span v-if="!$v.form.lname.maxLength">name is too long</span>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="Your phone">
                        <a-input placeholder="+254---------" v-model.trim="form.phone" />
                        <span v-if="submitted && !$v.form.phone.required">Required field</span>
                        <span v-if="!$v.form.phone.minLength">Enter correct phone number</span>
                        <span v-if="!$v.form.phone.maxLength">Enter correct phone number</span>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-button type="primary" html-type="submit"> Update Profile </a-button>
            <div
                :style="{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                    zIndex: 1,
                }"
            >
                <a-button :style="{ marginRight: '8px' }" @click="onClose"> Cancel </a-button>
            </div>
        </a-form-model>
        <br />
        <a-form-model :model="formP" layout="vertical" @submit="updatePassword">
            <p>Password is updated seperately from other details *</p>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-model-item label="Password">
                        <a-input-password v-model.trim="formP.password" placeholder="Must be atleast 6 characters" autocomplete="off" />
                        <span v-if="submittedP && !$v.formP.password.required">Required field</span>
                        <span v-if="!$v.formP.password.minLength">Password must be at least 6 characters</span>
                        <span v-if="!$v.formP.password.maxLength">password too long</span>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="Confirm Password">
                        <a-input-password placeholder="Same as above" v-model.trim="formP.confirm_password" autocomplete="off" />
                        <span v-if="submittedP && !$v.formP.confirm_password.required">Required field</span>
                        <span v-if="!$v.formP.confirm_password.sameAsPassword">Passwords must match</span>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-button type="primary" html-type="submit"> Update Password </a-button>
        </a-form-model>
    </a-drawer>
</template>
<style scoped>
span {
    display: inline;
    margin: 0px;
    padding: 0px;
    color: red;
}
</style>
<script>
import { bus } from '@/event-bus';
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
    name: 'InstProfileModal',
    data() {
        return {
            form: {
                username: '',
                fname: '',
                lname: '',
                email: '',
                phone: '',
            },
            formP: {
                password: '',
                confirm_password: '',
            },
            submitted: false,
            submittedP: false,
            visible: false,
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
        },
        formP: {
            password: { required, minLength: minLength(6), maxLength: maxLength(13) },
            confirm_password: { required, sameAsPassword: sameAs('password') },
        },
    },
    methods: {
        onClose() {
            this.visible = false;
        },
        getDetails: function () {
            const studID = this.$store.getters.userID;
            axios({
                url: `/api/students/${studID}/profile`,
                method: 'GET',
            })
                .then((resp) => {
                    this.form.username = resp.data.username;
                    this.form.email = resp.data.email;
                    this.form.phone = resp.data.phoneNumber;
                    this.form.fname = resp.data.first_name;
                    this.form.lname = resp.data.last_name;
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        updateDetails: function (e) {
            e.preventDefault();
            // stop here if form is invalid
            this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            // eslint-disable-next-line no-console
            console.log('getting update');
            axios({
                url: '/api/students/profile/update',
                data: {
                    username: this.form.username,
                    email: this.form.email,
                    phone: this.form.phone,
                    first_name: this.form.fname,
                    last_name: this.form.lname,
                },
                method: 'POST',
            })
                .then((res) => {
                    if (res.data.success == false) {
                        this.$notification['error']({
                            message: 'Error',
                            description: `${res.data.msg}`,
                        });
                    } else {
                        this.$notification['success']({
                            message: 'Success',
                            description: `${res.data.msg}`,
                        });
                        this.visible = false;
                        bus.$emit('stud-profile-updated', true);
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        updatePassword: function (e) {
            e.preventDefault();
            // stop here if form is invalid
            this.submittedP = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            axios({
                url: '/api/users/password/update',
                method: 'POST',
                data: {
                    username: this.$store.getters.username,
                    password: this.formP.password,
                },
            })
                .then((res) => {
                    if (res.data.success == false) {
                        this.$notification['error']({
                            message: 'Error',
                            description: `${res.data.msg}`,
                        });
                    } else {
                        this.$notification['success']({
                            message: 'Password Changed',
                            description: `${res.data.msg}`,
                        });
                        this.visible = false;
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
    },
    created() {
        bus.$on('stud-profile-visible', (val) => {
            this.visible = val;
        });
    },
    mounted() {
        this.getDetails();
    },
};
</script>
