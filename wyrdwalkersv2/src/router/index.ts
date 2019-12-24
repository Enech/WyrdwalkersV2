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
    redirect: "/home/presentation",
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
      },
      {
        path: 'rpg-history',
        name: 'historiqueJdr',
        component: () => import('../views/accueil/menus/HistoriqueJdr.vue')
      },
      {
        path: 'activities',
        name: 'activites',
        component: () => import('../views/accueil/menus/Activites.vue')
      },
      {
        path: 'workshops',
        name: 'ateliers',
        component: () => import('../views/accueil/menus/Ateliers.vue')
      },
      {
        path: 'association-history',
        name: 'assoHistory',
        component: () => import('../views/accueil/menus/AssoHistorique.vue')
      },
      {
        path: 'personality-test',
        name: 'personalityTest',
        component: () => import('../views/accueil/menus/PersonalityTest.vue')
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
