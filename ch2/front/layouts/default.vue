<template>
  <v-app>
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <nuxt-link to="/">NodeBird</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items style="{ display:'flex'; height:100%; alignItems:'flex-end' }">
          <v-text-field
            height="100%"
            prepend-icon="mdi-magnify"
            label="검색"
            hide-details
            style="{ display:'flex'; alignItems:'flex-end' }"
          />
          <v-btn text nuxt to="/proFile" v-if="me">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signUp" v-else>
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row>
      <v-col cols="12" md="4">
        <login-form></login-form>
      </v-col>
      <v-col cols="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
// ~ root 경로로 표현
import LoginForm from "~/components/LoginForm.vue";
export default {
  components: {
    LoginForm
  },
  data() {
    return {};
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  }
};
</script>
<style>
</style>