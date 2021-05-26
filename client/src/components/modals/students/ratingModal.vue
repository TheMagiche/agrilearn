<template>
    <a-modal title="Rate class" :visible="visible" :confirm-loading="confirmLoading" @ok="onSubmit" @cancel="onClose">
        <a-form-model ref="ratingForm" :model="form" layout="vertical">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-model-item label="Class Rating">
                        <star-rating v-bind:increment="0.5" v-bind:max-rating="5" inactive-color="#dddddd" active-color="#20e434" v-bind:star-size="20" v-model="form.rate"></star-rating>
                        <span v-if="submitted && !$v.form.rate.required">Required field</span>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-model-item label="comment">
                        <a-textarea :rows="3" placeholder="please enter your comment" v-model.trim="form.comment" />
                        <span v-if="submitted && !$v.form.comment.required">Required field</span>
                        <span v-if="!$v.form.comment.minLength">comment too short</span>
                        <span v-if="!$v.form.comment.maxLength">comment too long</span>
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
    </a-modal>
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
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
    name: 'ContactModal',
    data() {
        return {
            form: {
                rate: 0,
                comment: '',
            },
            submitted: false,
            visible: false,
            confirmLoading: false,
        };
    },
    validations: {
        form: {
            rate: { required },
            comment: { required, maxLength: maxLength(50), minLength: minLength(5) },
        },
    },
    methods: {
        onClose() {
            this.visible = false;
        },
        onSubmit(e) {
            e.preventDefault();

            this.submitted = true;
            this.confirmLoading = true;
            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            const classID = this.$route.params.id;
            const userID = this.$store.getters.userID;
            axios({
                url: `/api/students/${userID}/class/${classID}/rate`,
                method: 'POST',
                data: {
                    rate: this.form.rate,
                    comment: this.form.comment,
                },
            })
                .then((res) => {
                    if (res.data.success == false) {
                        this.$notification['error']({
                            message: 'Something went wrong',
                            description: `${res.data.msg}`,
                        });

                        this.confirmLoading = false;
                        this.visible = false;
                    } else {
                        this.$notification['success']({
                            message: 'Added your review',
                            description: `${res.data.msg}`,
                        });
                        this.confirmLoading = false;
                        this.visible = false;
                        bus.$emit('added-rating',true);
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
    },
    created() {
        bus.$on('rating-visible', (val) => {
            this.visible = val;
        });
    },
};
</script>
