<template>
  <div class="article-meta">
    <a href=""><img :src="article.author.image||'https://avatars.githubusercontent.com/u/23519389?s=40&v=4'" /></a>
    <div class="info">
      <a href="" class="author">{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
    <template v-if="type==1">
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="follow"
        :class="{
          active: article.author.following,
        }"
        @click.prevent="handleEdit"
      >
        <i class="ion-edit"></i>
        &nbsp; Edit Article
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-outline-danger btn-sm"
        @click="follow"
        :class="{
          active: article.author.following,
        }"
         @click.prevent="handleDelete"
      >
        <i class="ion-trash-a"></i>
        &nbsp; Delete Article
      </button>
    </template>
    <template v-if="type==2">
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="follow"
        :class="{
          active: article.author.following,
        }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow {{ article.author.username }}
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp; Favorite Post <span class="counter">(29)</span>
      </button>
    </template>
  </div>
</template>

<script>
import { followUser, unfollowUser } from "@/api/user";
export default {
  name: "ArticleMeta",
  props: {
    article: Object,
    type:String
  },
  methods: {
    handleEdit(){
      this.$router.push({ path: "/editor/"+this.article.slug})
    },
    handleDelete(){

    },
    async follow() {
      const { following, username } = this.article.author;
      if (following) {
        await followUser(username);
      } else {
        await unfollowUser(username);
      }
    },
  },
};
</script>

<style></style>
