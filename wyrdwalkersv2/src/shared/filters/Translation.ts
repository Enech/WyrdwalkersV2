import Vue from 'vue';
import store from "../store";
import wwDictionary from '../translation.js'

Vue.filter('translate', function(value: string){
    var lang = store.geters.appLanguage;

    if(lang === "FR"){
        return value;
    } else {
        return wwDictionary[value];
    }
});