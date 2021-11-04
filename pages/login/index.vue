<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register"
                       v-if="isLogin">Need an account</nuxt-link>
            <nuxt-link to="/login"
                       v-else> Have an account</nuxt-link>
          </p>
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages"
                  :key="index">{{ field }} {{ message }}</li>
            </template>
          </ul>
          <form>
            <fieldset class="form-group"
                      v-if="!isLogin">
              <input class="form-control form-control-lg"
                     type="text"
                     v-model.trim="user.username"
                     placeholder="Your Name"
                     required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="email"
                     v-model.trim="user.email"
                     placeholder="Email"
                     required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="password"
                     v-model.trim="user.password"
                     placeholder="Password"
                     required
                     minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right"
                    @click.prevent="handleLogin"
                    :disabled="disabled">
              {{isLogin?'Sign In':'Sign up'}}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "loginIndex",
  data() {
    return {
      user: {
        username: "nivo",
        email: "135744@163.com",
        password: "12345678",
      },
      errors: {},
      disabled: false,
    };
  },
  // watchQuery: ['page'],
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    async handleLogin() {
      console.log(this.$store);
      this.disabled = true;
      try {
        const { data } = this.isLogin
          ? await login({
              user: this.user,
            })
          : await register({
              user: this.user,
            });

        this.$store.commit("setUser", data.user);
        Cookie.set("user", JSON.stringify(data.user));
        this.$router.push("/");
      } catch (err) {
        this.errors = err.response.data.errors;
      }
      this.disabled = false;
    },
  },
};
</script>

<style>
</style>