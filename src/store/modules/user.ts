import { ActionContext, Commit } from 'vuex';

import UserStateInterface from '@/interfaces/user.state';
import User from '@/interfaces/user.payload';
import TokenInterface from '@/interfaces/token';
import PayloadInterface from '@/interfaces/payload';

import UserService from '@/services/user.service';

function revertState() {
  return {
    user: null,
    token: null,
    exp: null,
    isOnline: null
  };
};

const state: UserStateInterface = {
  user: null,
  token: null,
  exp: null,
  isOnline: null
};

const getters = {

  getUser(state: UserStateInterface): User {
    return state.user;
  },
  getToken(state: UserStateInterface): TokenInterface {
    return state.token;
  },
  getExpiration(state: UserStateInterface): number {
    return state.exp;
  },
  getOnlineStatus(state: UserStateInterface): boolean {
    return state.isOnline;
  }

};

const actions = {

  setUser: async ({ commit }: ActionContext<UserStateInterface, UserStateInterface>, payload: PayloadInterface): Promise<void> => {
    commit('setUser', payload.user);
    commit('setToken', payload.token);
    commit('setExpiration', payload.exp);
    commit('setOnlineStatus', payload.isOnline);
  },
  clearUser: async ({ commit }: { commit: Commit }): Promise<void> => {
    commit('logout');
    console.log('hit clear user action');
  },
  activateStatus: async ({ commit, state }: ActionContext<UserStateInterface, UserStateInterface>): Promise<void> => {
    const response = await UserService.onlineActivate(state.user._id);
    commit('setOnlineStatus', response.data.isOnline);
  },
  deactivateStatus: async ({ commit, state }: ActionContext<UserStateInterface, UserStateInterface>): Promise<void> => {
    const response = await UserService.onlineDeactivate(state.user._id);
    commit('setOnlineStatus', response.data.isOnline);
  }

};

const mutations = {

  setUser(state: UserStateInterface, user: User): void {
    state.user = user;
  },
  setToken(state: UserStateInterface, token: TokenInterface): void {
    state.token = token;
  },
  setExpiration(state: UserStateInterface, exp: number): void {
    state.exp = exp;
  },
  setOnlineStatus(state: UserStateInterface, isOnline: boolean): void {
    state.isOnline = isOnline;
  },
  logout(state: UserStateInterface): void {
    console.log('logout mutation hit');
    const defaultState = revertState();
    state.user = defaultState.user;
    state.token = defaultState.token;
    state.exp = defaultState.exp;
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};