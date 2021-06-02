<template>
    <HomeLayout>
        <template v-slot:content>
            <div id="Page404">
                <div class="container text-center justify-content-center">
                    <div class="imgContainer">
                        <img :src="require('@/assets/images/lost.png')" height="300px" alt="lostimg" />
                    </div>
                    <h1>404 Not Found</h1>
                    <p>
                        Oops, can't find what your looking for
                        <router-link :to="{ name: 'Home' }">go home instead</router-link>
                    </p>
                </div>
            </div>
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
