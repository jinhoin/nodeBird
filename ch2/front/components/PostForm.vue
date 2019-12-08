<template>
  <v-card>
    <v-container style="margin-bottom:20px">
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea
          outlined
          v-model="content"
          clearable
          label="어떤 신기한 일이 있었나요??"
          :success-messages="sucessMessages"
          :success="success"
          @input="onChangeTextArea"
        />
        <v-btn type="submit" color="green" absolute right>전송</v-btn>
        <v-btn>이미지 업로드</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      hideDetails: true,
      sucessMessages: "",
      success: false,
      valid: false,
      content: ""
    };
  },
  computed: {
    //   mapSate
    ...mapState("users", ["me"])
    //   return this.$store.state.users;
  },
  methods: {
    onChangeTextArea() {
      this.hideDetails = true;
      this.success = false;
      this.sucessMessages = "";
    },
    onSubmitForm() {
      if (this.$refs.form.validate) {
        this.$store
          .dispatch("posts/add", {
            content: this.content,
            users: {
              nickName: this.me.nickName
            },
            Comments: [],
            Images: [],
            id: Date.now(),
            createAt: Date.now()
          })
          .then(() => {
            this.content = "";
            this.hideDetails = false;
            this.success = true;
            this.sucessMessages = "게시물 등록 성공";
          })
          .catch(err => {
            alert(err);
          });
      }
    }
  }
};
</script>
<style>
</style>