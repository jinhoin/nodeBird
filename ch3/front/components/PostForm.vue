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
        <input type="file" multiple hidden ref="imageInput" @change="onChangeImages">
        <v-btn @click="onClickImageUpload" type="button">이미지 업로드</v-btn>
        <div>
          <div v-for="(p, i) in imagePaths" :key="p" style="display: flex; flex-direction: column">
            <img :src="`http://localhost:3085/${p}`" :alt="p" style="width: 200px; height: 200px;">
            <v-btn type="button" @click="onRemoveImage(i)">삭제</v-btn>
          </div>
        </div>
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
    ...mapState("users", ["me"]),
    //   return this.$store.state.users;
    imagePaths() {
      let i = this.$store.state.posts.imagePaths;
      return i;
    }
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
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e){
      const imageFormData = new FormData();
      // 유사배열 방식으로 배열을 array 화 시킨다
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
      });
      this.$store.dispatch('posts/uploadImages', imageFormData);
    },
    onRemoveImage(index){
      this.$store.dispatch('posts/removeImagePath', index);
    },
  }
};
</script>
<style>
</style>