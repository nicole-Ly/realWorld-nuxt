<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control"
                       type="text"
                       v-model.trim="user.image"
                       placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="text"
                       v-model.trim="user.username"
                       placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg"
                          rows="8"
                          v-model.trim="user.bio"
                          placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="text"
                       v-model.trim="user.email"
                       placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="password"
                       v-model.trim="user.password"
                       placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right"
                      @click.prevent="update()">
                Update Settings
              </button>
            </fieldset>
          </form>
          <button class="btn btn-outline-danger"
                  @click.prevent="loginOut()">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from "@/api/user";
export default {
  name: "settingPage",
  middleware: "authenticated",
  data() {
    return {
      user: {
        username: "",
        image: "",
        bio: "",
        email: "",
        password: "",
      },
    };
  },
  async mounted() {
    try {
      const { data } = await getUser();
      this.user = data.user;
      console.log(data.user);
    } catch (error) {}
  },
  methods: {
    async update() {
      try {
        await updateUser({ user: this.user });
      } catch (error) {}
      this.$router.push("/profile");
    },
    loginOut() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>