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
                  <ul class="error-messages" v-if="errtip">
                      <li>{{errtip}}</li>
                  </ul>
                  <form>
                      <fieldset class="form-group" v-if="!loginPage">
                         <input class="form-control form-control-lg" type="text" v-model.trim="user.username" placeholder="Your Name" required>
                      </fieldset>
                      <fieldset class="form-group">
                          <input class="form-control form-control-lg" type="email"  v-model.trim="user.email" placeholder="Email" required>
                      </fieldset>
                      <fieldset class="form-group">
                          <input class="form-control form-control-lg" type="password" v-model.trim="user.password" placeholder="Password" required minlength="8">
                      </fieldset>
                      <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="handleLogin" :disabled="disabled"> 
                          {{loginPage?'Sign In':'Sign up'}}
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
        username: 'nicole3',
        email: 'nicole@163.com',
        password: '12345678'
      },
      errtip:'',
      disabled:false
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
    validate(){

    },
    async handleLogin(){
      const {email,password} = this.user;
      this.disabled = true;
      try {
        const {data}  = this.loginPage ? await login({email,password}) : await register({user:this.user});
        console.log(data)
      } catch (err) {
        this.errtip = err.response.data;
      }
      this.disabled = false;
    }
  }
}
</script>

<style>

</style>