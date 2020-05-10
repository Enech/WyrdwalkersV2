<template>
  <v-app>
    <wyrd-appbar />
    <v-content fluid>
      <router-view />
    </v-content>
    <v-footer dark color="black" app padless>
      <v-card color="black" flat tile width="100%">
        <v-row align="center" class="pa-0">
          <v-col cols="12" sm="6" class="pa-0">
            <v-card-text class="white--text text-center pa-0">
              <v-btn small dark icon href="mailto:mastersoffate@wyrdwalkers.com" class="mx-4">
                <v-icon>fa-envelope</v-icon>
              </v-btn>
              <v-btn
                dark
                small
                icon
                href="https://www.helloasso.com/associations/wyrdwalkers/formulaires/1"
                target="_blank"
                class="mx-4"
              >
                <v-icon>fa-hand-holding-usd</v-icon>
              </v-btn>
              <div
                class="fb-like"
                data-href="https://www.facebook.com/wyrdwalkers"
                data-width
                data-layout="button_count"
                data-action="like"
                data-size="large"
                data-share="false"
              ></div>
            </v-card-text>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-text class="white--text text-center pa-0">
              {{ new Date().getFullYear() }} ©
              <strong>Wyrdwalkers</strong>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-footer>
    <v-dialog v-model="openLoginDialog" :max-width="500">
      <v-card clss="pa-3">
        <v-card-title class="black white--text">{{$t("general.dialogs.signin.title")}}</v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-text-field v-model="login" :label="$t('general.dialogs.signin.login')"></v-text-field>
          <v-text-field
            v-model="mdp"
            type="password"
            :label="$t('general.dialogs.signin.password')"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="black"
            @click.stop="openLoginDialog = false;"
          >{{$t("general.dialogs.common.cancel")}}</v-btn>
          <v-btn
            text
            color="blue"
            :disabled="mdp.length == 0 || login.length == 0"
            @click.stop="sendLogin();"
          >{{$t("general.dialogs.common.save")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openSigninDialog" :max-width="500">
      <v-card clss="pa-3">
        <v-card-title class="black white--text">{{$t('general.dialogs.register.title')}}</v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-text-field v-model="login" :label="$t('general.dialogs.register.login')"></v-text-field>
          <v-text-field v-model="honey" name="city" v-show="false"></v-text-field>
          <v-text-field
            v-model="mdp"
            :label="$t('general.dialogs.register.password')"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="confirmMDP"
            :label="$t('general.dialogs.register.confirmPassword')"
            type="password"
            :error="passError"
            :error-messages="passwordErrorMessage"
            @blur="comparePasswords()"
          ></v-text-field>
          <v-text-field v-model="email" :label="$t('general.dialogs.register.email')"></v-text-field>
          <v-text-field v-model="name" :label="$t('general.dialogs.register.name')"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="black"
            @click.stop="openSigninDialog = false;"
          >{{$t("general.dialogs.common.cancel")}}</v-btn>
          <v-btn
            text
            color="blue"
            :disabled="mdp.length == 0 || login.length == 0 || name.length == 0 || email.length == 0 || passError"
            @click.stop="sendRegister();"
          >{{$t("general.dialogs.common.save")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openProfileDialog" :max-width="500">
      <v-card clss="pa-3">
        <v-card-title class="black white--text">{{$t('general.dialogs.user.title')}}</v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                disabled
                v-model="currentUser.login"
                :label="$t('general.dialogs.user.login')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="currentUser.email" :label="$t('general.dialogs.user.email')"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="currentUser.name" :label="$t('general.dialogs.user.name')"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="currentUser.city" :label="$t('general.dialogs.user.city')"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="black"
            @click.stop="openProfileDialog = false;"
          >{{$t("general.dialogs.common.cancel")}}</v-btn>
          <v-btn text color="blue" @click.stop="updateUser()">{{$t("general.dialogs.common.edit")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="showError" dark :color="errorMessage.type">
      {{ errorMessage.message }}
      <v-btn icon text @click="showError = false">
        <v-icon small>clear</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "@/components/global/AppBar.vue";
import store from "./store";
import ErrorMessage from "./model/ErrorMessage.model";
import User from "./model/User.model";

export default Vue.extend({
  name: "App",
  components: {
    "wyrd-appbar": AppBar
  },
  beforeCreate: function() {
    store.commit("initialiseStore");
  },
  computed: {
    eventBus: function() {
      return store.getters.centralBus;
    },
    openLoginDialog: {
      get: function() {
        return store.getters.openLoginDialog;
      },
      set: function(open: boolean) {
        store.commit("setOpenLoginDialog", open);
      }
    },
    openSigninDialog: {
      get: function() {
        return store.getters.openSigninDialog;
      },
      set: function(open: boolean) {
        store.commit("setOpenSigninDialog", open);
      }
    },
    openProfileDialog: {
      get: function() {
        return store.getters.openProfileDialog;
      },
      set: function(open: boolean) {
        store.commit("setOpenProfileDialog", open);
      }
    },
    errorMessage: function() {
      return store.getters.errorMessage;
    },
    currentUser: {
      get: function() {
        return store.getters.currentUser;
      },
      set: function(user: User) {
        store.commit("setCurrentUser", user);
      }
    },
    passwordErrorMessage: function(){
      if(this.passError){
        return this.$t('general.dialogs.register.confirmPasswordError');
      } else {
        return '';
      }
    }
  },
  watch: {
    errorMessage: function() {
      this.showError = true;
    }
  },
  methods: {
    sendLogin: function() {
      store.dispatch("logUser", {
        login: this.login,
        mdp: this.mdp
      });
      this.openLoginDialog = false;
    },
    sendRegister: function() {
      if (this.honey == "") {
        var newUser = new User();
        newUser.name = this.name;
        newUser.login = this.login;
        newUser.mdp = this.mdp;
        newUser.email = this.email;
        store.dispatch("registerUser", newUser);
        this.openSigninDialog = false;
      }
    },
    updateUser: function() {
      store.dispatch("updateUser", this.currentUser);
      this.openProfileDialog = false;
    },
    comparePasswords: function() {
      if (this.mdp != this.confirmMDP) {
        this.passError = true;
      } else {
        this.passError = false;
      }
    }
  },
  data: () => ({
    login: "",
    mdp: "",
    email: "",
    name: "",
    showError: false,
    passError: false,
    confirmMDP: "",
    honey: ""
  })
});
</script>
