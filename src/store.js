import Vue from 'vue'
import Vuex from 'vuex'
import data from './data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data,
    curPage: 1,
    perPage: 5,
    searchText: ''
  },

  getters: {
    fields: state => Object.keys(state.data[0]),

    // TODO: rewrite/optimize
    filteredData: state => {
      return state.data.filter(
        e =>
          Object.values(e)
            // .slice(1)
            .join('~')
            .toLowerCase()
            .indexOf(state.searchText.toLowerCase()) > -1
      )
    },

    rows: (state, getters) => {
      return getters.filteredData.slice(
        (state.curPage - 1) * state.perPage,
        state.curPage * state.perPage
      )
    },

    numPages: (state, getters) =>
      Math.ceil(getters.filteredData.length / state.perPage),

    getAverageAge: state => {
      // calculate average age
      return state.data
    },

    getAverageSalary: state => {
      // calculate average salary
      return state.data
    }
  },

  mutations: {
    set: (state, { key, value }) => (state[key] = value),
    setData: (state, payload) => (state.data = payload)
  },

  actions: {
    uploadData({ commit }, data) {
      console.log('~ uploading new JSON data ...')
      // alert('Upload successful')

      commit('setData', JSON.parse(data))
    }
  }
})
