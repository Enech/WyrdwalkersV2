<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>Gestion des utilisateurs</v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-data-table :items="users" :loading="loading" :headers="headers" must-sort>
        <template v-slot:item.isActivated="{ item }">
          <v-btn
            fab
            small
            dark
            color="red"
            v-if="!item.isActivated"
            @click="triggerActivation(item,true)"
          >
            <v-icon small>close</v-icon>
          </v-btn>
          <v-btn fab small dark color="green" v-else @click="triggerActivation(item,false)">
            <v-icon small>check</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.rights.isAdmin="{ item }">
          <v-btn
            fab
            small
            dark
            color="red"
            v-if="!item.rights.isAdmin"
            @click="triggerAdmin(item,true)"
          >
            <v-icon small>close</v-icon>
          </v-btn>
          <v-btn fab small dark color="green" v-else @click="triggerAdmin(item,false)">
            <v-icon small>check</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            fab
            small
            dark
            color="red darken-4"
            @click.stop="editedItem = item; deleteDialog = true;"
          >
            <v-icon small>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="deleteDialog" max-width="500px" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">Suppression d'un utilisateur</span>
          </v-card-title>
          <v-card-text>Vous êtes sur le point de supprimer un utilisateur. Cette action est définitive et l'utilisateur concerné devra recréer un compte. Êtes-vous sûr de vouloir continuer ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="deleteDialog = false;">Annuler</v-btn>
            <v-btn color="red" text @click="deleteUser()">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import User from "../../../model/User.model";

export default Vue.extend({
  name: "AdminHistorique",
  created: function() {
    this.fetchUsers();
  },
  computed: {
    users: function() {
      return store.getters.users;
    }
  },
  methods: {
    fetchUsers: function() {
      this.loading = true;
      store.dispatch("fetchUsers").then(() => {
        this.loading = false;
      });
    },
    deleteUser: function() {
      store.dispatch("deleteUser", this.editedItem._id).then(() => {
        this.deleteDialog = false;
        this.fetchUsers();
        Object.assign(this.editedItem, new User());
      });
    },
    updateUser: function(item: User) {
      store.dispatch("updateUserRights", item);
    },
    triggerAdmin: function(user: User, isAdmin: boolean) {
      user.rights.isAdmin = isAdmin;
      this.updateUser(user);
    },
    triggerActivation: function(user: User, activate: boolean) {
      user.isActivated = activate;
      user.rights.isUser = activate;
      this.updateUser(user);
    }
  },
  data: () => ({
    deleteDialog: false,
    editedItem: new User(),
    loading: false,
    headers: [
      { text: "Pseudo", value: "login" },
      { text: "Nom", value: "name" },
      { text: "Email", value: "email" },
      { text: "Ville", value: "city" },
      { text: "Activé", value: "isActivated" },
      { text: "Admin", value: "rights.isAdmin" },
      { text: "Actions", value: "action" }
    ]
  }),
  metaInfo: function() {
    return {
      title: "Backoffice Utilisateurs",
      link: [{ rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }]
    };
  }
});
</script>