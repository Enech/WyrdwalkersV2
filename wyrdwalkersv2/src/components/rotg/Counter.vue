<template>
  <div class="rotg-counter">
     <span :class="parseInt(hoursLeft,10) < 1 ? 'red--text' : ''">{{hoursLeft}} : {{minutesLeft}} : {{secondsLeft}}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";

export default Vue.extend({
  name: "ROTGCounter",
  created() {
    setInterval(function(context){
        var today = new Date();
        var tzOffset = today.getTimezoneOffset();
        var utcToday = new Date(today);
        utcToday.setHours(today.getHours() + Math.floor(tzOffset / 60));
        var endTurn = new Date();
        endTurn.setHours(22);
        endTurn.setMinutes(0);
        endTurn.setSeconds(0);
        if(today.getUTCHours() >= 22){
            endTurn = context.addDays(endTurn, 1);
        }
        var timeLeft = endTurn.getTime() - utcToday.getTime();
        context.hoursLeft = Math.floor(timeLeft / 1000 / 60 / 60);
        context.minutesLeft = Math.floor(timeLeft / 1000 / 60 - (60 * context.hoursLeft));
        context.secondsLeft = Math.floor(timeLeft / 1000 - (60 * context.minutesLeft) - (3600 * context.hoursLeft));
        context.hoursLeft = context.hoursLeft < 10 ? `0${context.hoursLeft}` : `${context.hoursLeft}`; 
        context.minutesLeft = context.minutesLeft < 10 ? `0${context.minutesLeft}` : `${context.minutesLeft}`; 
        context.secondsLeft = context.secondsLeft < 10 ? `0${context.secondsLeft}` : `${context.secondsLeft}`; 
    },1000, this);
  },
  computed: {
  },
  watch: {
  },
  methods: {
      addDays: function(date: Date, days: number){
          var result = new Date(date);
          result.setDate(date.getDate() + days);
          return result;
      }
  },
  data: () => ({
      hoursLeft: 0,
      minutesLeft: 0,
      secondsLeft: 0
  })
});
</script>