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
    pantheons: new Array<TriangleParameter>(),
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
    appLanguage: 'FR',
    generalDialog: false,
    mythDialog: false,
    contentDialog: false,
    refreshData: false
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
    setPantheons(state, newEntries: TriangleParameter[]) {
      state.pantheons = newEntries;
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
    pantheons: state => state.pantheons,
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
    refreshData: state => state.refreshData
  },
  actions: {
    fetchEvents(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}events/all`)
        .then((response: any) => {
          context.commit("setEvents", response.data);
        })
        .catch(() => {
          context.dispatch("displayProxyError");
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
      return axios.get(`${process.env.VUE_APP_APIURL}activities/all`)
        .then((response: any) => {
          context.commit("setActivities", response.data);
        })
        .catch(() => {
          context.dispatch("displayProxyError");
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
      return axios.put(`${process.env.VUE_APP_APIURL}activities/${animation._id}`)
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
      return axios.get(`${process.env.VUE_APP_APIURL}workshops/all`)
        .then((response: any) => {
          context.commit("setWorkshops", response.data);
        })
        .catch(() => {
          context.dispatch("displayProxyError");
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
      return axios.put(`${process.env.VUE_APP_APIURL}workshops/${atelier._id}`)
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
    fetchDomains(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}domains/all`)
        .then((response: any) => {
          context.commit("setDomains", response.data);
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
    fetchPantheons(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}pantheons/all`)
        .then((response: any) => {
          context.commit("setPantheons", response.data);
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
              newError.message = "Votre compte a bien été créé ! Un lien d'activation vous a été envoyé à l'adresse renseignée lors de votre inscription";
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
    displayProxyError(context) {
      var newError = new ErrorMessage();
      newError.message = "Impossible de récupérer les données. Si vous utilisez un proxy, vérifiez qu'il est correctement configuré";
      newError.type = "red";
      context.commit("setErrorMessage", newError);
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
