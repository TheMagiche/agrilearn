<template>
    <HomeLayout>
        <template v-slot:content>
            <div class="showcase">
                <a-row type="flex" align="top" :gutter="[16, 16]">
                    <a-col :span="14" :lg="14" :md="24" :sm="24" :xs="24">
                        <div class="flexbox">
                            <img class="siteLogo" :src="require('@/assets/logo.png')" alt="logo" />

                            <h1>Learn to grow your agribusiness</h1>
                            <p>Find the perfect tutorials to get you started on your farming today, learn the latest trends and stay ahead of the curve</p>
                        </div>

                        <a-row class="testimonial">
                            <a-col v-for="item in testimonials" :key="item.id" :lg="6" :md="6" :sm="6" :xs="6">
                                <a-tooltip placement="right">
                                    <template slot="title">
                                        <strong>{{ item.name }} </strong>
                                        <br />
                                        {{ item.testimonial }}
                                    </template>
                                    <a-avatar :size="70" :src="item.img" />
                                </a-tooltip>
                            </a-col>
                        </a-row>
                        <a-row class="partners">
                            <p style="margin-bottom: '5px'"><em>in partnership with</em></p>
                            <a-col v-for="item in partners" :key="item.id" :lg="6" :md="6" :sm="6" :xs="6">
                                <a-tooltip placement="right">
                                    <template slot="title">
                                        <strong>{{ item.name }} </strong>
                                    </template>
                                    <a-avatar :size="60" :src="item.img" />
                                </a-tooltip>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="10" :lg="10" :md="24" :sm="24" :xs="24">
                        <a-timeline mode="alternate">
                            <a-timeline-item>
                                <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px" />
                                <a-card title="REGISTER" class="step-card-right">
                                    <p>Create an account using your details.</p>
                                </a-card>
                            </a-timeline-item>
                            <a-timeline-item>
                                <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px" />
                                <a-card title="LEARN" class="step-card-left">
                                    <p>Gain knowledge from our large collection of videos and articles from experienced instructors</p>
                                </a-card>
                            </a-timeline-item>
                            <a-timeline-item>
                                <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px" />
                                <a-card title="GROW" class="step-card-right">
                                    <p>Put your knowledge to use on your business and watch it grow.</p>
                                </a-card>
                            </a-timeline-item>
                        </a-timeline>
                    </a-col>
                </a-row>
            </div>
            <div class="clsSection">
                <div class="center-heading">
                    <img :src="require('@/assets/images/leaf.png')" alt="leafimg" />
                    <h2>Learn by Doing</h2>
                    <p>Practice makes perfect, start today!</p>
                </div>
                <a-row :gutter="[16, 16]">
                    <a-col v-for="item in classes" :key="item._id" :span="8" :lg="8" :md="12" :sm="24" :xs="24">
                        <a-card hoverable class="homeCard">
                            <img slot="cover" class="classImg" alt="example" :src="item.imgUrl" />
                            <div class="rating">
                                <a-row>
                                    <a-col :span="18"> <star-rating v-bind:increment="0.5" v-bind:star-size="20" v-model="item.rating" :read-only="true"></star-rating> </a-col>
                                    <a-col :span="6"
                                        ><div class="clsStatus">
                                            {{ classStatus(item.pro) }}
                                        </div></a-col
                                    >
                                </a-row>
                            </div>
                            <template slot="actions" class="ant-card-actions">
                                <a-button type="dashed" icon="ellipsis" @click="viewClass(item._id)">view</a-button>
                            </template>
                            <a-row>
                                <a-col :span="4">
                                    <a-tooltip :title="item.instructor.username">
                                        <a-avatar class="avatarI" :src="resolveImage(item.instructor.avatar)" />
                                    </a-tooltip>
                                </a-col>
                                <a-col :span="20">
                                    <span
                                        ><strong>{{ item.title }}</strong></span
                                    >
                                    <br />
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
        </template>
    </HomeLayout>
