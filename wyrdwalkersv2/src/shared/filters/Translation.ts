import Vue from 'vue';
import store from "../../store";
import wwDictionary from './translation-content.json'

Vue.filter('translate', function(value: string){
    var lang = store.getters.appLanguage;

    if(lang === "FR"){
        return value;
    } else {
        return wwDictionary[value as keyof typeof wwDictionary];
    }
});