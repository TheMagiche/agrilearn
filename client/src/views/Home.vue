<template>
  <div class="home">
    <section class="section section-lg mt--98">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="container pt-lg-5">
              <h2 class="headings display-3">Learn to grow your</h2>
              <h2 class="headings display-3">agribusiness</h2>

              <p class="subheading">
                Find the perfect tutorial to get started on your farming today,
                learn the latest trends and stay ahead of the curve
              </p>
              <base-button
                tag="a"
                href="#"
                class="mb-3 mb-sm-0 btn-green"
                type="success"
              >Join the community</base-button>
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
            <div>
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
            <div class="pt-xs-3">
              <b-card title="STEP 2" sub-title="LEARN">
                <b-card-text class="sub-text">
                  Gain knowledge from our large cllection of videos and articles from
                  experienced instructors
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
                <b-card-text
                  class="sub-text"
                >Put your knowledge to use on your business and watch it grow.</b-card-text>
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
          <p
            class="white-section-text pt-3"
          >Agrilearn aims to revolutionise the teaching and training of the Agri - Sciences by providing access to information in a blended learning environment, which combines online digital media with traditional classroom methods and experiential learning through practical sessions, with an element of student control over time, place and pace in an online learning environment.</p>
        </div>
      </div>
      <div class="container mt-2">
        <div class="row justify-content-center">
          <base-button tag="a" href="#" class="mb-3 mb-sm-0 btn-white">SCHEDULE A CALL WITH US</base-button>
        </div>
      </div>
    </section>
    <section class="section section-lg">
      <div class="container">
        <div>
          <h3 class="display-4 pl-3 headings">Our Courses</h3>
          <div class="underline"></div>
        </div>

        <div class="container pt-3">
          <div class="container pt-2">
            <div class="row justify-content-center">
              <div class="col-lg-4">
                <div>
                  <b-card
                    title
                    sub-title
                    img-src="https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    img-alt
                    img-top
                  >
                    <b-card-text>Poulty Farming</b-card-text>
                  </b-card>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="pt-xs-3">
                  <b-card
                    title
                    sub-title
                    img-src="https://images.pexels.com/photos/231062/pexels-photo-231062.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    img-alt
                    img-top
                  >
                    <b-card-text>Animal Husbandry</b-card-text>
                  </b-card>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mt-xs-3">
                  <b-card
                    title
                    sub-title
                    img-src="https://images.pexels.com/photos/3307282/pexels-photo-3307282.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    img-alt
                    img-top
                  >
                    <b-card-text>Harvest & Storage</b-card-text>
                  </b-card>
                </div>
              </div>
            </div>
            <div class="row justify-content-center pt-lg-3">
              <div class="col-lg-4">
                <div>
                  <b-card
                    title
                    sub-title
                    img-src="https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    img-alt
                    img-top
                  >
                    <b-card-text>Crop Growing</b-card-text>
                  </b-card>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="pt-xs-3">
                  <b-card
                    title
                    sub-title
                    img-src="https://images.pexels.com/photos/1508666/pexels-photo-1508666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    img-alt
                    img-top
                  >
                    <b-card-text>Food Marketing</b-card-text>
                  </b-card>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mt-xs-3">
                  <b-card
                    title
                    sub-title
                    img-src="https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    img-alt
                    img-top
                  >
                    <b-card-text>Produce Delivery</b-card-text>
                  </b-card>
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
</style>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {}
};
</script>
