<template>
    <a-drawer title="Contact us for any inquries" width="80%" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
        <a-form-model ref="contactForm" :model="form" layout="vertical" @submit="onSubmit">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-model-item label="Your Name">
                        <a-input placeholder="Please enter name" v-model.trim="form.name" />
                        <span v-if="submitted && !$v.form.name.required">Required field</span>
                        <span v-if="!$v.form.name.maxLength">invalid name too long</span>
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="Your Email">
                        <a-input placeholder="Please enter email" v-model.trim="form.email" />
                        <span v-if="submitted && !$v.form.email.required">Required field</span>
                        <span v-if="submitted && !$v.form.email.email">Invalid email</span>
                        <span v-if="!$v.form.name.maxLength">invalid email, too long</span>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-model-item label="Message">
                        <a-textarea :rows="14" placeholder="please enter your message" v-model.trim="form.message" />
                        <span v-if="submitted && !$v.form.message.required">Required field</span>
                        <span v-if="!$v.form.message.maxLength">Message too short</span>
                        <span v-if="!$v.form.message.maxLength">Message too long</span>
                    </a-form-model-item>
                </a-col>
            </a-row>
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
                <a-button type="primary" html-type="submit"> Submit </a-button>
            </div>
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
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
    name: 'ContactModal',
    data() {
        return {
            form: {
                name: '',
                email: '',
                message: '',
            },
            submitted: false,
            visible: false,
        };
    },
    validations: {
        form: {
            name: { required, maxLength: maxLength(40) },
            email: { required, email, maxLength: maxLength(60) },
            message: { required, minLength: minLength(6), maxLength: maxLength(1500) },
        },
    },
    methods: {
        onClose() {
            this.visible = false;
        },
        onSubmit(e) {
            e.preventDefault();
            // stop here if form is invalid
            this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            axios({
                url: '/api/users/message',
                method: 'POST',
                data: {
                    name: this.name,
                    email: this.email,
                    emailmessage: this.message,
                },
            })
                .then((res) => {
                    if (res.data.success == false) {
                        this.$notification['error']({
                            message: 'Error',
                            description: `${res.data.msg}`,
                        });
                        this.$refs.contactForm.resetFields();
                    } else {
                        this.$notification['success']({
                            message: 'Message Sent',
                            description: `${res.data.msg}`,
                        });
                        this.$refs.contactForm.resetFields();
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
        bus.$on('contact-visible', (val) => {
            this.visible = val;
        });
    },
};
</script>
