<template>
    <div id="app">
        
        <router-view />
        <a-back-top />
    </div>
</template>
<style>
html,
body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #fdfdfd;
    overflow-x: hidden;
    scroll-behavior: smooth;
    box-sizing: border-box;
}
iframe {
    width: 100% !important;
    height: 100% !important;
}
::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

</style>

<script>
export default {
    name: 'app',
    components: {},
    metaInfo: {
        title: 'AgriSkul',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                name: 'keywords',
                content:
                    'Learn farming in kenya, Improve your farming skills, Agriskul, Farming in kenya, Digital learning, Online farming courses, Creative farming techniques, Farming in kenya, Tutorials, Start agriculture in kenya, Start farming today, Poultry in kenya, Startup',
            },
            { name: 'agriskul', content: 'agriskul.co.ke' },
            {
                name: 'description',
                content: 'Learn to grow your agribusiness in kenya. Find the perfect tutorial to get started on your farming today, learn the latest trends and stay ahead of the curve',
            },
            { name: 'http-equiv=X-UA-Compatible', content: 'IE=edge' },
            { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        ],
    },
};
</script>

<style></style>
