import { apolloClient } from "../vue-apollo";
import gql from "graphql-tag";

export default {
  getters: {
    getDefaultBgs: (state) => state.defaultLibraryItems,
    getUserBgs: (state) => state.userLibraryItems,
    allBgs: (state) => [
      ...state.defaultLibraryItems,
      ...state.userLibraryItems,
    ],
  },
  state: {
    error: null,
    defaultLibraryItems: [],
    userLibraryItems: [],
  },
  mutations: {
    setStockBgs: function setStockBgs(state, payload) {
      state.defaultLibraryItems = payload.map(item => ({...item, imageFor: "stock"}));
    },
    setCoachBgs: function setCoachBgs(state, payload) {
      state.userLibraryItems = payload.map(item => ({...item, imageFor: "coach"}));
    },
  },
  actions: {
    async uploadCoachBackground({ dispatch, commit }, { imageData, name, coachId }) {
      const { data } = await apolloClient.mutate({
        variables: {
          data: {
            url: imageData,
            name,
            coachId
          },
        },
        mutation: gql`
          mutation createCoachkBg($data: CoachBackgroundInput!) {
            createCoachBackground(data: $data) {
              id
            }
          }
        `,
      }).catch(error => commit('setError', error));
      if (data) {
        await dispatch("getCoachBackgrounds", {coachId});
      }
    },
    async deleteCoachBackground({ dispatch, commit }, { coachId, id }) {
      const { data } = await apolloClient.mutate({
        variables: {
          id,
        },
        mutation: gql`
          mutation deleteCoachBg($id: String!) {
            deleteCoachBackground(id: $id) {
              id
            }
          }
        `,
      }).catch(error => commit('setError', error));
      if (data) {
        await dispatch("getCoachBackgrounds", {coachId});
      }
    },
    async getStockBackgrounds({ commit }) {
      const { data } = await apolloClient.query({
        fetchPolicy: "network-only",
        query: gql`
          query fetchStockBgs {
            stockBackgrounds {
              id
              name
              url
            }
          }
        `,
      }).catch(error => commit('setError', error));
      commit("setStockBgs", data.stockBackgrounds);
    },
    async getCoachBackgrounds({ commit }, {coachId}) {
      const { data } = await apolloClient.query({
        fetchPolicy: "network-only",
        query: gql`
          query fetchCoachBgs {
            coachBackgrounds (coachId: ${coachId}) {
              id
              name
              url
            }
          }
        `,
      }).catch(error => commit('setError', error));
      commit("setCoachBgs", data.coachBackgrounds);
    },

  },
};
