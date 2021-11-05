<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <article-meta :article="article" type="1"></article-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" type="2"></article-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" ></article-comments>
        </div>
      </div>
    </div>
</template>
<script>
import { getArticle} from "@/api/article";
import articleMeta from './components/article-meta.vue'
import articleComments from './components/article-comments.vue'
export default {
  name:'articlePage',
  components:{
    articleMeta,
    articleComments
  },
  async asyncData({ params }) {
    console.log("33333333333",params)
    const {slug} = params;
    const articleRes = await getArticle(slug)
    return {
      article:articleRes.data.article
    }
  }
};
</script>

<style></style>
