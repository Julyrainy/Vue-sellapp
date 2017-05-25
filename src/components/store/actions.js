export const actions = {
  add_foodscount ({commit}, food) {
    commit('ADD_FOODSCOUNT', food);
  },
  delete_foodscount ({commit}, food) {
    commit('DELETE_FOODSCOUNT', food);
  },
  empty_selectfoods ({commit}) {
    commit('EMPTY_SELECTFOODS');
  },
  set_activefood ({commit}, food) {
    commit('SET_ACTIVEFOOD', food);
  }
  /*
  set_activeball ({commit}, ball) {
    commit('SET_ACTIVEBALL', ball);
  }
  */
};
