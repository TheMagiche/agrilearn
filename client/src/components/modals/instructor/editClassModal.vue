<template>
    <a-drawer title="Edit class" :width="900" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
        <a-form-model ref="classForm" :model="form" layout="vertical" @submit="onSubmit">
            <a-row :gutter="16">
                <a-col :span="20">
                    <a-form-model-item label="Class Title">
                        <a-input placeholder="Please enter class title" v-model.trim="form.title" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="4">
                    <a-form-model-item label="Free | Pro">
                        <a-select :default-value="isPro" @change="handleChange">
                            <a-select-option value="free"> Free </a-select-option>
                            <a-select-option value="pro"> Pro </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="20">
                    <a-form-model-item label="Image url (use pexels.com *)">
                        <a-input placeholder="Please enter image url" v-model.trim="form.imageUrl" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="4">
                    <a-form-model-item label="Study Time">
                        <a-input placeholder="10 minute" v-model.trim="form.estTime" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-model-item label="Class Content">
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
    name: 'EditClassModal',
    components: {
        Editor,
    },
    data() {
        return {
            pro: false,
            form: {
                title: '',
                description: '',
                imageUrl: '',
                estTime: '',
            },
            submitted: false,
            visible: false,
        };
    },
    computed: {
        isPro: function () {
            if (this.pro) {
                return 'Pro';
            }
            return 'Free';
        },
    },
    methods: {
        onClose() {
            this.visible = false;
        },
        getClass: function () {
            const classID = this.$route.params.id;
            axios({
                url: `/api/classes/details/${classID}`,
                method: 'GET',
            })
                .then((resp) => {
                    this.classID = resp.data.class._id;
                    this.form.title = resp.data.class.title;
                    this.form.description = resp.data.class.description;
                    this.form.imageUrl = resp.data.class.imgUrl;
                    this.pro = resp.data.class.pro;
                    this.form.estTime = resp.data.class.readTime;
                    // eslint-disable-next-line no-console
                    // console.log(this.classLessons);
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        onSubmit: async () => {
            const classID = this.$route.params.id;
            await axios({
                url: `/api/classes/${classID}/update`,
                data: {
                    title: this.form.title,
                    imgUrl: this.form.imageUrl,
                    description: this.form.description,
                    pro: this.pro,
                    readTime: this.form.estTime ,
                },
                method: 'PUT',
            })
                .then(() => {
                    this.$router.push({
                        name: 'instructorClasses',
                    });
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
    },
    created() {
        bus.$on('editClass-visible', (val) => {
            this.visible = val;
        });
    },
    mounted() {
        this.getClass();
    },
};
</script>
