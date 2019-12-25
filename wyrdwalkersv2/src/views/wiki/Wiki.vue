<template>
  <div>
    <router-view />
    <v-navigation-drawer v-model="contextDrawer" app clipped color="black" dark bottom>
      <template v-slot:prepend>
        <v-divider color="white"></v-divider>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title></v-list-item-title>
            <v-list-item-subtitle>
              <v-btn small text>
                <v-icon small left>fa-user-plus</v-icon>
                <span class="hidden-xs-only">S'inscrire</span>
              </v-btn>
              <v-btn small text>
                <v-icon left small>fa-sign-in-alt</v-icon>
                <span class="hidden-xs-only">Connexion</span>
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider color="white"></v-divider>
      <v-list>
        <v-list-item :to="{name:'wikiHome'}">
          <v-list-item-title>Accueil</v-list-item-title>
          <v-list-item-action>
            <v-icon small>fa-book-reader</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Pages aléatoires</v-list-item-title>
          <v-list-item-action>
            <v-icon small>fa-random</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item >
          <v-list-item-title>Chronologies</v-list-item-title>
          <v-list-item-action>
            <v-icon small>fa-bezier-curve</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Système de jeu</v-list-item-title>
          </template>
          <v-list-item >
            <v-list-item-title>Lignes directrices</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-book</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Capacités légendaires</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-bolt</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Panthéons</v-list-item-title>
          </template>
          <v-list-item :to="{path:'/wiki/aesir'}" target="_blank">
            <v-list-item-title>Aesir - Scandinave</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/amatsukami'}" target="_blank">
            <v-list-item-title>Amatsukami - Japonais</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/ayllus'}" target="_blank">
            <v-list-item-title>Ayllus - Inca</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/celestial-bureaucracy'}" target="_blank">
            <v-list-item-title>Bureaucratie Céleste - Chinois</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/deva'}" target="_blank">
            <v-list-item-title>Deva - Hindou</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/k\'asunel'}" target="_blank">
            <v-list-item-title>K'Asunel - Maya</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/neter'}" target="_blank">
            <v-list-item-title>Neter - Egyptien</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/nga-tama-a-rangi'}" target="_blank">
            <v-list-item-title>Nga Tama a Rangi - Maori</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/orisha'}" target="_blank">
            <v-list-item-title>Orisha - Africain</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/teotl'}" target="_blank">
            <v-list-item-title>Teotl - Aztèque</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/theoi'}" target="_blank">
            <v-list-item-title>Théoï - Grec</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/tuatha-dé-danann'}" target="_blank">
            <v-list-item-title>Tuatha Dé Danann - Celte</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Royaumes Titaniques</v-list-item-title>
          </template>
          <v-list-item :to="{path:'/wiki/aether'}" target="_blank">
            <v-list-item-title>Aether - Lumière</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/amaunet'}" target="_blank">
            <v-list-item-title>Amaunet - Ciel</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/kosmos'}" target="_blank">
            <v-list-item-title>Kosmos - Ordre</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/muspelheim'}" target="_blank">
            <v-list-item-title>Muspelheim - Feu</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/nyx'}" target="_blank">
            <v-list-item-title>Nyx - Nuit</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/océanus'}" target="_blank">
            <v-list-item-title>Océanus - Eau</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/patala'}" target="_blank">
            <v-list-item-title>Patala - Profondeurs</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/sheol'}" target="_blank">
            <v-list-item-title>Sheol - Mort</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/terra'}" target="_blank">
            <v-list-item-title>Terra - Terre</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Outres-Mondes</v-list-item-title>
          </template>
          <v-list-item :to="{path:'/wiki/mythborn'}" target="_blank">
            <v-list-item-title>Races Mythborn</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/forêt-noire'}" target="_blank">
            <v-list-item-title>Forêt Noire</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/fairie'}" target="_blank">
            <v-list-item-title>Fairie</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/mer-de-jade'}" target="_blank">
            <v-list-item-title>Mer de Jade</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/shambhala'}" target="_blank">
            <v-list-item-title>Shambhala</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/utopia'}" target="_blank">
            <v-list-item-title>Utopia</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/el-dorado'}" target="_blank">
            <v-list-item-title>El Dorado</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Sociétés Secrètes</v-list-item-title>
          </template>
          <v-list-item :to="{path:'/wiki/illuminati'}" target="_blank">
            <v-list-item-title>Les Illuminati</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/cabale'}" target="_blank">
            <v-list-item-title>La Cabale</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/cercle-de-merlin'}" target="_blank">
            <v-list-item-title>Le Cercle de Merlin</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/ordre-du-poing-de-jade'}" target="_blank">
            <v-list-item-title>L'Ordre du Poing de Jade</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item >
          <v-list-item-title>Bibliothèque musicale</v-list-item-title>
          <v-list-item-action>
            <v-icon small>fa-music</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";

export default Vue.extend({
  name: "Wiki",
  computed: {
    contextDrawer: {
      get: function() {
        return store.getters.contextDrawer;
      },
      set: function(open: boolean) {
        store.commit("setContextDrawer", open);
      }
    }
  },
  data: () => ({})
});
</script>