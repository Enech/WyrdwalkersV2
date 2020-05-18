import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import EventJdr from '@/model/Event.model';
import Timeline from '@/model/Timeline.model';
import AnimationWW from '@/model/Animation.model';
import Workshop from '@/model/Workshop.model';
import AssoHistory from '@/model/AssoHistory.model';
import TriangleParameter from '@/model/TriangleParameter.model';
import WikiPage from '@/model/WikiPage.model';
import ErrorMessage from '@/model/ErrorMessage.model';
import User from '@/model/User.model';
import Flatted, { parse, stringify } from '../../node_modules/flatted'
import Music from '@/model/Music.model';
import WikiRedirection from '@/model/WikiRedirection.model';
import WikiDenseMode from '@/model/enums/WikiDenseMode.enum'
import Approche from '@/model/explorer/Approche.model';
import Domaine from '@/model/explorer/Domaine.model';
import Personality from '@/model/explorer/Personality.model';
import Origin from '@/model/explorer/Origin.model';
import EntityExplorer from '@/model/explorer/EntityExplorer.model';
import LandingTree from '@/model/WikiLandingTree.model';
import Game from '@/model/rotg/Game.model';
import Player from '@/model/rotg/Player.model';
import Territory from '@/model/rotg/Territory.model';
import OrderSheet from '@/model/rotg/OrderSheet.model';
import Resources from '@/model/rotg/Resources.model';
import FateConsequence from '@/model/rotg/FateConsequence.model';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    selectedPersonalTab: 0,
    personalDrawer: false,
    contextDrawer: false,
    events: new Array<EventJdr>(),
    timelines: new Array<Timeline>(),
    activities: new Array<AnimationWW>(),
    workshops: new Array<Workshop>(),
    assoHistory: new Array<AssoHistory>(),
    domains: new Array<TriangleParameter>(),
    approaches: new Array<TriangleParameter>(),
    personalities: new Array<TriangleParameter>(),
    origins: new Array<Origin>(),
    wikipage: new WikiPage(),
    allMusics: new Array<Music>(),
    randomWikiPages: new Array<WikiPage>(),
    wikiSearchResults: new Array<WikiPage>(),
    siteSection: -1,
    errorMessage: new ErrorMessage(),
    currentUser: new User(),
    centralEventBus: new Vue(),
    openLoginDialog: false,
    openSigninDialog: false,
    openProfileDialog: false,
    activationSuccessful: true,
    wikiRedirections: new Array<WikiRedirection>(),
    appLanguage: 'fr',
    generalDialog: false,
    mythDialog: false,
    contentDialog: false,
    refreshData: false,
    users: new Array<User>(),
    explorerEntities: new Array<EntityExplorer>(),
    selectedWikiTree: new LandingTree(),
    wikiTreeHistory: new Array<LandingTree>(),
    rotgGames: new Array<Game>(),
    selectedGame: new Game(),
    selectedGamePlayers: new Array<Player>(),
    selectedGameTerritories: new Array<Territory>(),
    currentPlayer: new Player(),
    previousPlayer: new Player(),
    currentOrderSheet: new OrderSheet(),
    gameSheets: new Array<OrderSheet>(),
    resourcesSpent: new Resources(),
    currentFateConsequence: new FateConsequence()
  },
  mutations: {
    initialiseStore(state) {
      var storedState = localStorage.getItem('store');
      // Check if the ID exists
      if (storedState) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, Flatted.parse(storedState))
        );
      }
    },
    setSelectedPersonalTab(state, tabIndex: number) {
      state.selectedPersonalTab = tabIndex;
    },
    setPersonalDrawer(state, open: boolean) {
      state.personalDrawer = open;
    },
    setContextDrawer(state, open: boolean) {
      state.contextDrawer = open;
    },
    setEvents(state, eventsList: EventJdr[]) {
      state.events = eventsList;
    },
    setTimelines(state, newTimelines: Timeline[]) {
      state.timelines = newTimelines;
    },
    setActivities(state, newActivities: AnimationWW[]) {
      state.activities = newActivities;
    },
    setWorkshops(state, newWorks: Workshop[]) {
      state.workshops = newWorks;
    },
    setAssoHistory(state, newEntries: AssoHistory[]) {
      state.assoHistory = newEntries;
    },
    setApproaches(state, newEntries: TriangleParameter[]) {
      state.approaches = newEntries;
    },
    setDomains(state, newEntries: TriangleParameter[]) {
      state.domains = newEntries;
    },
    setPersonalities(state, newEntries: TriangleParameter[]) {
      state.personalities = newEntries;
    },
    setOrigins(state, newEntries: Origin[]) {
      state.origins = newEntries;
    },
    setWikiPage(state, page: WikiPage) {
      state.wikipage = page;
    },
    setAllMusics(state, musics: Music[]) {
      state.allMusics = musics;
    },
    setRandomWikiPages(state, pages: WikiPage[]) {
      state.randomWikiPages = pages;
    },
    setWikiSearchResults(state, pages: WikiPage[]) {
      state.wikiSearchResults = pages;
    },
    setSiteSection(state, section: number) {
      state.siteSection = section;
    },
    setErrorMessage(state, error: ErrorMessage) {
      state.errorMessage = error;
    },
    setCurrentUser(state, user: User) {
      state.currentUser = user;
    },
    setOpenLoginDialog(state, open: boolean) {
      state.openLoginDialog = open;
    },
    setOpenSigninDialog(state, open: boolean) {
      state.openSigninDialog = open;
    },
    setOpenProfileDialog(state, open: boolean) {
      state.openProfileDialog = open;
    },
    setActivationSuccessful(state, success: boolean) {
      state.activationSuccessful = success;
    },
    setWikiRedirections(state, redirections: WikiRedirection[]) {
      state.wikiRedirections = redirections;
    },
    setAppLanguage(state, lang: string) {
      state.appLanguage = lang;
    },
    setGeneralDialog(state, dialog: boolean) {
      state.generalDialog = dialog;
    },
    setMythDialog(state, dialog: boolean) {
      state.mythDialog = dialog;
    },
    setContentDialog(state, dialog: boolean) {
      state.contentDialog = dialog;
    },
    setRefreshData(state, refresh: boolean) {
      state.refreshData = refresh;
    },
    setUsers(state, results: Array<User>) {
      state.users = results;
    },
    setExplorerEntities(state, entities: EntityExplorer[]) {
      state.explorerEntities = entities;
    },
    setSelectedWikiTree(state, tree: LandingTree) {
      state.selectedWikiTree = tree;
    },
    setWikiTreeHistory(state, nodes: LandingTree[]) {
      state.wikiTreeHistory = nodes;
    },
    setROTGGames(state, games: Game[]) {
      state.rotgGames = games;
    },
    setSelectedGame(state, game: Game) {
      state.selectedGame = game;
    },
    setSelectedGamePlayers(state, players: Player[]) {
      state.selectedGamePlayers = players;
    },
    setSelectedGameTerritories(state, planes: Territory[]) {
      state.selectedGameTerritories = planes;
    },
    setCurrentPlayer(state, player: Player) {
      state.currentPlayer = player;
    },
    setPreviousPlayer(state, player: Player) {
      state.previousPlayer = player;
    },
    setCurrentOrderSheet(state, sheet: OrderSheet) {
      state.currentOrderSheet = sheet;
    },
    setResourcesSpent(state, resources: Resources) {
      state.resourcesSpent = resources;
    },
    setGameSheets(state, sheets: OrderSheet[]) {
      state.gameSheets = sheets;
    },
    setCurrentFateConsequence(state, fate: FateConsequence) {
      state.currentFateConsequence = fate;
    }
  },
  getters: {
    contextDrawer: state => state.contextDrawer,
    events: state => state.events,
    timelines: state => state.timelines,
    activities: state => state.activities,
    workshops: state => state.workshops,
    assoHistory: state => state.assoHistory,
    approaches: state => state.approaches,
    domains: state => state.domains,
    personalities: state => state.personalities,
    origins: state => state.origins,
    wikipage: state => state.wikipage,
    allMusics: state => state.allMusics,
    randomWikiPages: state => state.randomWikiPages,
    wikiSearchResults: state => state.wikiSearchResults,
    siteSection: state => state.siteSection,
    errorMessage: state => state.errorMessage,
    currentUser: state => state.currentUser,
    centralBus: state => state.centralEventBus,
    openLoginDialog: state => state.openLoginDialog,
    openSigninDialog: state => state.openSigninDialog,
    openProfileDialog: state => state.openProfileDialog,
    activationSuccessful: state => state.activationSuccessful,
    wikiRedirections: state => state.wikiRedirections,
    appLanguage: state => state.appLanguage,
    generalDialog: state => state.generalDialog,
    mythDialog: state => state.mythDialog,
    contentDialog: state => state.contentDialog,
    refreshData: state => state.refreshData,
    users: state => state.users,
    explorerEntities: state => state.explorerEntities,
    selectedWikiTree: state => state.selectedWikiTree,
    wikiTreeHistory: state => state.wikiTreeHistory,
    rotgGames: state => state.rotgGames,
    selectedGame: state => state.selectedGame,
    selectedGamePlayers: state => state.selectedGamePlayers,
    selectedGameTerritories: state => state.selectedGameTerritories,
    currentPlayer: state => state.currentPlayer,
    previousPlayer: state => state.previousPlayer,
    currentOrderSheet: state => state.currentOrderSheet,
    gameSheets: state => state.gameSheets,
    resourcesSpent: state => state.resourcesSpent,
    currentFateConsequence: state => state.currentFateConsequence
  },
  actions: {
    fetchEvents(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}events/all`)
          .then((response: any) => {
            context.commit("setEvents", response.data);
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    addEvent(context, event: EventJdr) {
      return axios.post(`${process.env.VUE_APP_APIURL}events/`, event)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'évènement' a bien été ajouté";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    updateEvent(context, event: EventJdr) {
      return axios.put(`${process.env.VUE_APP_APIURL}events/${event._id}`, event)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'évènement a bien été mis à jour";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    deleteEvent(context, event: EventJdr) {
      return axios.delete(`${process.env.VUE_APP_APIURL}events/${event._id}`)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'évènement a bien été supprimé";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    fetchTimelines(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}timelines/all`)
          .then((response: any) => {
            context.commit("setTimelines", response.data);
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    fetchTimeline(context, timelineID: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}timelines/${timelineID}`)
          .then((response: any) => {
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    addTimeline(context, newTimeline: Timeline) {
      return new Promise((resolve) => {
        return axios.post(`${process.env.VUE_APP_APIURL}timelines/`, newTimeline)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.ok !== 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "La timeline a bien été ajoutée";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    editTimeline(context, newTimeline: Timeline) {
      return new Promise((resolve) => {
        return axios.put(`${process.env.VUE_APP_APIURL}timelines/${newTimeline._id}`, newTimeline)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.ok !== 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "La timeline a bien été mise à jour";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    deleteTimeline(context, timelineID: string) {
      return new Promise((resolve) => {
        return axios.delete(`${process.env.VUE_APP_APIURL}timelines/${timelineID}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.ok !== 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "La timeline a bien été supprimée";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    fetchActivities(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}activities/all`)
          .then((response: any) => {
            context.commit("setActivities", response.data);
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    addActivity(context, animation: AnimationWW) {
      return axios.post(`${process.env.VUE_APP_APIURL}activities/`, animation)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'animation a bien été ajoutée";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    updateActivity(context, animation: AnimationWW) {
      return axios.put(`${process.env.VUE_APP_APIURL}activities/${animation._id}`, animation)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'animation a bien été mise à jour";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    deleteActivity(context, animation: AnimationWW) {
      return axios.delete(`${process.env.VUE_APP_APIURL}activities/${animation._id}`)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'animation a bien été supprimée";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    fetchWorkshops(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}workshops/all`)
          .then((response: any) => {
            context.commit("setWorkshops", response.data);
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    addWorkshop(context, atelier: Workshop) {
      return axios.post(`${process.env.VUE_APP_APIURL}workshops/`, atelier)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'atelier a bien été ajouté";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    updateWorkshop(context, atelier: Workshop) {
      return axios.put(`${process.env.VUE_APP_APIURL}workshops/${atelier._id}`, atelier)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'atelier a bien été mis à jour";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    deleteWorkshop(context, atelier: Workshop) {
      return axios.delete(`${process.env.VUE_APP_APIURL}workshops/${atelier._id}`)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'atelier a bien été supprimé";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {

        });
    },
    fetchAssoHistory(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}assoHistory/all`)
        .then((response: any) => {
          context.commit("setAssoHistory", response.data);
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    addHistory(context, history: AssoHistory) {
      return axios.post(`${process.env.VUE_APP_APIURL}assoHistory/`, history)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'historique a bien été ajouté";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    updateHistory(context, history: AssoHistory) {
      return axios.put(`${process.env.VUE_APP_APIURL}assoHistory/${history._id}`, history)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'historique a bien été mis à jour";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    deleteHistory(context, history: AssoHistory) {
      return axios.delete(`${process.env.VUE_APP_APIURL}assoHistory/${history._id}`)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'historique a bien été supprimé";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    fetchApproaches(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}approaches/all`)
        .then((response: any) => {
          context.commit("setApproaches", response.data);
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    addApproach(context, approche: Approche) {
      return axios.post(`${process.env.VUE_APP_APIURL}approaches/`, approche)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'approche a bien été ajoutée";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    updateApproach(context, approche: Approche) {
      return axios.put(`${process.env.VUE_APP_APIURL}approaches/${approche._id}`, approche)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'approche a bien été mise à jour";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    deleteApproach(context, approche: Approche) {
      return axios.delete(`${process.env.VUE_APP_APIURL}approaches/${approche._id}`)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'approche a bien été supprimée";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    fetchDomains(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}domains/all`)
        .then((response: any) => {
          context.commit("setDomains", response.data);
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    addDomain(context, domaine: Domaine) {
      return axios.post(`${process.env.VUE_APP_APIURL}domains/`, domaine)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "Le domaine a bien été ajouté";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    updateDomain(context, domaine: Domaine) {
      return axios.put(`${process.env.VUE_APP_APIURL}domains/${domaine._id}`, domaine)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "Le domaine a bien été mis à jour";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    deleteDomain(context, domaine: Domaine) {
      return axios.delete(`${process.env.VUE_APP_APIURL}domains/${domaine._id}`)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "Le domaine a bien été supprimé";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    fetchPersonalities(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}personalities/all`)
        .then((response: any) => {
          context.commit("setPersonalities", response.data);
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    addPersonality(context, perso: Personality) {
      return axios.post(`${process.env.VUE_APP_APIURL}personalities/`, perso)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "La personnalité a bien été ajoutée";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    updatePersonality(context, perso: Personality) {
      return axios.put(`${process.env.VUE_APP_APIURL}personalities/${perso._id}`, perso)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "La personnalité a bien été mise à jour";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    deletePersonality(context, perso: Personality) {
      return axios.delete(`${process.env.VUE_APP_APIURL}personalities/${perso._id}`)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "La personnalité a bien été supprimée";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    fetchOrigins(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}origins/all`)
        .then((response: any) => {
          context.commit("setOrigins", response.data);
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    addOrigin(context, pantheon: Origin) {
      return axios.post(`${process.env.VUE_APP_APIURL}origins/`, pantheon)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'origine a bien été ajoutée";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    updateOrigin(context, pantheon: Origin) {
      return axios.put(`${process.env.VUE_APP_APIURL}origins/${pantheon._id}`, pantheon)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'origine a bien été mise à jour";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    deleteOrigin(context, pantheon: Origin) {
      return axios.delete(`${process.env.VUE_APP_APIURL}origins/${pantheon._id}`)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'origine a bien été supprimée";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    fetchExplorerEntities(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}explorer/all`)
        .then((response: any) => {
          context.commit("setExplorerEntities", response.data);
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    addExplorerEntity(context, entity: EntityExplorer) {
      return axios.post(`${process.env.VUE_APP_APIURL}explorer/`, entity)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'entité a bien été ajoutée";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    updateExplorerEntity(context, entity: EntityExplorer) {
      return axios.put(`${process.env.VUE_APP_APIURL}explorer/${entity._id}`, entity)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'entité a bien été mise à jour";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    deleteExplorerEntity(context, entity: EntityExplorer) {
      return axios.delete(`${process.env.VUE_APP_APIURL}explorer/${entity._id}`)
        .then((response: any) => {
          var newError = new ErrorMessage();
          if (response.data.ok !== 1) {
            newError.message = response.data.message;
            newError.type = "red";
            context.commit("setErrorMessage", newError);
          } else {
            newError.message = "L'entité a bien été supprimée";
            newError.type = "green";
            context.commit("setErrorMessage", newError);
          }
        })
        .catch(() => {
          context.dispatch("displayProxyError");
        });
    },
    fetchWikiPage(context, pagename: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}wiki/${pagename}`)
          .then((response: any) => {
            context.commit("setWikiPage", response.data);
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    fetchWikiPageById(context, pageID: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}wiki/fromid/${pageID}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data._id === undefined) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              context.commit("setWikiPage", response.data);
            }
            resolve(response);
          });
      });
    },
    fetchAllWikiPages(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}wiki/all`);
    },
    addWikiPage(context, page: WikiPage) {
      return new Promise((resolve) => {
        return axios.post(`${process.env.VUE_APP_APIURL}wiki/`, page)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.ok !== 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = 'La page a bien été créée. Vous pouvez maintenant compléter son contenu.';
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    updateWikiPage(context, page: WikiPage) {
      return new Promise((resolve) => {
        return axios.put(`${process.env.VUE_APP_APIURL}wiki/${page._id}`, page)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.ok !== 1 && response.data.ok !== undefined) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = 'La page a bien été mise à jour.';
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    lockWikiPage(context, wrapper: any) {
      return new Promise((resolve) => {
        return axios.put(`${process.env.VUE_APP_APIURL}wiki/lock/${wrapper.pageID}`, wrapper)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.ok !== 1 && response.data.ok !== undefined) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    deleteWikiPage(context, id: string) {
      return new Promise((resolve) => {
        return axios.delete(`${process.env.VUE_APP_APIURL}wiki/${id}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.ok !== 1 && response.data.ok !== undefined) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = 'La page a bien été supprimée.';
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    fetchRandomWikiPages(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}wiki/random`)
          .then((response: any) => {
            context.commit("setRandomWikiPages", response.data);
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    fetchWikiSearchResults(context, searchQuery: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}wiki/search/${searchQuery}`)
          .then((response: any) => {
            context.commit("setWikiSearchResults", response.data);
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    fetchUsers(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}users/all`)
          .then((response: any) => {
            context.commit("setUsers", response.data);
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    logUser(context, logObject: any) {
      return new Promise((resolve) => {
        return axios.post(`${process.env.VUE_APP_APIURL}users/login`, logObject)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data._id === undefined) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Bon retour parmis nous !";
              newError.type = "green";
              context.commit("setCurrentUser", response.data);
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    registerUser(context, newUser: User) {
      return new Promise((resolve) => {
        return axios.post(`${process.env.VUE_APP_APIURL}users/`, newUser)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.ok !== 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Votre compte a bien été créé ! Vous pouvez maintenant vous connecter sur le site";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    activateUser(context, userId: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}users/activate/${userId}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.result.ok !== 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Votre compte est désormais activé";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
              context.commit("setActivationSuccessful", true);
            }
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    updateUser(context, updatedUser: User) {
      return new Promise((resolve) => {
        return axios.put(`${process.env.VUE_APP_APIURL}users/${updatedUser._id}`, updatedUser)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.result.ok !== 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Vos informations ont été mises à jour";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
              context.commit("setActivationSuccessful", true);
            }
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    updateUserRights(context, updatedUser: User) {
      return new Promise((resolve) => {
        return axios.put(`${process.env.VUE_APP_APIURL}users/rights/${updatedUser._id}`, updatedUser)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.result.ok !== 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Utilisateur mis à jour";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
              context.commit("setActivationSuccessful", true);
            }
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    deleteUser(context, userId: string) {
      return new Promise((resolve) => {
        return axios.delete(`${process.env.VUE_APP_APIURL}users/${userId}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.result.ok != 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Utilisateur supprimé";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          })
          .catch(() => {
            context.dispatch("displayProxyError");
          });
      });
    },
    fetchAllWikiRedirections(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_APIURL}wiki-redirections/all`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              context.commit("setWikiRedirections", response.data)
            }
            resolve(response);
          });
      });
    },
    addWikiRedirection(context, newRedirection: WikiRedirection) {
      return new Promise((resolve) => {
        return axios.post(`${process.env.VUE_APP_APIURL}wiki-redirections/`, newRedirection)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.result.ok != 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Nouvelle redirection ajoutée";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    updateWikiRedirection(context, editedRedirection: WikiRedirection) {
      return new Promise((resolve) => {
        return axios.put(`${process.env.VUE_APP_APIURL}wiki-redirections/${editedRedirection._id}`, editedRedirection)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.result.ok != 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Redirection mise à jour";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    deleteWikiRedirection(context, redirectionId: string) {
      return new Promise((resolve) => {
        return axios.delete(`${process.env.VUE_APP_APIURL}wiki-redirections/${redirectionId}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.result.ok != 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Redirection supprimée";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    fetchROTGGame(context, id: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}games/${id}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data[0]) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              context.commit("setSelectedGame", response.data[0]);
            }
            resolve(response.data);
          });
      });
    },
    fetchAllROTGGames(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}games/all`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              context.commit("setROTGGames", response.data);
            }
            resolve(response);
          });
      });
    },
    addROTGGame(context, game: Game) {
      return new Promise((resolve) => {
        return axios.post(`${process.env.VUE_APP_ROTGURL}games/`, game)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.result.ok != 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Nouvelle partie ajoutée";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    updateROTGGame(context, game: Game) {
      return new Promise((resolve) => {
        return axios.put(`${process.env.VUE_APP_ROTGURL}games/${game._id}`, game)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.result.ok != 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Partie mise à jour";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    deleteROTGGame(context, game: Game) {
      return new Promise((resolve) => {
        return axios.delete(`${process.env.VUE_APP_ROTGURL}games/${game._id}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data.every((e: boolean) => e)) {
              newError.message = "Echec dans la suppression de la partie. Des données liées peuvent encore subsister.";
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Partie supprimée";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    launchROTGGame(context, id: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}games/start/${id}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data) {
              newError.message = "Partie lancée";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response.data);
          });
      });
    },
    fetchROTGGameInformations(context, id: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}games/informations/${id}`)
          .then((response: any) => {
            context.commit("setSelectedGamePlayers", response.data.players);
            context.commit("setSelectedGame", response.data.game[0]);
            context.commit("setSelectedGameTerritories", response.data.planes);
            context.commit("setGameSheets", response.data.orders);
            resolve(response.data);
          });
      });
    },
    fetchROTGGamePlayers(context, idGame: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}players/game/${idGame}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              context.commit("setSelectedGamePlayers", response.data);
            }
            resolve(response);
          });
      });
    },
    fetchROTGAllPlayers(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}players/all`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            }
            resolve(response.data);
          });
      });
    },
    fetchROTGGamePlayer(context, idPlayer: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}players/${idPlayer}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              context.commit("setCurrentPlayer", response.data[0]);
            }
            resolve(response.data[0]);
          });
      });
    },
    updateROTGGamePlayer(context, player: Player) {
      return new Promise((resolve) => {
        return axios.put(`${process.env.VUE_APP_ROTGURL}players/${player._id}`, player)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            }
            resolve(response.data[0]);
          });
      });
    },
    readyROTGGamePlayer(context, player: Player) {
      return new Promise((resolve) => {
        return axios.put(`${process.env.VUE_APP_ROTGURL}players/ready/${player._id}`, player)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            }
            resolve(response.data);
          });
      });
    },
    addROTGPlayer(context, player: Player) {
      return new Promise((resolve) => {
        return axios.post(`${process.env.VUE_APP_ROTGURL}players/`, player)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (response.data.result.ok != 1) {
              newError.message = response.data.message;
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Vous avez rejoint la partie";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
            }
            resolve(response);
          });
      });
    },
    fetchROTGGameTerritories(context, id: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}territories/${id}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response) {
              newError.message = "Unable to fetch the game's planes";
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              context.commit("setSelectedGameTerritories", response.data);
            }
            resolve(response);
          });
      });
    },
    fetchROTGAllTerritories(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}territories/all`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data) {
              newError.message = "Unable to fetch the planes";
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            }
            resolve(response.data);
          });
      });
    },
    fetchROTGOrderSheet(context, id: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}orders/${id}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response) {
              newError.message = "Unable to fetch the requested sheet";
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            }
            resolve(response.data);
          });
      });
    },
    fetchROTGGameOrderSheets(context, id: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}orders/game/${id}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response) {
              newError.message = "Unable to fetch the requested sheets";
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              context.commit("setGameSheets", response.data);
            }
            resolve(response.data);
          });
      });
    },
    fetchROTGAllOrderSheets(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}orders/all`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response) {
              newError.message = "Unable to fetch the requested sheets";
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            }
            resolve(response.data);
          });
      });
    },
    sendROTGOrderSheet(context, sheet: OrderSheet) {
      return new Promise((resolve) => {
        return axios.post(`${process.env.VUE_APP_ROTGURL}orders/`, sheet)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response) {
              newError.message = "Unable to submit order sheet";
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              newError.message = "Fiche d'Ordre envoyée";
              newError.type = "green";
              context.commit("setErrorMessage", newError);
              context.commit("setGameSheets", response.data);
            }
            resolve(response.data);
          });
      });
    },
    fetchROTGFateConsequence(context, wrapper: any) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}games/fatebindings/${wrapper.gameId}/${wrapper.playerId}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response) {
              newError.message = "Unable to fetch the player's fate consequence";
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            } else {
              context.commit("setCurrentFateConsequence", response.data);
            }
            resolve(response);
          });
      });
    },
    fetchROTGOrdersResults(context) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}results/all`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data) {
              newError.message = "Unable to fetch the orders results";
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            }
            resolve(response.data);
          });
      });
    },
    fetchROTGGameOrdersResults(context, id: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}results/game/${id}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data) {
              newError.message = "Unable to fetch the game's orders results";
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            }
            resolve(response.data);
          });
      });
    },
    fetchROTGGamePlayersHistory(context, id: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}history/game/${id}`)
          .then((response: any) => {
            var newError = new ErrorMessage();
            if (!response.data) {
              newError.message = "Unable to fetch the players history for this game";
              newError.type = "red";
              context.commit("setErrorMessage", newError);
            }
            resolve(response.data);
          });
      });
    },
    displayProxyError(context) {
      var newError = new ErrorMessage();
      newError.message = "Impossible de récupérer les données. Si vous utilisez un proxy, vérifiez qu'il est correctement configuré";
      newError.type = "red";
      context.commit("setErrorMessage", newError);
    },
    manualEnding(context, id: string) {
      return new Promise((resolve) => {
        return axios.get(`${process.env.VUE_APP_ROTGURL}games/endturn/${id}`)
          .then((response: any) => {
            store.commit("setSelectedGame", response.data);
            resolve(response);
          });
      });
    }
  },
  modules: {
  }
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  try {
    localStorage.setItem('store', Flatted.stringify(state));
  } catch (e) {
    localStorage.clear();
    localStorage.setItem('store', Flatted.stringify(state));
  }
});

export default store;
