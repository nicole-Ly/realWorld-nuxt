<template>
  <div>
     <form class="card comment-form">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
            v-model="comment"
          ></textarea>
        </div>
        <div class="card-footer">
          <img
            src="http://i.imgur.com/Qr71crq.jpg"
            class="comment-author-img"
          />
          <button class="btn btn-sm btn-primary" @click.prevent="add">Post Comment</button>
        </div>
      </form>

      <div class="card" :key="comment.id" v-for="comment in comments">
        <div class="card-block">
          <p class="card-text">
            {{comment.body}}
          </p>
        </div>
        <div class="card-footer">
          <a href="" class="comment-author">
            <img
              :src="comment.author.image||'https://avatars.githubusercontent.com/u/23519389?s=40&v=4'"
              class="comment-author-img"
            />
          </a>
          &nbsp;
          <a href="" class="comment-author">{{comment.username}}</a>
          <span class="date-posted">{{comment.createdAt | date("MMM DD, YYYY")}}</span>
        </div>
      </div>


  </div>
</template>

<script>

import { addComment,getComments} from "@/api/article";
import { mapState } from "vuex";
export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      comment:'',
      comments:[]
    }
  },
  mounted () {
   this.getList();
  },
   computed: {
    ...mapState(["user"]),
  },
  methods:{
    async getList(){
      const { data } = await getComments(this.article.slug)
      this.comments = data.comments
    },
    async add(){
      const {comment,article} = this;
      const body = {body:comment};
      try {
        await addComment({slug:article.slug,comment:{comment:body}});
        this.comment = '';
        this.getList();
      } catch (error) {
      }
    }
  }
}
</script>

<style>

</style>