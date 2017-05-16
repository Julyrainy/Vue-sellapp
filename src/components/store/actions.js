export const actions = {
  add_foodscount ({commit}, food) {
    commit('ADD_FOODSCOUNT', food);
  },
  delete_foodscount ({commit}, food) {
    commit('DELETE_FOODSCOUNT', food);
  },
  empty_selectfoods ({commit}) {
    console.log('haha2');
    commit('EMPTY_SELECTFOODS');
  }
  /*
  set_activeball ({commit}, ball) {
    commit('SET_ACTIVEBALL', ball);
  }
  */
};
