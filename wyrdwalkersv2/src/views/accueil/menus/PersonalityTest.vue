<template>
  <div class="pa-3">
    <div v-if="!showResults">
      <v-parallax dark src="@/assets/fractal-969516.jpg" eager>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="display-2 font-weight-thin mb-4">WYRDWALKERS</h1>
            <h3 class="headline">Quelle est votre Légende ?</h3>
          </v-col>
        </v-row>
      </v-parallax>
      <v-card class="mt-3 text-center" v-if="!displayQuestions">
        <h3
          class="display-1 font-weight-light uppercase pa-3"
        >Bienvenue sur le test de personnalité Wyrdwalkers</h3>
        <p class="body-1">
          En allant plus loin vous trouverez quelques questions de notre crue qui vous permettront de vous identifier à une de nos 300 divinités
          <br />Ressemblerez-vous plus à Apollon ? Horus ? Ou peut-être même le grand Thor en personne ? Faites le test et découvrez-le dans quelques minutes !
        </p>
        <v-btn outlined color="red" class="mb-3" @click="displayQuestions = true;">
          <v-icon left>play_arrow</v-icon>Commencer
        </v-btn>
      </v-card>
      <v-card class="mt-3 text-center" v-else>
        <v-card-text>
          <div class="pt-3">
            <p
              class="headline font-weight-light"
            >Dans les situations difficiles et complexes, je me fie plus à mon instinct qu’à des arguments logiques</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="logosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="5"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="-1"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p
              class="headline font-weight-light"
            >Je me sens trop souvent coupable lorsque je me permets un petit plaisir égoiste</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="erosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="5"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="-1"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p
              class="headline font-weight-light"
            >Je sais que je peux miser davantage sur mon adaptabilité que sur ma capacité à anticiper</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="kosmosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="5"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="-1"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p
              class="headline font-weight-light"
            >Je trouve qu’être immortel serait quelque chose de bien</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="logosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="-1"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="5"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p
              class="headline font-weight-light"
            >Je suis à l’aise avec les personnes très émotives et suis capable de les comprendre</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="erosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="-1"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="5"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p class="headline font-weight-light">La communauté prime sur l'individu</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="kosmosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="-1"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="5"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p class="headline font-weight-light">L’homme est un animal comme les autres</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="logosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="5"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="-1"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p
              class="headline font-weight-light"
            >Lorsque mes émotions sont trop fortes, je me réfugie dans mon monde intérieur</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="erosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="5"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="-1"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p
              class="headline font-weight-light"
            >Les traditions et les habitudes sont des éléments importants dans ma vie</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="kosmosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="-1"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="5"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p
              class="headline font-weight-light"
            >Je suis plus à l’aise quand je peux être en contact régulièrement avec la Nature</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="logosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="5"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="-1"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p
              class="headline font-weight-light"
            >Dans les moments difficiles, je garde le cap vers l’objectif sans fléchir</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="erosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="-1"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="5"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p
              class="headline font-weight-light"
            >Les valeurs communes d’une civilisation sont un frein à l’accomplissement individuel</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="kosmosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="5"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="-1"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p class="headline font-weight-light">Je pense donc je suis</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="logosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="-1"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="5"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3">
            <p
              class="headline font-weight-light"
            >Je suis généreux : je donne et aime sans réfléchir ou regretter</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="erosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="-1"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="5"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <v-divider></v-divider>
          <div class="pt-3 mb-4">
            <p
              class="headline font-weight-light"
            >Je suis prêt à me sacrifier pour monter l'échelle sociale</p>
            <v-row justify="center" align="center">
              <v-radio-group v-model="kosmosSelection" row>
                <v-radio label="Pas du tout d'accord" color="red darken-3" :value="-1"></v-radio>
                <v-radio label="Pas d'accord" color="red darken-3" :value="0.5"></v-radio>
                <v-radio label="Neutre" color="red darken-3" :value="2"></v-radio>
                <v-radio label="D'accord" color="red darken-3" :value="3.5"></v-radio>
                <v-radio label="Tout à fait d'accord" color="red darken-3" :value="5"></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <div class="text-center mb-3">
            <v-btn outlined color="black" @click.stop="showResults = true;">
              <v-icon left>fa-check</v-icon>Voir le résultat
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      <v-card class="pa-3">
        <v-row align="center">
          <v-col cols="12" md="6">
            <wyrd-triangle-drawing
              :logosScore="logosScore"
              :erosScore="erosScore"
              :kosmosScore="kosmosScore"
            />
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
// @ts-ignore
import TriangleDrawing from '../../../components/personality-test/TriangleDrawing.vue'

export default Vue.extend({
  name: "PersonalityTest",
  components: {
    "wyrd-triangle-drawing": TriangleDrawing
  },
  created: function() {
    this.resetData();
  },
  data: () => ({
    displayQuestions: false,
    showResults: false,
    logosSelection: 0,
    erosSelection: 0,
    kosmosSelection: 0,
    logosScore: 0,
    erosScore: 0,
    kosmosScore: 0
  }),
  methods: {
    resetData: function() {
      this.logosSelection = 0;
      this.logosScore = 0;
      this.erosScore = 0;
      this.erosSelection = 0;
      this.kosmosScore = 0;
      this.kosmosSelection = 0;
    }
  },
  watch: {
    logosSelection: function(newValue: number) {
      this.logosScore += newValue;
      this.logosSelection = 0;
      if (this.logosScore > 20) {
        this.logosScore = 20;
      }
      if (this.logosScore < 0) {
        this.logosScore = 0;
      }
    },
    erosSelection: function(newValue: number) {
      this.erosScore += newValue;
      this.erosSelection = 0;
      if (this.erosScore > 20) {
        this.erosScore = 20;
      }
      if (this.erosScore < 0) {
        this.erosScore = 0;
      }
    },
    kosmosSelection: function(newValue: number) {
      this.kosmosScore += newValue;
      this.kosmosSelection = 0;
      if (this.kosmosScore > 20) {
        this.kosmosScore = 20;
      }
      if (this.kosmosScore < 0) {
        this.kosmosScore = 0;
      }
    }
  }
});
</script>