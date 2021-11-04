<template>
  <div class="editor-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-10 offset-md-1 col-xs-12">
                <form>
                    <fieldset>
                        <fieldset class="form-group">
                            <input type="text" v-model.trim="article.title" class="form-control form-control-lg" placeholder="Article Title">
                        </fieldset>
                        <fieldset class="form-group">
                            <input type="text" v-model.trim="article.description" class="form-control" placeholder="What's this article about?">
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea v-model.trim="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
                        </fieldset>
                        <fieldset class="form-group">
                            <input type="text" v-model.trim="tag" class="form-control" placeholder="Enter tags">
                            <div class="tag-list"></div>
                        </fieldset>
                        <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click.prevent="addArticle">
                            Publish Article
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {getArticle,createArticle,updateArticle} from '@/api/article'
export default {
  name:'editArticle', 
  data(){
    return{
      article:{
        title:'',
        description:'',
        body:'',
        tagList:[]
      },
      tag:'',
    }
  },
  computed:{
    id(){
      return this.$route.params.id||''
    }
  },
  async mounted(){
    if(!this.id) return;
    // this.article = await getArticle();
    // console.log("4444444444",this.$route.params)
  },
  methods:{
    async addArticle(){
      let {article} = this;
      article.tagList.push(this.tag)
      await createArticle({article})
      return;
    }
  }
}
</script>

<style>

</style>