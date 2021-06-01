<template>
    <a-drawer title="Edit lesson" width="80%" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
        <a-form-model ref="LessonForm" :model="form" layout="vertical" @submit="onSubmit">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-model-item label="Lesson Title">
                        <a-input placeholder="Please enter lesson title" v-model.trim="form.title" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="Lesson Number">
                        <a-input placeholder="Please enter lesson number" v-model.trim="form.number" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-model-item label="Lesson Content">
                        <Editor
                            v-model="form.description"
                            apiKey="qg2ya1j13asut4kogk3ih9iaxwm76ah12w4b0fjfhm1gxtx5"
                            :init="{
                                height: 500,
                                plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],
                                toolbar: 'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
                            }"
                        ></Editor>
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
import axios from 'axios';
import Editor from '@tinymce/tinymce-vue';

export default {
    name: 'LessonModal',
    components: {
        Editor,
    },
    data() {
        return {
            pro: false,
            form: {
                title: '',
                description: '',
                number: '',
            },
            submitted: false,
            visible: false,
        };
    },
    methods: {
        onClose() {
            this.visible = false;
        },
         onSubmit: async function (e) {
            const lessonID = this.$route.params.id;
            await axios({
                url: `/api/lessons/update/${lessonID}`,
                data: {
                    title: this.form.title,
                    body: this.form.description,
                    number: this.form.number,
                },
                method: 'PUT',
            })
                .then((res) => {
                     if (res.data.success == false) {
                        this.$notification['error']({
                            message: 'Error',
                            description: `${res.data.msg}`,
                        });
                    } else {
                        this.$notification['success']({
                            message: 'Lesson edit',
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
        handleChange(value) {
            if (value === 'free') {
                this.pro = false;
            }
            this.pro = true;
        },
        getLesson: function () {
            const lessonID = this.$route.params.id;
            axios({
                url: `/api/lessons/details/${lessonID}`,
                method: 'GET',
            })
                .then((resp) => {
                    // eslint-disable-next-line no-console
                    this.lessonID = resp.data.lesson._id;
                    this.form.title = resp.data.lesson.title;
                    this.form.description = resp.data.lesson.body;
                    this.form.number = resp.data.lesson.number.toLowerCase();
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
    },
    created() {
        bus.$on('editLesson-visible', (val) => {
            this.visible = val;
        });
    },
    mounted() {
        this.getLesson();
    },
};
</script>
