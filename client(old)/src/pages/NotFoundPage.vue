<template>
  <div id="Page404">
    <h1>Not Found</h1>
    <p>
      Oops, can't find what your looking for
      <router-link :to="{name: 'Home'}">go home instead</router-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="">
</style>