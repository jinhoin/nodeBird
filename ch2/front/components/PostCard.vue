<template>
  <div style="margin-bottom: 20px">
    <v-card style="margin-bottom: 20px;">
      <v-img />
      <v-card-title>
        <h3>
          <nuxt-link :to="'/user/'+ post.id">{{ post.User.nickName }}</nuxt-link>
        </h3>
      </v-card-title>
      <v-card-text>
        <div>
          <nuxt-link :to="'/post/'+post.id">{{ post.content }}</nuxt-link>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <!-- 주는쪽이 아니고 받는쪽 -->
        <v-btn text color="orange" @click="commentOpend = !commentOpend">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{on}">
            <v-btn text color="orange" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background: white">
            <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
            <!-- <v-btn dark color="orange" @click="onEditPost">수정</v-btn> -->
          </div>
        </v-menu>
      </v-card-actions>
    </v-card>
    <template v-if="commentOpend">
      <comment-form :post-id="post.id"></comment-form>
      <v-list>
        <v-list-item v-for="comment in post.Comments" :key="comment.id">
          <v-list-item-avatar color="teal">
            <span>{{ comment.Users.nickName[0]}}</span>
          </v-list-item-avatar>
          <v-list-item-title>{{ comment.Users.nickName }}</v-list-item-title>
          <v-list-sub-title>{{ comment.content }}</v-list-sub-title>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>
<script>
import CommentForm from "~/components/CommentForm";
export default {
  components: {
    CommentForm
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentOpend: false
    };
  },
  methods: {
    onRemovePost() {
      this.$store.dispatch("posts/remove", {
        id: this.post.id
      });
    }
  }
};
</script>
<style scoped>
h3 {
  color: black;
  text-decoration: none;
}
</style>>
  
