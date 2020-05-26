<template>
  <div id="Page404">
    <section class="section section-lg">
      <div class="container text-center justify-content-center">
        <div class="imgContainer">
          <img :src="require('@/assets/images/lost.png')" height="15em" alt="instructorimg"/>
        </div> 
        <h1>404 Not Found</h1>
        <p>
          Oops, can't find what your looking for
          <router-link :to="{name: 'home'}">go home instead</router-link>
        </p>
      </div>
    </section>
    
  </div>
</template>

<script>
export default {};
</script>
