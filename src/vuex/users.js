import axios from "axios";

const state = {
  users: [],
  isLoading: false,
  isError: false,
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setError(state, isError) {
    state.isError = isError;
  },
};

const actions = {
  getUsers({ commit }) {
    return axios("https://json.medrocket.ru/users/", {
      method: "GET",
    })
      .then(({ data }) => {
        commit("setUsers", data);
      })
      .catch(() => {
        commit("setError", true);
      });
  },
  getUser({ commit }, id) {
    commit("setLoading", true);
    return axios(`https://json.medrocket.ru/albums?userId=${id}`, {
      method: "GET",
    }).then(({ data }) => {
      commit("setLoading", false);
      return data;
    });
  },
  getAlbum({ commit }, albumId) {
    commit("setLoading", true);
    return axios(`https://json.medrocket.ru/photos?albumId=${albumId}`, {
      method: "GET",
    }).then(({ data }) => {
      commit("setLoading", false);
      return data;
    });
  },
};

const getters = {
  allUsers: (state) => {
    return state.users;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
