import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home/presentation'
  },
  {
    path: '/register/:idUser',
    name: "register",
    component: () => import('../views/Register.vue'),
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
        path: 'animations',
        name: 'animations',
        component: () => import('../views/accueil/menus/Animations.vue')
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
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('../views/accueil/menus/Contact.vue')
      },
      {
        path: 'live-action',
        name: 'grandeurNature',
        component: () => import('../views/accueil/menus/GrandeurNature.vue')
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
      },
      {
        path: 'music-library',
        name: 'musics',
        component: () => import('../views/wiki/menus/MusicLibrary.vue')
      },
      {
        path: 'random',
        name: 'randomPages',
        component: () => import('../views/wiki/menus/PagesAleatoires.vue')
      },
      {
        path: 'search/:searchquery',
        name: 'search',
        component: () => import('../views/wiki/menus/SearchResults.vue')
      }
    ]
  },
  {
    path: '/player',
    name: 'playerArea',
    component: () => import('../views/espace-joueur/PlayerArea.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game-master',
    name: 'GMArea',
    component: () => import('../views/espace-mj/GameMasterArea.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/philosophy',
    name: 'philo',
    component: () => import('../views/philosophie/Philosophie.vue')
  },
  {
    path: '/backoffice',
    name: 'backOffice',
    redirect: "/backoffice/home",
    component: () => import('../views/administration/Administration.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/backoffice/home',
        name: 'backOfficeHome',
        component: () => import('../views/administration/menus/Home.vue')
      },
      {
        path: '/backoffice/wiki-redirections',
        name: 'wikiRedirections',
        component: () => import('../views/administration/menus/wiki/Redirections.vue')
      },
      {
        path: '/backoffice/wiki-pages',
        name: 'wikiPages',
        component: () => import('../views/administration/menus/wiki/ContenuWiki.vue')
      },
      {
        path: '/backoffice/wiki-timelines',
        name: 'wikiTimelines',
        component: () => import('../views/administration/menus/Timelines.vue')
      },
      {
        path: '/backoffice/animations',
        name: 'backofficeAnimations',
        component: () => import('../views/administration/menus/AnimationsBO.vue')
      },
      {
        path: '/backoffice/ateliers',
        name: 'backofficeAteliers',
        component: () => import('../views/administration/menus/AteliersBO.vue')
      },
      {
        path: '/backoffice/historique-association',
        name: 'backofficeHistoriqueAsso',
        component: () => import('../views/administration/menus/HistoriqueAssoBO.vue')
      },
      {
        path: '/backoffice/rpg-history',
        name: 'backofficeHistoriqueJDR',
        component: () => import('../views/administration/menus/EventsJdrBO.vue')
      },
      {
        path: '/backoffice/users',
        name: 'backofficeUsers',
        component: () => import('../views/administration/menus/UsersBO.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.currentUser._id.length == 0) {
      next({
        path: '/home/presentation'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
