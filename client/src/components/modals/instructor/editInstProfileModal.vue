<template>
    <a-drawer title="Edit Profile" width="80%" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
        <a-form-model ref="profileIDForm" :model="form" layout="vertical" @submit="updateDetails">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-model-item label="Your username">
                        <a-input placeholder="Please enter username" v-model.trim="form.username" />
                        <span v-if="submitted && !$v.form.username.required">Required field</span>
                        <span v-if="!$v.form.username.maxLength">Username is too long</span>
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="Your avatar">
                        <a-select @change="handleChange">
                            <a-icon slot="suffixIcon" type="smile" />
                            <a-select-option v-for="item in avatars" :key="item" :value="item"> <img class="selImage" :src="resolveImage(item)" :alt="item" /> </a-select-option>
                        </a-select>
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
                <a-col :span="12">
                    <a-form-model-item label="Your email">
                        <a-input placeholder="Please enter email" v-model.trim="form.email" />
                        <span v-if="submitted && !$v.form.email.required">Required field</span>
                        <span v-if="!$v.form.email.email">Email is invalid</span>
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
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
        <a-form-model ref="profileIPForm" :model="formP" layout="vertical" @submit="updatePassword">
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
.selImage {
    height: 60px;
    width: 60px;
}
</style>
<script>
import { bus } from '@/event-bus';
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
    name: 'InstProfileModal',
    data() {
        return {
            form: {
                username: '',
                fname: '',
                lname: '',
                email: '',
                avatar: '',
                phone: '',
            },
            formP: {
                password: '',
                confirm_password: '',
            },
            submitted: false,
            submittedP: false,
            visible: false,
            avatars: [
                'Artboard 1',
                'Artboard 2',
                'Artboard 3',
                'Artboard 4',
                'Artboard 5',
                'Artboard 6',
                'Artboard 7',
                'Artboard 8',
                'Artboard 9',
                'Artboard 10',
                'Artboard 11',
                'Artboard 12',
                'Artboard 13',
                'Artboard 14',
                'Artboard 15',
                'Artboard 16',
                'Artboard 17',
                'Artboard 18',
                'Artboard 19',
                'Artboard 20',
                'Artboard 21',
                'Artboard 22',
                'Artboard 23',
                'Artboard 24',
                'Artboard 25',
                'Artboard 26',
                'Artboard 27',
                'Artboard 30_1',
                'Artboard 29',
                'Artboard 30',
                'Artboard 31',
                'Artboard 33_1',
                'Artboard 33',
                'Artboard 34',
                'Artboard 36_1',
                'Artboard 36',
                'Artboard 37',
                'Artboard 38',
                'Artboard 39',
                'Artboard 40',
                'Artboard 41',
                'Artboard 45_1',
                'Artboard 43',
                'Artboard 44',
                'Artboard 45',
                'Artboard 47_1',
                'Artboard 47',
                'Artboard 48',
                'Artboard 50',
                'Artboard 52',
                'Artboard 53',
                'Artboard 54',
                'Artboard 54_1',
                'Artboard 55',
                'Artboard 56',
                'Artboard 57',
                'Artboard 59_1',
                'Artboard 59',
            ],
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
        resolveImage: function (avatar) {
            if (typeof avatar == 'string') {
                return require(`@/assets/avatars/${avatar}.png`);
            } else {
                return require(`@/assets/avatars/Artboard 1.png`);
            }
        },
        handleChange(value) {
            this.form.avatar = value;
        },
        onClose() {
            this.visible = false;
        },
        getDetails: function () {
            const instructorID = this.$store.getters.userID;
            axios({
                url: `/api/instructors/${instructorID}/profile`,
                method: 'GET',
            })
                .then((resp) => {
                    this.form.username = resp.data.username;
                    this.form.email = resp.data.email;
                    this.form.phone = resp.data.phoneNumber;
                    this.form.fname = resp.data.first_name;
                    this.form.lname = resp.data.last_name;
                    this.form.avatar = resp.data.avatar;
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        ...mapActions(['profile']),
        updateDetails: function (e) {
            e.preventDefault();
            // stop here if form is invalid
            this.submitted = true;
            this.$v.form.$touch();
            if (this.$v.form.$invalid) {
                return;
            }
            let user = {
                prev_username: this.$store.getters.username,
                username: this.form.username,
                email: this.form.email,
                avatar: this.form.avatar,
                first_name: this.form.fname,
                last_name: this.form.lname,
                phone: this.form.phone,
                userID: this.$store.getters.userID,
            };
            this.profile(user)
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
                        bus.$emit('inst-profile-updated', true);
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
        bus.$on('inst-profile-visible', (val) => {
            this.visible = val;
        });
    },
    mounted() {
        this.getDetails();
    },
};
</script>
