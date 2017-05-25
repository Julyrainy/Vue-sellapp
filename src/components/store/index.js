import Vue from 'vue';
import Vuex from 'vuex';
import {mutations} from './mutations';
import {actions} from './actions';

Vue.use(Vuex);

const state = {
  seller: {},
  goods: {},
  selectFoods: [],
  foodDetail: {}
  // ballActive: {}
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
