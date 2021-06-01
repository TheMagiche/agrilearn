<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model="collapsed" theme="light" :style="{ overflow: 'auto', minHeight: '100vh' }" :trigger="null" collapsible>
            <div class="logo">
                <router-link to="/"><img class="dashLogo" :src="require('@/assets/icon.png')" alt="logo" /></router-link>
            </div>
            
            <div class="text-center">
                <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
                    <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
                </a-button>
            </div>

            <SideBar></SideBar>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <!-- We want header content here -->

                <Navbar></Navbar>
            </a-layout-header>

            <a-layout-content class="main">
                <!-- We want main content here -->
                <slot name="dashboard-content"></slot>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                <!-- We want footer content here -->
                <Footer></Footer>
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<style>
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em;
}
img.dashLogo {
    height: 60px;
    width: 25px;
}
.main {
    padding: 1em;
}
.text-center{
    text-align: center;    
}
</style>

<script>
import SideBar from '@/components/dashboard-layout/sidebar.vue';
import Footer from '@/components/dashboard-layout/footer.vue';
import Navbar from '@/components/dashboard-layout/navbar.vue';
export default {
    name: 'DashBoardLayout',
    components: {
        SideBar,
        Footer,
        Navbar,
    },
    data() {
        return {
            collapsed: true,
        };
    },
    methods: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
        },
    },
};
</script>
