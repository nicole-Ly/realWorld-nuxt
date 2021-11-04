<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link v-if="user"
                           class="nav-link"
                           disabled
                           :to="{
                 name:'home',
                 query:{tab:'your_feed'}
                }">
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           active
                           :to="{
                 name:'home',
                 query:{tab:'global_feed'}
                }">
                  Global Feed
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview"
               v-for="article in articles"
               :key="article.slug">
            <div class="article-meta">
              <a href="profile.html">
                <img :src="article.author.image" />
              </a>
              <div class="info">
                <a href=""
                   class="author">{{article.author.username}}</a>
                <span class="date">{{article.createdAt|date('MMM DD, YYYY')}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                      :class="{
                  active: article.favorited
                }">
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <a href=""
               class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </a>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link :to="{
                  name: 'home',
                  query:{
                    tag:item
                  }
                }"
                         class="tag-pill tag-default"
                         v-for="item in tags"
                         :key="item">{{ item }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getArticles, getFeedArticle, getTags } from "@/api/article";
export default {
  name: "homePage",
  computed: {
    ...mapState(["user"]),
  },
  async asyncData({ query }) {
    console.log(query);
    const { tag, tab } = query;
    console.log(tab)
    const loadAirticles = tab == "global_feed" ? getArticles : getFeedArticle;
    const data = await loadAirticles({
      tag,
      limit: 20,
    });
    const { articles, articlesCount } = data.data;
    console.log(666666666, articles);
    const data2 = await getTags();
    console.log("******", data2.data.tags);
    return {
      articles,
      tags: data2.data.tags,
    };
  },
};
</script>

<style>
</style>