<template>
    <div class="text-center">&copy; 2020 - {{ year }} Agriskul. Made by <a href="https://github.com/TheMagiche">@themagiche</a></div>
</template>

<style>
.text-center {
    text-align: center;
}
</style>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            year: new Date().getFullYear(),
        };
    },
};
</script>
