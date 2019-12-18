<template>
  <v-container>
    <post-form v-if="me"></post-form>
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>
<script>
import PostCard from "~/components/PostCard";
import PostForm from "~/components/PostForm";

export default {
  components: {
    PostCard,
    PostForm
  },
  data() {
    return {};
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
    hasMorePost() {
      return this.$store.state.posts.hasMorePost;
    }
  },
  // component 마운트 전 vuexStore 비동기로 데이터를 넣을때
  fetch({ store }) {
    store.dispatch("posts/loadPosts");
  },
  methods: {
    onScroll() {
      if (
        // 사용자 경험을 좋게하기 위해 300
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.hasMorePost) {
          this.$store.dispatch("posts/loadPosts");
        }
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  head() {
    return {
      title: "NodeBird"
    };
  }
};
</script>
<style>
</style>
