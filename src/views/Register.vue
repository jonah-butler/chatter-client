<template>
  <article>
    <header class="bg-gold sans-serif">
      <transition name="fade" mode="out-in">
      <article v-if="!validated"
      class="signup pl6 pr6 pt2 black-80 tl">
      <h1 class="f2 f1-l lh-title mb0">Chatter</h1>
      <h2 class="f2 f1-l lh-title mt0 mb4 mb2-ns">is free and easy to get started!</h2>
      <p class="f6">To get started sign up below and we'll get your account up and running!</p>
      <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
        <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
        <div class="mt3">
          <label class="db fw4 lh-copy f6" for="email-address">Username</label>
          <input
            v-model="username"
            class="pa2 input-reset ba bg-transparent w-100 measure"
            id="username"
          >
          <legend
            v-if="validateUsername"
            class="hidden ph0 mh0 fw6">
            Please remove forbidden characters: `~!@#$%^*()+=&{}[]|\;:'"/?>&lt;,
          </legend>
        </div>
        <div class="mt3">
          <label class="db fw4 lh-copy f6" for="email-address">Email address</label>
          <input
            v-model="email"
            class="pa2 input-reset ba bg-transparent w-100 measure"
            id="email-address"
          >
        </div>
        <div class="mt3">
          <label class="db fw4 lh-copy f6" for="password">Password</label>
          <input
            autocomplete="new-password"
            v-model="password"
            class="b pa2 input-reset ba bg-transparent"
            type="password"
            name="password"
            id="password"
          >
        </div>
        <div v-if="error" class="mt3 flex items-center pa4 bg-red white">
          <svg class="w1" data-icon="info" viewBox="0 0 32 32" style="fill:currentcolor">
            <title>info icon</title>
            <path
            d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15
            L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0
            0 0 16 6"
            ></path>
          </svg>
          <span class="lh-title ml3">
            {{ errorMessage }}
          </span>
        </div>
      </fieldset>
      <div class="mt3">
        <input
        :disabled="isLoading"
        @click="registerUser"
        class="b ph3 pv2 input-reset ba b--black bg-white grow pointer f6"
        type="submit"
        value="Sign Up">
      </div>
      </article>
      <article v-else
      class="secondary bg-light-red tl pl6 pr6 pt2">
      <h1 class="f2 f1-l lh-title mb0">Verify Your Account</h1>
      <p class="f6">We sent a code to {{ email }}.</p>
      <p class="f6">Enter that to verify your account.</p>
      <p class="f6 b">This code is active only for 10 minutes.</p>
      <input v-model="token" class="pa2 input-reset ba bg-transparent w-100 measure" id="token">
      <div class="mt3">
        <input
        @click="verifyUser"
        :disabled="isLoading"
        class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
        type="submit"
        value="Verify Account">
      </div>
      <div v-if="error2" class="mt3 items-center pa4 bg-red white">
        <svg class="w1" data-icon="info" viewBox="0 0 32 32" style="fill:currentcolor">
          <title>info icon</title>
          <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19
          15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3
          3 0 0 0 16 6"></path>
        </svg>
        <span class="lh-title ml3">
          {{ errorMessage2 }}
        </span>
      </div>
      <div v-if="verificationSuccess" class="mt3 flex items-center pa4 bg-green white">
        <svg class="w1" data-icon="info" viewBox="0 0 32 32" style="fill:currentcolor">
          <title>info icon</title>
          <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15
          L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0
          16 6"></path>
        </svg>
        <div class="lh-title ml3">
          {{ successMessage }}
        </div>
        <div>
          <a class="f6 link dim ph3 pv2 mb2 dib white bg-black" href="/login">Login</a>
        </div>
      </div>
      </article>
      </transition>
    </header>
  </article>
</template>

<script>
import UserServices from '@/services/user.service';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      validated: false,
      loading: false,
      error: false,
      errorMessage: '',
      error2: false,
      errorMessage2: '',
      token: '',
      verificationSuccess: false,
      successMessage: '',
    };
  },
  computed: {
    isLoading() {
      return this.loading;
    },
    validateUsername() {
      // eslint-disable-next-line
      return /[~`!#$%\^&*()+=\\[\]\\';,/{}|\\":<>\?]/g.test(this.username);
    },
  },
  methods: {
    async registerUser() {
      this.loading = true;
      if (this.validatePassword && this.validateEmail) {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
        const response = await (UserServices.register(user));
        if (response.status === 200 && response.data.result) {
          this.validated = true;
          this.loading = false;
        } else {
          this.error = true;
          this.errorMessage = 'This is embarrasing. An unexpected error occurred on our server.';
        }
      } else {
        this.error = true;
        this.errorMessage = 'Complete the form and try again';
      }
    },
    async verifyUser() {
      this.loading = true;
      const response = await UserServices.verify({ token: this.token });
      if (response.status === 200) {
        this.verificationSuccess = true;
        this.successMessage = 'Your account has been created successfully and verified - please login!';
      } else {
        this.error2 = true;
        this.errorMessage2 = 'Uh-oh looks like there was an issue verifying your account';
      }
    },
    validatePassword() {
      return this.password.length >= 8;
    },
    validateEmail() {
      // eslint-disable-next-line
      return /^\S.*@\S+$/.test(this.email);
    },
  },
};
</script>

<style scoped>
.secondary {
  color: white;
  height: calc(100vh - 67px);
}

.bg-gold {
  height: calc(100vh - 67px);
}

input {
  background: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
