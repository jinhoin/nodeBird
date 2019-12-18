<template>
  <v-list>
    <v-col v-for="user in users" :key="user.id" md="4" cols="12" style="display: inline-block">
      <v-list-item>
        <v-list-item-avatar color="indigo">
          <span class="white--text headline">{{user.nickName[0] }}</span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{user.nickName}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon @click="remove(user.id)">mdi-minus-circle-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-col>
  </v-list>
</template>
<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    },
    remove: {
      type: Function
    }
  }
};
</script>
<style>
</style>