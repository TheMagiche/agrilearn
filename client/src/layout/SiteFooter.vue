<template>
  <footer class="footer has-cards">
    <div class="container">
      <div class="row row-grid align-items-center my-md">
        <div class="col-lg-6">
          <h3 class="text-green mb-2 font-weight-light display-3 footer-heading">Come join us!</h3>
          <h4 class="mb-0 font-weight-light footer-subheading">Learn today, Enjoy tommorow</h4>
        </div>
        <div class="col-lg-6 text-lg-center btn-wrapper"></div>
      </div>
      <hr />
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{year}}
            <a class="text-white" href="#" target="_blank" rel="noopener">AgriSkul</a>
          </div>
        </div>
        <div class="col-md-6"></div>
      </div>
    </div>
  </footer>
</template>

<style>
</style>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
