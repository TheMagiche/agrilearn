<template>
  <HomeLayout>
      <template v-slot:content>
          <div>This is the 404 page</div>
      </template>
  </HomeLayout>
</template>

<script>
// @ is an alias to /src
import HomeLayout from '@/Layouts/HomeLayout.vue';

export default {
  name: 'Home',
  title: 'Home',
  components: {
    HomeLayout,
  },
};
</script>
