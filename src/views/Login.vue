<template>
  <main class="pa4 tl black-80">
    <article class="signup pl6 pr6 pt2 black-80 tl">
      <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
        <legend class="f4 fw6 ph0 mh0 white">Sign In</legend>
        <div class="mt3">
          <label class="white db fw6 lh-copy f6" for="email-address">Username</label>
          <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
          type="username"
          name="username"
          id="username"
          v-model="username"
          >
        </div>
        <div class="mv3">
          <label class="white db fw6 lh-copy f6" for="password">Password</label>
          <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
          type="password"
          name="password"
          id="password"
          v-model="password"
          >
        </div>
      </fieldset>
      <div class="">
        <input class="b ph3 pv2 input-reset ba b--black bg-white grow pointer f6"
          :disabled="loading"
          type="submit"
          value="Sign in"
          @click="login"
        >
      </div>
      <div class="lh-copy mt3">
        <a href="/register" class="f6 link dim black db white">Sign up</a>
        <a href="/password-reset" class="f6 link dim black db white">Forgot your password?</a>
      </div>
    </article>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserServices from '@/services/user.service';
import router from '@/router';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters('userStore', [
      'getUser',
    ]),
  },
  methods: {
    ...mapActions('userStore', [
      'setUser',
    ]),

    async login() {
      this.loading = true;
      const response = await UserServices.login({
        username: this.username,
        password: this.password,
      });
      this.loading = false;
      if (response.status === 200) {
        console.log(response.data.user)
        this.setUser({
          user: response.data.user,
          token: response.data.token,
          exp: response.data.exp,
          isOnline: response.data.user.isOnline,
        });
        router.push('/');
      }
    },
  },
};
</script>

<style scoped>
main {
  background: #4544e9;
}
main {
  height: calc(100vh - 67px);
}

article {
    max-width: 600px;
}

</style>
