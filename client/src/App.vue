<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main id="main">
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
      maxWidth: 400,
     
    };
  },
};
</script>

<style>
#main {
  min-height: 100vh !important;
}
</style>