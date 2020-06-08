<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main id="main">
      <notifications group="forms" />
      <notifications group="logins" position="top left" />
      <notifications group="classes" position="bottom right" />
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
      <go-top :size="size" :bg-color="backgroundColor" :max-width="maxWidth" :has-outline="false"></go-top>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
import GoTop from '@inotom/vue-go-top';
export default {
  components: {
    FadeTransition,
    GoTop
  },
  data() {
    return {
      size: 50,
      backgroundColor: '#20e434',
      maxWidth: 400
    };
  },
  metaInfo: {
    title: 'AgriSkul',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'keywords',
        content:
          'Learn farming in kenya, Improve your farming skills, Agriskul, Farming in kenya, Digital learning, Online farming courses, Creative farming techniques, Farming in kenya, Tutorials, Start agriculture in kenya, Start farming today, Poultry in kenya, Startup'
      },
      { name: 'agriskul', content: 'agriskul.co.ke' },
      {
        name: 'description',
        content:
          'Learn to grow your agribusiness in kenya. Find the perfect tutorial to get started on your farming today, learn the latest trends and stay ahead of the curve'
      },
      { name: 'http-equiv=X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' }
    ]
  }
};
</script>

<style>
#main {
  min-height: 100vh !important;
}
</style>