</template>
<style scoped>
.avatarI {
    background: #ddd;
    padding: 2px;
}
.clsStatus {
    padding: 0.1em 0.5em;
    text-align: center;
    color: white;
    background: burlywood;
}
.showcase {
    padding: 1.5em;
}
.clsSection {
    padding: 2em 6em;
    text-align: center;
    background: rgb(226, 226, 226);
}
.homeCard {
    width: 100%;
    margin: 1em auto;
    text-align: left;
}
.center-heading img {
    height: 6em;
}
.center-heading h2 {
    text-transform: capitalize;
    font-size: 2em;
    font-weight: bold;
}
.rating {
    margin-bottom: 10px;
}
.classImg {
    height: 20em;
}
.step-card-left {
    width: 250px;
    top: 25px;
    left: 5px;
}
.step-card-right {
    width: 250px;
    top: 25px;
    left: 15px;
}
.flexbox {
    padding-top: 3em;
}
.flexbox h1 {
    font-size: 2.5em;
    text-transform: capitalize;
    font-weight: bolder;
}
.testimonial,
.partners {
    padding-top: 2em;
}
.testimonial span,
.partners span {
    margin-right: 10px;
}
img.siteLogo {
    width: 14em;
    height: 100%;
}
.showcase {
    background-image: url('~@/assets/images/bg.png'), url('~@/assets/images/bg-fruits.png');
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: contain;
}
</style>
<script>
import axios from 'axios';

// @ is an alias to /src
import HomeLayout from '@/Layouts/HomeLayout.vue';
import showcasebg from '@/assets/images/showcaseImg.png';
import fredimg from '@/assets/images/profile/fred.jpg';
import vincentimg from '@/assets/images/profile/vincent.jpg';
import claireimg from '@/assets/images/profile/claire.jpg';
import obadiahimg from '@/assets/images/profile/obadiah.jpg';
import agriplanimg from '@/assets/images/partners/agriplan.png';

export default {
    name: 'Home',
    title: 'Home',
    components: {
        HomeLayout,
    },
    data() {
        return {
            loading: true,
            classes: null,
            showcasebg: showcasebg,
            partners: [
                {
                    id: 1,
                    name: 'Agriplan',
                    img: agriplanimg,
                },
            ],
            testimonials: [
                {
                    id: 1,
                    name: 'Fred Ongwenya',
                    testimonial: "It's really amazing to browse Agriskul, pick a free course, register for it and learn from your phone. Every farmer should use Agriskul as their virtual guide and refer for anything",
                    img: fredimg,
                },
                {
                    id: 2,
                    name: 'Vincent Ngatia',
                    testimonial: 'Agriskul has very practical knowledge that any new farmer can follow while starting a farming venture. For me, their poultry feeding programs was  recommended by my vet. Agriskul will always be my e-learning of choice',
                    img: vincentimg,
                },
                {
                    id: 3,
                    name: 'Obadiah Bunyi',
                    testimonial: 'Have you been searching for a premium learning site for knowledge to boost your way of farming? Agriskul is a top rated site that covers all edges in farming, from poultry farming to fish farming',
                    img: obadiahimg,
                },
                {
                    id: 4,
                    name: 'Claire Onyinkwa',
                    testimonial: 'Are you looking for a free online course whose technical classes are just explained in simple english you can understand? Look no further, Agriskul has resourceful courses that equip you with the right farming knowledge',
                    img: claireimg,
                },
            ],
        };
    },
    methods: {
        resolveImage: function (avatar) {
            if (typeof avatar == 'string') {
                return require(`@/assets/avatars/${avatar}.png`);
            } else {
                return require(`@/assets/avatars/Artboard 1.png`);
            }
            
        },
        classStatus: (val) => {
            if (!val) {
                return 'Free';
            }
            return 'Pro';
        },
        getClasses: function () {
            axios({
                url: '/api/classes/',
                method: 'GET',
            })
                .then((resp) => {
                    this.classes = resp.data.classes;
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        viewClass: function (val) {
            this.$router
                .push({
                    name: 'ClassDetail',
                    params: { id: val },
                })
                .then()
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
    },
    mounted() {
        this.getClasses();
    },
};
</script>
