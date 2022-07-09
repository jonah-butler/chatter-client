import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import UserModule from './modules/user';

export default createStore({
  modules: {
    userStore: UserModule
  },
  plugins: [
    createPersistedState()
  ]
});
