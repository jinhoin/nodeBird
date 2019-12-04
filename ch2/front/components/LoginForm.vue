<template>
  <v-container v-if="!me">
    <v-card>
      <v-form ref="form">
        <v-container>
          <v-text-field label="이메일" v-model="email" :type="email" required />
        </v-container>

        <v-container>
          <v-text-field label="비밀번호" type="password" required />
        </v-container>
        <v-btn color="green" typ="submit" @click="onSubmitForm">로그인</v-btn>
        <v-btn nuxt to="/signUp">회원가입</v-btn>
      </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      {{ me.nickName}}님이 로그인되었습니다
      <v-btn @click="logOut">로그아웃</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      emailRoule: [
        v => !!v || "이메일은 필수사항입니다",
        v => /.+@.+/.test(v) || "이메일형식으로 입력하세요"
      ],
      passWord: "",
      passWordValid: [v => !!v || "비밀번호도 필수사항입니다"],
      passWordConfrim: "",
      passWordConfrimValid: [v => !!v || "비밀번호도 필수사항입니다"]
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    onSubmitForm() {
      console.log(this.$refs.form.validate());
      if (!this.$refs.form.validate()) {
        alert("값을 완벽히 입력하세요");
        return false;
      }

      this.$store
        .dispatch("users/logIn", {
          email: this.email,
          nickName: "hoja"
        })
        .then(function() {
          this.$router.push("/proFile");
        })
        .catch(function() {
          alert("로그인에 실패했습니다");
        });
    },
    logOut() {
      this.$store.dispatch("users/logOut", null);
    }
  }
};
</script>