<template>
  <div class="profile-page">
    <div class="user-info">
        <div class="container">
            <div class="row">

                <div class="col-xs-12 col-md-10 offset-md-1">
                    <img src="http://i.imgur.com/Qr71crq.jpg" class="user-img"/>
                    <h4>{{user.username}}</h4>
                    <p>
                       {{user.bio}}
                    </p>
                    <button class="btn btn-sm btn-outline-secondary action-btn" @click.prevent="follow">
                        <i class="ion-plus-round"></i>
                        &nbsp;
                        Follow {{user.username}}
                    </button>
                </div>

            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="articles-toggle">
                    <ul class="nav nav-pills outline-active">
                        <li class="nav-item">
                            <a class="nav-link active" href="">My Articles</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Favorited Articles</a>
                        </li>
                    </ul>
                </div>

                <div class="article-preview">
                    <div class="article-meta">
                        <a href=""><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
                        <div class="info">
                            <a href="" class="author">nicole</a>
                            <span class="date">January 20th</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm pull-xs-right">
                            <i class="ion-heart"></i> 29
                        </button>
                    </div>
                    <a href="" class="preview-link">
                        <h1>How to build webapps that scale</h1>
                        <p>This is the description for the post.</p>
                        <span>Read more...</span>
                    </a>
                </div>

                <div class="article-preview">
                    <div class="article-meta">
                        <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg"/></a>
                        <div class="info">
                            <a href="" class="author">Albert Pai</a>
                            <span class="date">January 20th</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm pull-xs-right">
                            <i class="ion-heart"></i> 32
                        </button>
                    </div>
                    <a href="" class="preview-link">
                        <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                        <p>This is the description for the post.</p>
                        <span>Read more...</span>
                        <ul class="tag-list">
                            <li class="tag-default tag-pill tag-outline">Music</li>
                            <li class="tag-default tag-pill tag-outline">Song</li>
                        </ul>
                    </a>
                </div>


            </div>

        </div>
    </div>
</div>
</template>

<script>
import {getProfile,followUser,unfollowUser} from "@/api/user";
export default {
  name:'profilePage',
  middleware: 'authenticated',
  async asyncData({params}){
    const {username} = params;
    const userRes = await getProfile(username);
    return {
      user:userRes.data.profile,
      username
    }
  },
  methods:{
    async follow(){
      const {following,username} = this.user;
      if(following){
        await followUser(username)
      }else{
        await unfollowUser(username)
      }
    }
  }
}
</script>

<style>

</style>