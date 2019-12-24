import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import EventJdr from '@/model/Event.model';
import Timeline from '@/model/Timeline.model';
import Activity from '@/model/Activity.model';
import Workshop from '@/model/Workshop.model';
import AssoHistory from '@/model/AssoHistory.model';

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
    assoHistory: new Array<AssoHistory>()
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
    }
  },
  getters: {
    contextDrawer: state => state.contextDrawer,
    events: state => state.events,
    timelines: state => state.timelines,
    activities: state => state.activities,
    workshops: state => state.workshops,
    assoHistory: state => state.assoHistory
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
    }
  },
  modules: {
  }
})
