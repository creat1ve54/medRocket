const state = {
  favorites: [],
  isLoading: false,
};

const mutations = {
  setFavorite(state, favorite) {
    state.favorites.push(favorite);
  },
  setFavorites(state, favorites) {
    state.favorites = favorites;
  },
};

const actions = {
  saveFavorite(context, favorite) {
    context.commit("setFavorite", favorite);
  },
  saveFavorites(context, favorites) {
    context.commit("setFavorites", favorites);
  },
};

const getters = {
  allFavorites: (state) => {
    return state.favorites;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
