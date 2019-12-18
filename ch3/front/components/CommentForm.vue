<template>
  <v-form ref="form" v-model="valid" style="postion: relative" @submit.prevent="onSubmitForm">
    <v-textarea
      v-model="content"
      filled
      auto-grow
      label="댓글 달기"
      :hide-details="hideDetails"
      :success="success"
      :success-messages="successMessage"
      @input="onChangeTextArea"
    />
    <v-btn type="submit" color="green" dark bottom right>삐약</v-btn>
  </v-form>
</template>
<script>
export default {
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      content: "",
      hideDetails: true,
      successMessage: "",
      success: false,
      valid: false
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    onChangeTextArea(value) {
      if (value.length) {
        this.hideDetails = true;
        this.success = false;
        this.sucessMessages = "";
      }
    },
    onSubmitForm() {
      if (!this.$refs.form.validate) {
        return false;
      }
      this.$store
        .dispatch("posts/addComment", {
          content: this.content,
          users: {
            nickName: this.me.nickName
          },
          postId: this.postId,
          id: Date.now(),
          createdAt: Date.now()
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
};
</script>