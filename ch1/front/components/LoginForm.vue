<template>
  <v-container>
    <v-card>
      <v-form>
        <v-container>
          <v-text-field label="이메일" v-model="email" :type="email" required />
        </v-container>

        <v-container>
          <v-text-field label="비밀번호" type="password" required />
        </v-container>
        <v-btn color="green" typ="submit">로그인</v-btn>
        <v-btn nuxt to="/signUp">회원가입</v-btn>
      </v-form>
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
  methods: {
    onSubmitForm() {
      console.log(this.valid);
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate()) {
        alert("validation 통과 가입 시도");
      } else {
        alert("값을 완벽히 입력하세요");
      }
    }
  }
};
</script>