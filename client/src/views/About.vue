<template>
  <HomeLayout>
      <template v-slot:content>
          <div>This is the about page</div>
      </template>
  </HomeLayout>
</template>

<script>
// @ is an alias to /src
import HomeLayout from '@/Layouts/HomeLayout.vue';

export default {
  name: 'About',
  title: 'About',
  components: {
    HomeLayout,
  },
};
</script>
