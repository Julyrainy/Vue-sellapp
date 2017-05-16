export const mutations = {
  ADD_FOODSCOUNT (state, food) {
    if (food.count === 1) {
      state.selectFoods.push(food);
      console.log(state.selectFoods);
    }
  },
  DELETE_FOODSCOUNT (state, food) {
    let selectFoods = state.selectFoods;
    for (let i = 0; i < selectFoods.length; i++) {
      if (selectFoods[i].name === food.name) {
        selectFoods.splice(i, 1);
        break;
      }
    }
  },
  EMPTY_SELECTFOODS (state) {
    let selectFoods = state.selectFoods;
    selectFoods.forEach((food) => {
      food.count = 0;
    });
    selectFoods.splice(0, selectFoods.length);
    console.log(state.selectFoods);
  }
  /*
  SET_ACTIVEBALL (state, ball) {
    state.ballActive = ball;
  }
  */
};
