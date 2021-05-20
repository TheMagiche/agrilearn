<template>
    <div>
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
