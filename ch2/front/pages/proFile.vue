<template>
  <v-container>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>내 프로필</v-subheader>
      </v-container>
    </v-card>
    <v-form @submit.prevent="onSubmitForm" v-model="valid">
      <v-text-field label="닉네임" required v-model="nickName" :rules="nickNameRules"></v-text-field>
      <v-btn color="blue" type="submit">수정</v-btn>
    </v-form>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>팔로잉</v-subheader>
        <follow-list :follow="followerList" :remove="removeFollower" />
      </v-container>
    </v-card>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>팔로워</v-subheader>
        <follow-list :follow="followingList" :remove="removeFollowing" />
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
  computed: {
    followerList() {
      return this.$store.state.users.followerList;
    },
    followingList() {
      return this.$store.state.users.followingList;
    }
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
    },
    removeFollowing(id) {
      this.$store
        .dispatch("users/removeFollowing", { id })
        .then(() => {
          console.log({ id: id, state: this.$store.state.users.followerList });
        })
        .catch(error => alert(error));
    },
    removeFollower(id) {
      this.$store
        .dispatch("users/removeFollower", { id })
        .then(() => {
          alert("삭제에 성공했습니다");
        })
        .catch(error => alert(erro));
    }
  },
  head() {
    return { title: "프로필" };
  },
  middleware: "authenticated"
};
</script>
<style>
</style>
