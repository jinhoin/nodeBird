<template>
  <v-container>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>내 프로필</v-subheader>
      </v-container>
    </v-card>
    <v-form @submit="onSubmitForm" v-model="valid">
      <v-text-field label="닉네임" required v-model="nickName" :rules="nickNameRules"></v-text-field>
      <v-btn color="blue" type="submit">수정</v-btn>
    </v-form>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>팔로잉</v-subheader>
        <follow-list />
      </v-container>
    </v-card>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>팔로워</v-subheader>
        <follow-list />
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import FollowList from "~/components/FollowList";
export default {
  components: {
    FollowList
  },
  data() {
    return {
      valid: false,
      nickName: "",
      nickNameRules: [v => !!v || "닉네임입력값은 필수잆니다."]
    };
  },
  methods: {
    onSubmitForm() {
      console.log({
        nickName: this.nickName
      });
      if (this.nickName.length) {
        this.valid = true;

        this.$store
          .dispatch("users/changeNickName", {
            nickName: this.nickName
          })
          .then(() => {})
          .catch(error => {
            alert(error);
          });
      } else {
        alert("닉네임값을 입력하세요");
        return false;
      }
    }
  },
  mounted() {}
};
</script>
<style>
</style>
