<template>
  <footer class="footer has-cards">
    <div class="container">
      <div class="row row-grid align-items-center my-md">
        <div class="col-lg-6">
          <h3 class="text-green font-weight-light mb-2">Come join us!</h3>
          <h4 class="mb-0 font-weight-light">Learn today, Enjoy tommorow</h4>
        </div>
        <div class="col-lg-6 text-lg-center btn-wrapper"></div>
      </div>
      <hr />
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{year}}
            <a class="text-white" href="#" target="_blank" rel="noopener">AgriLearn</a>
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <a href="#" class="nav-link" target="_blank" rel="noopener">Agrilearn</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" target="_blank" rel="noopener">
                About
                Us
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" target="_blank" rel="noopener">Blog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" target="_blank" rel="noopener">Become an Instructor</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
.footer.has-cards::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 600px;
  height: 2000px;
  background: #2DCE89 !important;
  -webkit-transform: skew(0, -8deg);
  transform: skew(0, -8deg);
}
.footer .nav .nav-item .nav-link,
.footer .footer-link {
  color: #ffffff !important;
}
.text-green {
  color: #2DCE89;
}
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
