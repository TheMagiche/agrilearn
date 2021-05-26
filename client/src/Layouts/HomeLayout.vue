<template>
    <div>
        <div class="social-tabs">
            <ul>
                <li class="social-item">
                    <a class="\" href="https://www.instagram.com/agriskul/" target="_blank" rel="noopener">
                        <a-icon slot="icon" type="instagram" />
                    </a>
                </li>
                <li class="social-item">
                    <a class="\" href="https://twitter.com/@agriskul" target="_blank" rel="noopener">
                        <a-icon slot="icon" type="twitter" />
                    </a>
                </li>
                <li class="social-item">
                    <a class="\" hhref="https://facebook.com/Agriskul-E-Learning-107826230930848/" target="_blank" rel="noopener">
                        <a-icon slot="icon" type="facebook" />
                    </a>
                </li>
                <li class="social-item">
                    <a class="\" ref="https://youtube.com/channel/UC_Wdbx9QwsdmW3H78vPf7Gw" target="_blank" rel="noopener">
                        <a-icon slot="icon" type="youtube" />
                    </a>
                </li>
            </ul>
        </div>
        <header>
            <!-- We want header content here -->
            <Navbar></Navbar>
        </header>
        <main>
            <!-- We want main content here -->
            <slot name="content"></slot>
        </main>
        <footer>
            <!-- We want footer content here -->
            <Footer></Footer>
        </footer>
    </div>
</template>

<style>
.social-tabs{
    position: fixed;
    left: 2%;
    bottom: 0%;
    width: auto;
    height: auto;
    z-index: 5;
    background: #30A679;
}
.social-tabs ul{
    display: flex;
    list-style: none;
    margin: 0;
    padding: 2px;
}
.social-tabs i {
    margin: .3em;
    font-size: 24px;
    color: #fff;
}
header{
    padding: 1px;
}
main {
    padding: 0;
    margin: 0;
    min-height: 70vh;
}
footer{
    padding: 1em;
}
</style>

<script>
import Navbar from '@/components/home-layout/navbar.vue';
import Footer from '@/components/home-layout/footer.vue';
export default {
    name: 'HomeLayout',
    components: {
        Navbar,
        Footer,
    },
};
</script>
