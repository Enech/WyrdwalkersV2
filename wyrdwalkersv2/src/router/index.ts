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
  },
  {
    path: '/wiki',
    name: 'wiki',
    redirect: "/wiki/home",
    component: () => import('../views/wiki/Wiki.vue'),
    children: [
      {
        path: 'home',
        name: 'wikiHome',
        component: () => import('../views/wiki/menus/Home.vue')
      },
      {
        path: 'lore/:pagename',
        name: 'wikiLore',
        component: () => import('../views/wiki/menus/WikiLore.vue')
      },
      {
        path: 'gameplay/rules',
        name: 'rules',
        component: () => import('../views/wiki/menus/Regles.vue')
      },
      {
        path: 'gameplay/legendary-abilities',
        name: 'abilities',
        component: () => import('../views/wiki/menus/Pouvoirs.vue')
      },
      {
        path: 'timelines',
        name: 'timelines',
        component: () => import('../views/wiki/menus/Chronologies.vue')
      }
    ]
  },
  {
    path: '/player',
    name: 'playerArea',
    component: () => import('../views/espace-joueur/PlayerArea.vue')
  },
  {
    path: '/game-master',
    name: 'GMArea',
    component: () => import('../views/espace-mj/GameMasterArea.vue')
  },
  {
    path: '/philosophy',
    name: 'philo',
    component: () => import('../views/philosophie/Philosophie.vue')
  }
];

const mode = 'history';

const router = new VueRouter({
  routes,
  mode
})

export default router
