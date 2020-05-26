import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

import Home from '../views/Home.vue';
import StudentReg from '../views/users/StudentReg';
import InstructorReg from '../views/users/InstructorReg';
import SiteHeader from '../layout/SiteHeader';
import SiteFooter from '../layout/SiteFooter';
import SiteLogin from '../views/users/SiteLogin';
import ForgotPassword from '../views/users/ForgotPassword';
import PasswordReset from '../views/users/PasswordReset';
import VerificationPage from '../views/users/VerificationPage.vue';

import classDetail from '../views/classes/classDetail';
import classIndex from '../views/classes/classIndex';
import classLesson from '../views/classes/classLesson';

import classCreate from '../views/instructors/classCreate';
import classEdit from '../views/instructors/classEdit';
import newLesson from '../views/instructors/newLesson';
import editLesson from '../views/instructors/editLesson';
import instructorClasses from '../views/instructors/instructorClasses';
import instructorProfile from '../views/instructors/instructorProfile';

import studentClasses from '../views/students/studentClasses';
import studentProfile from '../views/students/studentProfile';
import premiumMember from '../views/students/premiumMember';


Vue.use(Router);

const router = new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '*',
      name: 'NotFound',
      component: () =>
        import( /* webpackChunkName: "about" */ '../views/NotFoundPage.vue')
    },
    {
      path: '/verify/:token',
      name: 'verify',
      components: {
        header: SiteHeader,
        default: VerificationPage,
        footer: SiteFooter
      }
    },
    {
      path: '/password-recovery',
      name: 'forgot-password',
      components: {
        header: SiteHeader,
        default: ForgotPassword,
        footer: SiteFooter
      }
    },
    {
      path: '/reset/:token',
      name: 'password-reset',

      components: {
        header: SiteHeader,
        default: PasswordReset,
        footer: SiteFooter
      }
    },
    {
      path: '/',
      name: 'home',
      components: {
        header: SiteHeader,
        default: Home,
        footer: SiteFooter
      }
    },
    {
      path: '/student-register',
      name: 'student-register',
      components: {
        header: SiteHeader,
        default: StudentReg,
        footer: SiteFooter
      }
    },
    {
      path: '/instructor-register',
      name: 'instructor-register',
      components: {
        header: SiteHeader,
        default: InstructorReg,
        footer: SiteFooter
      }
    },
    {
      path: '/signup',
      name: 'SiteLogin',
      components: {
        header: SiteHeader,
        default: SiteLogin,
        footer: SiteFooter
      }
    },

    {
      path: '/classes/',
      name: 'classIndex',
      components: {
        header: SiteHeader,
        default: classIndex,
        footer: SiteFooter
      }
    },
    {
      path: '/classes/details/:id',
      name: 'classDetail',
      components: {
        header: SiteHeader,
        default: classDetail,
        footer: SiteFooter
      },
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/classes/lessons/:id',
      name: 'classLesson',
      components: {
        header: SiteHeader,
        default: classLesson,
        footer: SiteFooter
      },
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/classes/create',
      name: 'classCreate',
      components: {
        header: SiteHeader,
        default: classCreate,
        footer: SiteFooter
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/classes/:id/update',
      name: 'classEdit',
      components: {
        header: SiteHeader,
        default: classEdit,
        footer: SiteFooter
      },
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/instuctor/classes/',
      name: 'instructorClasses',
      components: {
        header: SiteHeader,
        default: instructorClasses,
        footer: SiteFooter
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/instuctor/profile/',
      name: 'instructorProfile',
      components: {
        header: SiteHeader,
        default: instructorProfile,
        footer: SiteFooter
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      // path: "/instuctor/classes/:id/lessons/new",
      path: '/instuctor/classes/:id/lessons/new',
      name: 'newLesson',
      components: {
        header: SiteHeader,
        default: newLesson,
        footer: SiteFooter
      },
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/instuctor/classes/lesson/:id/edit',
      name: 'editLesson',
      components: {
        header: SiteHeader,
        default: editLesson,
        footer: SiteFooter
      },
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/student/classes/',
      name: 'studentClasses',
      components: {
        header: SiteHeader,
        default: studentClasses,
        footer: SiteFooter
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/student/profile/',
      name: 'studentProfile',
      components: {
        header: SiteHeader,
        default: studentProfile,
        footer: SiteFooter
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/premium/:token',
      name: 'premiumMember',

      components: {
        header: SiteHeader,
        default: premiumMember,
        footer: SiteFooter
      }
    },
  ],
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/student-register');
  } else {
    next();
  }
});

export default router;