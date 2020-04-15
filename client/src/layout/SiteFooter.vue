<template>
    <footer class="footer has-cards">
        <div class="container">
            <div class="row row-grid align-items-center my-md">
                <div class="col-lg-6">
                    <h3
                        class="text-green font-weight-light mb-2 display-3 footer-heading"
                    >Come join us!</h3>
                    <h4 class="mb-0 font-weight-light footer-subheading">Learn today, Enjoy tommorow</h4>
                </div>
                <div class="col-lg-6 text-lg-center btn-wrapper"></div>
            </div>
            <hr />
            <div class="row align-items-center justify-content-md-between">
                <div class="col-md-6">
                    <div class="copyright">
                        &copy; {{year}}
                        <a
                            class="text-white"
                            href="#"
                            target="_blank"
                            rel="noopener"
                        >AgriSkul</a>
                    </div>
                </div>
                <div class="col-md-6"></div>
            </div>
        </div>
    </footer>
</template>

<style>
.footer.has-cards::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 600px;
    height: 2000px;
    background: #20e434 !important;
    -webkit-transform: skew(0, -8deg);
    transform: skew(0, -8deg);
}
.footer .nav .nav-item .nav-link,
.footer .footer-link {
    color: #fff !important;
}
.text-green {
    color: #20e434;
}
.footer-heading {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.footer-subheading {
    font-family: 'Roboto', sans-serif;
}
</style>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear(),
        };
    },
};
</script>
