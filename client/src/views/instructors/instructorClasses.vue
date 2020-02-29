<template>
    <div id="instructorClasses">
        <section class="section section-large">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="container pt-lg-5">
                        <h3 class="title-heading">Classes</h3>
                        <div v-for="item in classes" :key="item._id" class="example-2 Classcard">
                            <div
                                class="wrapper"
                                :style="{ backgroundImage: `url(${item.imgUrl})` }"
                            >
                                <div class="header">
                                    <!-- <div class="date">
                                        <span class="day">1</span>
                                        <span class="month">March</span>
                                        <span class="year">2020</span>
                                    </div>-->
                                    <ul class="menu-content">
                                        <li>
                                            <a href="#" class="fa fa-bookmark-o"></a>
                                        </li>
                                        <li>
                                            <a href="#" class="fa fa-heart-o">
                                                <span>18</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="fa fa-comment-o">
                                                <span>3</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="data">
                                    <div class="content">
                                        <span class="author">By: {{ item.instructor.username }}</span>
                                        <h1 class="title">
                                            <a href="#">{{ item.title | capitalize }}</a>
                                        </h1>
                                        <p class="text" v-html="Texttrim(item.description)"></p>
                                        <a @click="viewClass(item._id)" class="button">Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
.title-heading {
    text-align: right;
    padding-right: 1em;
    margin-bottom: 1em;
    text-transform: uppercase;
    font-size: 16px;
}
.Classcard {
    float: left;
    padding: 0 1.7rem;
    width: 40%;
}
@media screen and (min-width: 480px) {
    .Classcard {
        width: 80%;
    }
}
@media screen and (min-width: 767px) {
    .Classcard {
        width: 70%;
    }
}
@media screen and (min-width: 959px) {
    .Classcard {
        width: 50%;
    }
}
.Classcard .menu-content {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
.Classcard .menu-content::before,
.Classcard .menu-content::after {
    content: '';
    display: table;
}
.Classcard .menu-content::after {
    clear: both;
}
.Classcard .menu-content li {
    display: inline-block;
}
.Classcard .menu-content a {
    color: #fff;
}
.Classcard .menu-content span {
    position: absolute;
    left: 50%;
    top: 0;
    font-size: 10px;
    font-weight: 700;
    font-family: 'Open Sans';
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
}
.Classcard .wrapper {
    background-color: #fff;
    min-height: 540px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.2);
}
.Classcard .wrapper:hover .data {
    -webkit-transform: translateY(0);
    transform: translateY(0);
}
.Classcard .data {
    position: absolute;
    bottom: 0;
    width: 100%;
    -webkit-transform: translateY(calc(70px + 1em));
    transform: translateY(calc(70px + 1em));
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
}
.Classcard .data .content {
    padding: 1em;
    position: relative;
    z-index: 1;
}
.Classcard .author {
    font-size: 12px;
}
.Classcard .title {
    margin-top: 10px;
}
.Classcard .text {
    height: 70px;
    margin: 0;
}
.Classcard input[type='checkbox'] {
    display: none;
}
.Classcard input[type='checkbox']:checked + .menu-content {
    -webkit-transform: translateY(-60px);
    transform: translateY(-60px);
}
.example-2 .wrapper {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.example-2 .wrapper:hover .menu-content span {
    -webkit-transform: translate(-50%, -10px);
    transform: translate(-50%, -10px);
    opacity: 1;
}
.example-2 .header {
    color: #fff;
    padding: 1em;
}
.example-2 .header::before,
.example-2 .header::after {
    content: '';
    display: table;
}
.example-2 .header::after {
    clear: both;
}
.example-2 .header .date {
    float: left;
    font-size: 12px;
}
.example-2 .menu-content {
    float: right;
}
.example-2 .menu-content li {
    margin: 0 5px;
    position: relative;
}
.example-2 .menu-content span {
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    opacity: 0;
}
.example-2 .data {
    color: #fff;
    -webkit-transform: translateY(calc(70px + 4em));
    transform: translateY(calc(70px + 4em));
}
.example-2 .title a {
    color: #fff;
}
.example-2 .button {
    display: block;
    width: 100px;
    margin: 2em auto 1em;
    text-align: center;
    font-size: 12px;
    color: #fff;
    line-height: 1;
    position: relative;
    font-weight: 700;
}
.example-2 .button::after {
    content: '\2192';
    opacity: 0;
    position: absolute;
    right: 0;
    top: 50%;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
.example-2 .button:hover::after {
    -webkit-transform: translate(5px, -50%);
    transform: translate(5px, -50%);
    opacity: 1;
}
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            classes: null,
        };
    },
    computed: {},
    filters: {
        capitalize: function(value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
        trim: function(value) {
            if (!value) return '';
            value = value.toString();
            return value.slice(0, 100);
        },
    },
    methods: {
        Texttrim: function(value) {
            if (!value) return '';
            value = value.toString();
            return value.slice(0, 100);
        },
        getClasses: function() {
            const userID = this.$store.getters.userID;
            axios({
                url: `/api/instructors/classes/${userID}`,
                method: 'GET',
            })
                .then(resp => {
                    // eslint-disable-next-line no-console
                    // console.log(resp.data.classes);
                    this.classes = resp.data.classes;
                    // eslint-disable-next-line no-console
                    // console.log(this.classes);
                })
                .catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        },
        viewClass: function(val) {
            this.$router
                .push({
                    name: 'classDetail',
                    params: { id: val },
                })
                .then()
                .catch(err => {
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
