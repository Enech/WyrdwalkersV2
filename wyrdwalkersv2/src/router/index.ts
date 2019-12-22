import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home/presentation'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/accueil/Accueil.vue'),
    children: [
      {
        path: 'presentation',
        name: 'presentation',
        component: () => import('../views/accueil/menus/Presentation.vue'),
      },
      {
        path: 'join',
        name: 'join',
        component: () => import('../views/accueil/menus/Join.vue')
      },
      {
        path: 'status',
        name: 'status',
        component: () => import('../views/accueil/menus/Status.vue')
      },
      {
        path: 'murder-parties',
        name: 'murderParties',
        component: () => import('../views/accueil/menus/MurderParties.vue')
      }
    ]
  }
];

const mode = 'history';

const router = new VueRouter({
  routes,
  mode
})

export default router
