import { apolloClient } from "../vue-apollo";
import gql from "graphql-tag";

export default {
  getters: {
    getCurrentProgram: (state) => state.currentProgram,
    getProgramItems: (state) => state.programItems,
    getCurrentItem: (state) => state.currentProgramItem,
    fonts: (state) => state.fontFamilies,
    fontSizes: (state) => state.fontSizes,
    getCurrentProgramItem: (state) => state.currentProgramItem,
    getPrograms: (state) => state.coachPrograms,
  },
  state: {
    currentProgramItem: {},
    currentProgram: null,
    coachPrograms: null,
    programItems: null,
    fontFamilies: [
      {
        displayName: "Amatic SC Regular",
        fontName: "AmaticSC-Regular",
      },
      {
        displayName: "Anonymous Pro Regular",
        fontName: "AnonymousPro-Regular",
      },
      {
        displayName: "Caveat Regular",
        fontName: "Caveat-Regular",
      },
      {
        displayName: "Cinzel Decorative Regular",
        fontName: "CinzelDecorative-Regular",
      },
      {
        displayName: "Comfortaa Regular",
        fontName: "Comfortaa-Regular",
      },
      {
        displayName: "Great Vibes Regular",
        fontName: "GreatVibes-Regular",
      },
      {
        displayName: "Handlee Regular",
        fontName: "Handlee-Regular",
      },
      {
        displayName: "Indie Flower Regular",
        fontName: "IndieFlower-Regular",
      },
      {
        displayName: "Mountainsof Christmas Regular",
        fontName: "MountainsofChristmas-Regular",
      },
      {
        displayName: "Poiret One Regular",
        fontName: "PoiretOne-Regular",
      },
      {
        displayName: "Raleway Regular",
        fontName: "Raleway-Regular",
      },
      {
        displayName: "Righteous Regular",
        fontName: "Righteous-Regular",
      },
      {
        displayName: "Roboto Regular",
        fontName: "Roboto-Regular",
      },
    ],
    fontSizes: [
      {
        sizeName: "Extra Small",
        fontSize: "1.2rem",
      },
      {
        sizeName: "Small",
        fontSize: "1.4rem",
      },
      {
        sizeName: "Medium",
        fontSize: "1.5rem",
      },
      {
        sizeName: "Large",
        fontSize: "1.9rem",
      },
      {
        sizeName: "Extra Large",
        fontSize: "2.2rem",
      },
    ],
  },
  mutations: {
    setCoachPrograms: function setCoachPrograms (state, payload) {
      state.coachPrograms = payload
    },
    setProgramItems: function setProgramItems(state, payload) {
      state.programItems = payload;
    },
    setCurrentProgramItem: function setCurrentProgramItem(state, payload) {
      state.currentProgramItem = payload;
    },
    setCurrentProgram: function loginCoach(state, payload) {
      state.currentProgram = payload;
    },
    resetCurrentProgramItem: function resetProgramItem(state) {
      state.currentProgramItem = {}
    }
  },
  actions: {
    async updateProgramContentItem(
      _params,
      { programId, text, graphic, order, ...args }
    ) {
      const id = parseInt(args.id);
      delete args.id;
      const { data } = await apolloClient.mutate({
        variables: {
          id,
          data: {
            programId: programId,
            graphic,
            order,
            text,
            ...args,
          },
        },
        mutation: gql`
          mutation updateProgramItem($id: Float!, $data: ProgramItemInput!) {
            updateProgramItem(id: $id, data: $data) {
              id
            }
          }
        `,
      });
      if (data) {
        // await this.getProgramContentItems({commit}, {programId})
      }
    },
    async addProgramContentItem(
      { dispatch },
      { programId, text, graphic, order, contentType, ...args }
    ) {
      const { data } = await apolloClient.mutate({
        variables: {
          data: {
            programId,
            order,
            text,
            graphic,
            contentType,
            ...args
          },
        },
        mutation: gql`
          mutation createProgramItem($data: ProgramItemInput!) {
            createProgramItem(data: $data) {
              id
            }
          }
        `,
      });
      if (data) {
        await dispatch("getProgramContentItems", { programId });
      }
    },
    async getProgramContentItems({ commit }, { programId }) {
      const { data } = await apolloClient.query({
        variables: {
          programId: parseInt(programId),
        },
        query: gql`
          query fetchProgramContent($programId: Float!) {
            programItems(programId: $programId) {
              id
              order
              text
              graphic
              fontSize
              contentType
            }
          }
        `,
        fetchPolicy: "network-only",
      });
      commit("setProgramItems", data.programItems);
    },
    async getOneProgramContentItem({ commit }, { programItemId }) {
      const { data } = await apolloClient.query({
        variables: {
          programItemId: parseInt(programItemId),
        },
        query: gql`
          query fetchOneProgramContent($programItemId: Float!) {
            programItem(programItemId: $programItemId) {
                id
                order
                text
                graphic
                fontSize
                fontColor
                fontFamily
                textPositionY
                textPositionX
                logoUrl
                logoPositionY
                logoPositionX
                backgroundColor
                contentType
            }
          }
        `,
      });
      commit("setCurrentProgramItem", data.programItem);
    },

    async viewSelectedProgram({ commit }, { program }) {
      commit("setCurrentProgram", program);
    },
    async deleteProgramContentItem(
      { dispatch },
      { programItemId, programId }
    ) {
      
      const { data } = await apolloClient.mutate({
        variables: {
          id: programItemId,
        },
        mutation: gql`
          mutation deleteProgramItem($id: String!) {
            deleteProgramItem(id: $id) {
              id
            }
          }
        `,
      });
      if (data) {
        await dispatch("getProgramContentItems", { programId });
      }
    },
    async deleteProgram(
      { dispatch },
      { programId, coachId }
    ) {
      //Confirm Deletion
      const confirm = window.confirm("Are you sure you want to delete this program?")
      if(!confirm){
        return false;
      }
      const { data } = await apolloClient.mutate({
        variables: {
          id: programId,
        },
        mutation: gql`
          mutation deleteProgram($id: String!) {
            deleteProgram(id: $id) {
              id
            }
          }
        `,
      });
      if (data) {
        await dispatch("getCoachPrograms", { coachId });
      }
    },
    async getCoachPrograms(
      { commit },
      { coachId }
    ) {
      
      const { data } = await apolloClient.query({
        fetchPolicy: "no-cache",
        variables: {
          id: coachId,
        },
        query: gql`
          query getCoachPrograms($id: String!) {
            coach(id: $id) {
              id
              status
              firstName
              lastName
              email
              mobile
              numPrograms
              numSubscribers
              numContentItems
              programs {
                id
                name
                code
                numSubscribers
                numContentItems
              }
            }
          }
        `,
      });
      if (data) {
        await commit("setCoachPrograms", data.coach.programs);
      }
    },
  },
};
