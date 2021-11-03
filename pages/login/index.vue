<template>
  <div class="auth-page">
      <div class="container page">
          <div class="row">
              <div class="col-md-6 offset-md-3 col-xs-12">
                  <h1 class="text-xs-center">Sign up</h1>
                  <p class="text-xs-center">
                    <nuxt-link to="/register" v-if="loginPage">Need an account</nuxt-link>
                    <nuxt-link to="/login" v-else> Have an account</nuxt-link>
                  </p>
                  <ul class="error-messages">
                      <li>That email is already taken</li>
                  </ul>
                  <form>
                      <fieldset class="form-group" v-if="!loginPage">
                         <input class="form-control form-control-lg" type="text" v-model="user.name" placeholder="Your Name">
                      </fieldset>
                      <fieldset class="form-group">
                          <input class="form-control form-control-lg" type="text" v-model="user.email" placeholder="Email">
                      </fieldset>
                      <fieldset class="form-group">
                          <input class="form-control form-control-lg" type="password" v-model="user.password" placeholder="Password">
                      </fieldset>
                      <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="handleLogin"> 
                          {{loginPage?'Sign Inp':'Sign up'}}
                      </button>
                  </form>
              </div>

          </div>
      </div>
  </div>
</template>

<script>
import {login,register} from '@/api/login.js'
export default {
  name:'loginIndex',
  data() {
    return { 
      user:{
        name:'',
        email:'',
        password:''
      }
    }
  },
  // watchQuery: ['page'],
  computed:{
    loginPage(){
      return this.$route.name==='login';
    }
  },
  mounted(){
    console.log(this.$route.name)
  },
  methods:{
    async handleLogin(){
      this.loginPage ? await login({user:this.user}) : await register({user:this.user});
    }
  }
}
</script>

<style>

</style>