<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>회원가입</v-subheader>
          <v-form ref="form" @submit.prevent="onSubmitForm" v-model="valid">
            <v-text-field label="이메일" type="email" v-model="email" required :rules="emailRulse"></v-text-field>
            <v-text-field
              label="비밀번호"
              type="password"
              v-model="passWord"
              required
              :rules="passWordRulse"
            ></v-text-field>
            <v-text-field
              label="비밀번호확인"
              type="password"
              v-model="passWordConfirm"
              required
              :rules="passWordConfrimRulse"
            ></v-text-field>
            <v-text-field label="닉네임" type="text" v-model="nickName" required></v-text-field>
            <v-checkbox required v-model="terms" :rules="termsRule" label="호인 말을 잘 들을 것을약속합니다"></v-checkbox>
            <v-btn color="green" type="submit" :disabled="!valid">가입하기</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      passWord: "",
      passWordConfirm: "",
      nickName: "",
      terms: false,
      emailRulse: [
        v => !!v || "이메일은 필수입니다",
        v => /.+@.+/.test(v) || "이메일이 유효하지 않습니다"
      ],
      passWordRulse: [v => !!v || "비밀번호는 필수입니다"],
      passWordConfrimRulse: [
        v => !!v || "비밀번호는 확인 필수입니다",
        v => v === this.passWord || "비밀번호 확인값은 비밀번호와 같아야됩니다"
      ],
      termsRule: [v => !!v || "약관에 동의해야합니다"]
    };
  },
  methods: {
    onSubmitForm() {
      console.log(this.valid);
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate()) {
        // 객체로 값전송
        this.$store.dispatch("users/signUp", {
          nickName: this.nickName,
          email: this.email
        });
      } else {
        alert("값을 완벽히 입력하세요");
      }
    }
  },
  head() {
    return {
      title: "회원가입"
    };
  }
};
</script>
<style>
</style>
