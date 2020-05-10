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
        <div class="col-xs-12 col-md-6">
          <div class="copyright">
            &copy; {{year}}
            <a class="text-white" href="#" target="_blank" rel="noopener">AgriSkul</a>
          </div>
        </div>
        <div class="col-xs-12 mt-2 col-md-6 text-center">
          <ul class="nav nav-footer justify-content-center">
            <li class="nav-item footer-links">
              <a
                href="https://www.youtube.com/channel/UC_Wdbx9QwsdmW3H78vPf7Gw"
                class="nav-link"
                target="_blank"
              >Youtube</a>
            </li>
            <li class="nav-item">
              <a href="https://twitter.com/@agriskul" class="nav-link" target="_blank">Twitter</a>
            </li>
            <li class="nav-item footer-links">
              <a
                href="https://www.facebook.com/agriskul.learning"
                class="nav-link"
                target="_blank"
              >Facebook</a>
            </li>
            <li class="nav-item footer-links">
              <a
                href="https://www.instagram.com/agriskullearning/"
                class="nav-link"
                target="_blank"
              >Instagram</a>
            </li>
          </ul>
        </div>
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
