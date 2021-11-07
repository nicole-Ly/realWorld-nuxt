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
                <nuxt-link
                  v-if="user"
                  class="nav-link"
                  :class="{active: tab=='your_feed'}"
                  disabled
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                     },
                  }">
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{active: tab=='global_feed'}"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    },
                  }">
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{active: tab=='tag'}"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      page,
                      tag
                    },
                  }">
                  # {{tag}}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link :to="`/profile/${article.author.username}`">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                 <nuxt-link class="author" :to="`/profile/${article.author.username}`">
                  {{ article.author.username }}</nuxt-link>
                <span class="date">{{
                  article.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                @click="onFavorite(article)"
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :disabled="article.favoriteDisabled"
                :class="{
                  active: article.favorited,
                }">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
               <ul class="tag-list">
                  <li class="tag-default tag-pill tag-outline" :key="index" v-for="(item,index) in article.tagList">{{item}}</li>
              </ul>
            </nuxt-link>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    page,
                    tab:'tag',
                  },
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
       <!-- 分页列表 -->
      <nav>
        <ul class="pagination">
          <li
            class="page-item"
            :class="{
              active: item === page
            }"
            v-for="item in totalPage"
            :key="item"
          >
            <nuxt-link
              class="page-link"
              :to="{
                name: 'home',
                query: {
                  page: item,
                  tag,
                  tab,
                }
              }"
            >{{ item }}</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getArticles, getFeedArticle, getTags ,favorite,unfavorite} from "@/api/article";
export default {
  name: "homePage",
  computed: {
    ...mapState(["user"]),
    totalPage(){
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  //监听query变化，执行asyncData
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({ query }) {
    const limit = 5;
    const { tag, tab = 'global_feed',page=1 } = query;
    const loadAirticles = tab == "your_feed" ? getFeedArticle:getArticles;
    const [ articleRes , tagRes ] = await Promise.all([
      loadAirticles({
        tag,
        limit,
        offset:(page - 1) * limit,
      }),
      getTags()
    ])
    const { articles, articlesCount } = articleRes.data;
    articles.forEach((item)=>item.favoriteDisabled = false);
    const {tags } = tagRes.data;
    return {
      limit,
      articles,
      articlesCount,
      tags,
      tag,
      tab,
      page
    };
  },
  methods:{
    async onFavorite(article){
      article.favoriteDisabled = true;
      if(article.favorited){
        //取消点赞
        await unfavorite(article.slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      }else{
        //点赞
        await favorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    }
  }
};
</script>

<style></style>
