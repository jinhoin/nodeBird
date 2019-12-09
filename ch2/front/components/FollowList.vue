<template>
  <v-list>
    <ul>
      <li v-for="f in follow" :key="f.id">
        <span>{{f.nickName }}</span>
        <v-icon @click="remove(f.id)">mdi-minus-circle-outline</v-icon>
      </li>
    </ul>
  </v-list>
</template>
<script>
export default {
  props: {
    follow: {
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