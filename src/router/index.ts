import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
];

const tokenIsExpired = (token: number) => {
  const expirationDate = new Date(token * 1000);
  const currentDate = new Date();
  if(expirationDate < currentDate) {
    return true;
  }
  return false;
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const expiration = store.getters['userStore/getExpiration'];
  const user = store.getters['userStore/getUser'];
  if(!user || tokenIsExpired(expiration) && to.meta.requiresAuth) {
    store.dispatch("clearUser");
    router.push('/login');
  };
  if(user && !tokenIsExpired(expiration) && to.name === 'login') {
    router.push('/');
  }
  next();
});

export default router
