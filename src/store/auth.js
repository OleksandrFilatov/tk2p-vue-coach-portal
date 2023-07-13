import { apolloClient } from "../vue-apollo";
import gql from "graphql-tag";

export default {
  getters: {
    loggedInCoach: state => state.loggedInCoach
  },
  state: {
    loggedInCoach: null,
  },
  mutations: {
    loginCoach: function loginCoach(state, payload) {

      state.loggedInCoach = payload;
    },
  },
  actions: {
    async uploadCoachLogo({commit}, {coachId, base64Logo}) {

      const {data} = await apolloClient.mutate({
        variables: {
          coachId: parseInt(coachId),
          data : {
            coachLogo: base64Logo
          }
        },
        mutation: gql`

          mutation uploadCoachLogo($coachId: Float!, $data: CoachLogoInput!) {
            updateCoachLogo(coachId: $coachId, data: $data) {
              id
              firstName
              lastName
              companyName
              email
              status
              mobile
              password
              numPrograms
              numSubscribers
              numContentItems
              startDate
              createdAt
              updatedAt
              coachLogo
            }
          }
        
        `
      })


      if (data && data.updateCoachLogo?.id) {
        commit("loginCoach", data.updateCoachLogo);
      }
    },
    async attemptLogin({ commit }, { email, password }) {
      const {data} = await apolloClient.query({
        fetchPolicy: "network-only",
        query: gql`
          query coachLogin($password: String!, $email: String!) {
            coachLogin(password: $password, email: $email) {
              id
              firstName
              lastName
              companyName
              email
              status
              mobile
              password
              numPrograms
              numSubscribers
              numContentItems
              planMaxPrograms
              planMaxContentItems
              planSubscribers
              startDate
              createdAt
              updatedAt
              coachLogo
            }
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      });
      if (data && data.coachLogin?.id) {
        commit("loginCoach", data.coachLogin);
      }
    },
  },
};
