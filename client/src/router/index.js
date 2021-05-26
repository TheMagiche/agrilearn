import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '../store/index';

Vue.use(VueRouter);

import Home from '../views/Home.vue';
import About from '../views/About.vue';

// user pages
import Login from '../views/users/Login.vue';
import Register from '../views/users/Register.vue';

// student pages
import StudentClasses from '../views/student/StudentClasses.vue';
import StudentProfile from '../views/student/StudentProfile.vue';

// instructor pages
import InstructorClasses from '../views/instructor/InstructorClasses.vue';
import InstructorProfile from '../views/instructor/InstructorProfile.vue';

// class pages
import ClassDetail from '../views/classes/ClassDetail.vue';
import ClassIndex from '../views/classes/ClassIndex.vue';

// lesson pages
import LessonDetail from '../views/lessons/LessonDetail.vue';

const routes = [
    // HomeLayout Pages
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/signup',
        name: 'Register',
        component: Register,
    },
    {
        path: '/signin',
        name: 'Login',
        component: Login,
    },
    {
        path: '/verify/:token',
        name: 'Verification',
        // route level code-splitting
        // this generates a separate chunk (VerificationPage.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "VerificationPage" */ '../views/users/VerificationPage.vue'),
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        // route level code-splitting
        // this generates a separate chunk (ForgotPassword.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "ForgotPassword" */ '../views/users/ForgotPassword.vue'),
    },
    {
        path: '/reset/:token',
        name: 'PasswordReset',
        // route level code-splitting
        // this generates a separate chunk (PasswordReset.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "PasswordReset" */ '../views/users/PasswordReset.vue'),
 
    },
    {
        path: '*',
        name: '404',
        // route level code-splitting
        // this generates a separate chunk (404.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
    },
    
    // DashboardLayout Pages
    {
        path: '/student/classes/',
        name: 'StudentClasses',
        component: StudentClasses,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/classes',
        name: 'ClassIndex',
        component: ClassIndex,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/student/profile/',
        name: 'StudentProfile',
        component: StudentProfile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/instructor/classes/',
        name: 'InstructorClasses',
        component: InstructorClasses,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/instructor/profile/',
        name: 'InstructorProfile',
        component: InstructorProfile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/classes/:id',
        name: 'ClassDetail',
        component: ClassDetail,
        props: true,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/lesson/:id',
        name: 'LessonDetail',
        component: LessonDetail,
        props: true,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    },
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (Store.getters.isLoggedIn) {
            next();
            return;
        }
        router.push('/signup')
    } else {
        next();
    }
});

export default router;
