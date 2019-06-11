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
    // ,averages: []
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

    getAverage: state => key => {
      let entries = Object.values(state.data).map(el => el[key])
      let avg = entries.reduce((total, entry) => total + entry) / entries.length
      return Math.ceil(avg)
    },

    getAverageSalary: state => {
      //TODO need to parse as number first
      let entries = Object.values(state.data).map(el => el['Salary'])
      console.log(entries)
      let avg = entries.reduce((total, entry) => total + entry) / entries.length
      console.log(avg)
      return Math.ceil(avg)
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
