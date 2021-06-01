<template>
    <div class="text-center">
        <div class="social-tabs">
            <ul>
                <li class="social-item">
                    <a href="https://www.instagram.com/agriskul/" target="_blank" rel="noopener">
                        <a-icon slot="icon" type="instagram" />
                    </a>
                </li>
                <li class="social-item">
                    <a href="https://twitter.com/@agriskul" target="_blank" rel="noopener">
                        <a-icon slot="icon" type="twitter" />
                    </a>
                </li>
                <li class="social-item">
                    <a href="https://facebook.com/Agriskul-E-Learning-107826230930848/" target="_blank" rel="noopener">
                        <a-icon slot="icon" type="facebook" />
                    </a>
                </li>
                <li class="social-item">
                    <a href="https://youtube.com/channel/UC_Wdbx9QwsdmW3H78vPf7Gw" target="_blank" rel="noopener">
                        <a-icon slot="icon" type="youtube" />
                    </a>
                </li>
            </ul>
        </div>
        <div>&copy; 2020 - {{ year }} Agriskul. Made by <a href="https://github.com/TheMagiche">@themagiche</a></div>
    </div>
</template>

<style>
.social-tabs {
    padding: .5em;
}
.social-tabs ul {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 2px;
}
.social-tabs i {
    margin: 0.3em;
    font-size: 24px;
    color: #30a679;
}
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
