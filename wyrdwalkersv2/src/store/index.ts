import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import EventJdr from '@/model/Event.model';
import Timeline from '@/model/Timeline.model';
import Activity from '@/model/Activity.model';
import Workshop from '@/model/Workshop.model';
import AssoHistory from '@/model/AssoHistory.model';
import TriangleParameter from '@/model/TriangleParameter.model';
import WikiPage from '@/model/WikiPage.model';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPersonalTab: 0,
    personalDrawer: false,
    contextDrawer: false,
    events: new Array<EventJdr>(),
    timelines: new Array<Timeline>(),
    activities: new Array<Activity>(),
    workshops: new Array<Workshop>(),
    assoHistory: new Array<AssoHistory>(),
    domains: new Array<TriangleParameter>(),
    approaches: new Array<TriangleParameter>(),
    personalities: new Array<TriangleParameter>(),
    pantheons: new Array<TriangleParameter>(),
    wikipage: new WikiPage()
  },
  mutations: {
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
    setActivities(state, newActivities: Activity[]) {
      state.activities = newActivities;
    },
    setWorkshops(state, newWorks: Workshop[]){
      state.workshops = newWorks;
    },
    setAssoHistory(state, newEntries: AssoHistory[]){
      state.assoHistory = newEntries;
    },
    setApproaches(state, newEntries: TriangleParameter[]){
      state.approaches = newEntries;
    },
    setDomains(state, newEntries: TriangleParameter[]){
      state.domains = newEntries;
    },
    setPersonalities(state, newEntries: TriangleParameter[]){
      state.personalities = newEntries;
    },
    setPantheons(state, newEntries: TriangleParameter[]){
      state.pantheons = newEntries;
    },
    setWikiPage(state, page: WikiPage){
      state.wikipage = page;
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
    wikipage: state => state.wikipage
  },
  actions: {
    fetchEvents(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}events/all`)
        .then((response: any) => {
          context.commit("setEvents", response.data);
        });
    },
    fetchTimelines(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}timelines/all`)
        .then((response: any) => {
          context.commit("setTimelines", response.data);
        });
    },
    fetchActivities(context) {
      return axios.get(`${process.env.VUE_APP_APIURL}activities/all`)
        .then((response: any) => {
          context.commit("setActivities", response.data);
        });
    },
    fetchWorkshops(context){
      return axios.get(`${process.env.VUE_APP_APIURL}workshops/all`)
        .then((response: any) => {
          context.commit("setWorkshops", response.data);
        });
    },
    fetchAssoHistory(context){
      return axios.get(`${process.env.VUE_APP_APIURL}assoHistory/all`)
        .then((response: any) => {
          context.commit("setAssoHistory", response.data);
        });
    },
    fetchApproaches(context){
      return axios.get(`${process.env.VUE_APP_APIURL}approaches/all`)
        .then((response: any) => {
          context.commit("setApproaches", response.data);
        });
    },
    fetchDomains(context){
      return axios.get(`${process.env.VUE_APP_APIURL}domains/all`)
        .then((response: any) => {
          context.commit("setDomains", response.data);
        });
    },
    fetchPersonalities(context){
      return axios.get(`${process.env.VUE_APP_APIURL}personalities/all`)
        .then((response: any) => {
          context.commit("setPersonalities", response.data);
        });
    },
    fetchPantheons(context){
      return axios.get(`${process.env.VUE_APP_APIURL}pantheons/all`)
        .then((response: any) => {
          context.commit("setPantheons", response.data);
        });
    },
    fetchWikiPage(context, pagename: string){
      return axios.get(`${process.env.VUE_APP_APIURL}wiki/${pagename}`)
        .then((response: any) => {
          context.commit("setWikiPage", response.data);
        });
    }
  },
  modules: {
  }
})
