<template>
  <div class="home">
    <section class="section section-lg mt--98">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="container pt-lg-5">
              <h1 class="headings display-3">Learn to grow your</h1>
              <h1 class="headings display-3">agribusiness</h1>

              <p class="subheading">
                Find the perfect tutorial to get started on your farming today,
                learn the latest trends and stay ahead of the curve
              </p>
              <base-button tag="a" class="mb-3 mb-sm-0 btn-green" type="success">
                <router-link to="student-register">
                  <span class="text-white">Join the community</span>
                </router-link>
              </base-button>
            </div>
          </div>
          <div class="col-lg-6 d-none d-md-none d-lg-block">
            <img :src="require('@/assets/images/showcaseImg.png')" alt="image" height="70%" />
          </div>
        </div>
      </div>
    </section>

    <section class="section section-lg mt--300">
      <div class="container">
        <div class="mb-2">
          <h3 class="display-4 pl-3 headings">How AgriSkul Works</h3>
          <div class="underline"></div>
        </div>
      </div>
      <div class="container pt-2">
        <div class="row justify-content-center">
          <div class="col-lg-4 pt-lg-1">
            <div class="step-box">
              <b-card title="STEP 1" sub-title="REGISTER">
                <b-card-text class="sub-text">Create an account using your details.</b-card-text>
                <span></span>
                <!-- <b-card-text>A second paragraph of text in the card.</b-card-text> -->
                <!-- <a href="#" class="card-link">Card link</a> -->
                <!-- <b-link href="#" class="card-link">GO</b-link> -->
              </b-card>
            </div>
          </div>
          <div class="col-lg-4 pt-lg-4">
            <div class="pt-xs-3 step-box">
              <b-card title="STEP 2" sub-title="LEARN">
                <b-card-text class="sub-text">
                  Gain knowledge from our large cllection of videos and articles
                  from experienced instructors
                </b-card-text>
                <!-- <b-card-text>A second paragraph of text in the card.</b-card-text> -->
                <!-- <a href="#" class="card-link">Card link</a> -->
                <!-- <b-link href="#" class="card-link">GO</b-link> -->
              </b-card>
            </div>
          </div>
          <div class="col-lg-4 pt-lg-5">
            <div class="mt-xs-3">
              <b-card title="STEP 3" sub-title="GROW">
                <b-card-text class="sub-text">
                  Put your knowledge to use on your business and watch it
                  grow.
                </b-card-text>
                <span></span>
                <!-- <b-card-text>A second paragraph of text in the card.</b-card-text> -->
                <!-- <a href="#" class="card-link">Card link</a> -->
                <!-- <b-link href="#" class="card-link">GO</b-link> -->
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-lg section-green">
      <div class="container">
        <div>
          <h3 class="display-4 pl-3 headings-inverse">Approach to learning</h3>
          <div class="underline-inverse"></div>
        </div>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <p class="white-section-text pt-3">
            Agrilearn aims to revolutionise the teaching and training of the
            Agri - Sciences by providing access to information in a blended
            learning environment, which combines online digital media with
            traditional classroom methods and experiential learning through
            practical sessions, with an element of student control over time,
            place and pace in an online learning environment.
          </p>
        </div>
      </div>
      <div class="container mt-2">
        <div class="row justify-content-center">
          <base-button tag="a" class="mb-3 mb-sm-0 btn-white">
            <router-link to="instructor-register">
              <span class="text-back">BECOME AN INSTRUCTOR</span>
            </router-link>
          </base-button>
        </div>
      </div>
    </section>
    <section class="section section-lg">
      <div class="container">
        <div>
          <h3 class="display-4 pl-3 headings">Our Courses</h3>
          <div class="underline"></div>
        </div>

        <div class="pt-3">
          <div class="pt-2">
            <div class="class-carousel owl-carousel owl-theme">
              <div v-for="item in classes" :key="item._id" class="course homeCard">
                <div class="wrapper" :style="{ backgroundImage: `url(${item.imgUrl})` }">
                  <div class="header">
                    <div class="ratings">
                      <span>Class Rating</span>
                      <star-rating
                        v-bind:increment="0.5"
                        v-bind:star-size="20"
                        v-model="item.rating"
                        :read-only="true"
                      ></star-rating>
                    </div>
                  </div>
                  <div class="data2">
                    <div class="content">
                      <span class="author">By: {{ item.instructor.username }}</span>
                      <h1 class="title">
                        <a href="#">{{ item.title }}</a>
                      </h1>
                      <p class="text"></p>

                      <a @click="viewClass(item._id)" class="button">Read more</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-lg">
      <div class="container">
        <div>
          <h3 class="display-4 pl-3 headings">Testimonials</h3>
          <div class="underline"></div>
        </div>

        <div class="pt-3">
          <div class="pt-2">
            <div class="testimonial-carousel owl-carousel owl-theme">
              <div
                class="testimonial-container"
                v-for="testimonial in testimonials"
                :key="testimonial.id"
              >
                <div class="testimonialPic" :style="{ backgroundImage: `url(${testimonial.img})` }"></div>
                <p class="testimonial-text">{{ testimonial.testimonial}}</p>
                <p class="testimonial-name">{{testimonial.name}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="contact" class="section section-lg section-green">
      <div class="container">
        <div>
          <h3 class="display-4 pl-3 headings-inverse">Contact Us</h3>
          <div class="underline-inverse"></div>
        </div>
      </div>
      <div class="container">
        <div class="row justify-content-center"></div>
      </div>
      <div class="container mt-2">
        <div class="row justify-content-center">
          <div class="col-lg-8 mt-5">
            <card shadow body-classes="p-lg-5">
              <base-alert v-if="error" type="danger" :dismissible="true">{{ message }}</base-alert>
              <base-alert v-if="success" type="success" :dismissible="true">{{ message }}</base-alert>
              <h4 class="mb-1">Want to get in touch with us?</h4>
              <p class="mt-0 contact-text">We want to hear from you.</p>

              <div class="home-form">
                <span v-if="submitted && !$v.name.required">Name is required</span>
                <span v-if="!$v.name.maxLength">Too many characters</span>
                <base-input
                  class
                  alternative
                  placeholder="Your name"
                  :class="{
                        'is-invalid': submitted && $v.name.$error
                      }"
                  v-model.trim="name"
                ></base-input>
              </div>

              <div class="home-form">
                <span v-if="submitted && !$v.email.required">Email is required</span>
                <span v-if="!$v.email.maxLength">please enter valid email</span>
                <span v-if="!$v.email.email">Email is invalid</span>
                <base-input
                  alternative
                  placeholder="Email address"
                  :class="{
                        'is-invalid': submitted && $v.email.$error
                      }"
                  v-model.trim="email"
                ></base-input>
              </div>
              <div class="home-form">
                <span v-if="submitted && !$v.emailmessage.required">Name is required</span>
                <span v-if="!$v.emailmessage.minLength">Too short..</span>
                <span v-if="!$v.emailmessage.maxLength">Email message is too long</span>
                <base-input class="mb-4">
                  <textarea
                    class="form-control form-control-alternative"
                    name="name"
                    rows="4"
                    cols="80"
                    :class="{
                        'is-invalid': submitted && $v.emailmessage.$error
                      }"
                    pla
                    placeholder="Type a message..."
                    v-model.trim="emailmessage"
                  ></textarea>
                </base-input>
              </div>

              <div class="text-center">
                <base-button
                  tag="a"
                  href="#"
                  class="mb-3 mb-sm-0 btn-green"
                  type="success"
                  @click="sendEmail"
                >SEND MESSAGE</base-button>
              </div>
            </card>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-lg">
      <div class="container">
        <div>
          <h3 class="display-4 pl-3 headings">Partners</h3>
          <div class="underline"></div>
        </div>

        <div class="pt-3">
          <div class="pt-2">
            <div class="partner-carousel owl-carousel owl-theme">
              <div v-for="company in partners" :key="company.id" class="company-card">
                <div class="company-data" :style="{ backgroundImage: `url(${company.img})` }">
                  <p class="company-name">{{company.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
global.jQuery = require('jquery');
import Vue from 'vue';
var $ = global.jQuery;
window.$ = $;
import axios from 'axios';
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators';

import fredimg from '@/assets/images/profile/fred.jpg';
import vincentimg from '@/assets/images/profile/vincent.jpg';
import claireimg from '@/assets/images/profile/claire.jpg';
import obadiahimg from '@/assets/images/profile/obadiah.jpg';
export default {
  name: 'home',
  data() {
    return {
      name: '',
      sender: '',
      email: '',
      emailmessage: '',
      error: false,
      message: '',
      submitted: false,
      success: false,
      classes: null,
      testimonials: [
        {
          name: 'Fred Ongwenya',
          testimonial:
            "It's really amazing to browse Agriskul,pick a free course,register for it and learn from your phone. Every farmer should use Agriskul as their virtual guide and refer for anything",
          img: fredimg
        },
        {
          name: 'Vincent Ngatia',
          testimonial:
            'Agriskul has very practical knowledge that any new farmer can follow while starting a farming venture.For me,their poultry  feeding  programs was  recommended by my vet. Agriskul will always be my e-learning of choice',
          img: vincentimg
        },
        {
          name: 'Obadiah Bunyi',
          testimonial:
            'Have you been searching for a premium learning site for knowledge to boost your way of farming? Agriskul is a top rated site that covers all edges in farming, from poultry farming to fish farming',
          img: obadiahimg
        },
        {
          name: 'Claire Onyinkwa',
          testimonial:
            'Are you looking for a free online course whose technical classes are just explained in simple English you can understand?Look no further,Agriskul has resourceful courses that equip you with the right farming knowledge',

          img: claireimg
        }
      ],
      partners: [
        {
          img:
            'https://images.pexels.com/photos/2534507/pexels-photo-2534507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          name: 'BambooKenya'
        },
        {
          img:
            'https://images.pexels.com/photos/929137/pexels-photo-929137.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          name: 'Farmers Choice'
        },
        {
          img:
            'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          name: 'Cheese hut'
        }
      ]
    };
  },
  validations: {
    name: { required, maxLength: maxLength(20) },
    email: { required, email, maxLength: maxLength(50) },
    emailmessage: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(1000)
    }
  },
  computed: {
    Texttrim: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.slice(0, 10);
    }
  },
  filters: {
    trim: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.slice(0, 100);
    }
  },
  methods: {
    sendEmail: function(evt) {
      evt.preventDefault();

      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      axios({
        url: '/api/users/message',
        method: 'POST',
        data: {
          name: this.name,
          emai: this.email,
          emailmessage: this.emailmessage
        }
      })
        .then(res => {
          if (res.data.success == false) {
            this.error = true;
            this.message = res.data.msg;
          } else {
            this.success = true;
            this.message = res.data.msg;
            this.name = '';
            this.email = '';
            this.emailmessage = '';
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
    installOwlCarousel: function() {
      if ($(window).width() > 1024) {
        $('.class-carousel').owlCarousel({
          items: 3,
          loop: true,
          autowidth: false,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          responsiveClass: true
        });
        $('.partner-carousel').owlCarousel({
          items: 3,
          loop: true,
          autowidth: true,
          responsiveClass: true
        });
      }
      if ($(window).width() > 600 && $(window).width() < 1024) {
        $('.class-carousel').owlCarousel({
          items: 2,
          loop: true,
          autowidth: false,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          responsiveClass: true
        });
        $('.partner-carousel').owlCarousel({
          items: 2,
          loop: true,
          autowidth: true,
          responsiveClass: true
        });
      }
      if ($(window).width() < 600) {
        $('.class-carousel').owlCarousel({
          items: 1,
          loop: true,
          autowidth: false,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          responsiveClass: true
        });
        $('.partner-carousel').owlCarousel({
          items: 1,
          loop: true,
          autowidth: false,
          responsiveClass: true
        });
      }
    },
    getClasses: function() {
      axios({
        url: '/api/classes/',
        method: 'GET'
      })
        .then(resp => {
          this.classes = resp.data.classes;
          Vue.nextTick(
            function() {
              this.installOwlCarousel();
            }.bind(this)
          );
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
          params: { id: val }
        })
        .then()
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  },
  mounted() {
    this.getClasses();
    $('.testimonial-carousel').owlCarousel({
      items: 1,
      loop: true,
      autowidth: false,
      autoplay: true,
      autoplayTimeout: 8000,
      autoplayHoverPause: true,
      responsiveClass: true
    });
  }
};
</script>

<style scoped>
</style>
