import Vue from 'vue'
import Vuex from 'vuex'
import data from './data/data'

import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data,
    curPage: 1,
    perPage: 5,
    searchText: '',
    sortKey: '',
    order: true
  },

  getters: {
    fields: state => Object.keys(state.data[0]),

    sortedData: state => {
      return _.orderBy(
        state.data,
        [entry => entry[state.sortKey]],
        state.order ? 'asc' : 'desc'
      )
    },

    filteredData: (state, getters) => {
      return getters.sortedData.filter(
        e =>
          Object.values(e)
            // .join('~')
            // .toLowerCase()
            // .indexOf(state.searchText.toLowerCase()) > -1
            .filter(
              x =>
                x
                  .toString()
                  .toLowerCase()
                  .indexOf(state.searchText.toString().toLowerCase()) > -1
            ).length > 0
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

    range: state => ({
      from: (state.curPage - 1) * state.perPage + 1,
      to:
        state.curPage * state.perPage > state.data.length
          ? state.data.length
          : state.curPage * state.perPage
    }),

    getAverage: state => key => {
      return Math.ceil(
        Object.values(state.data)
          .map(el => el[key])
          .reduce((total, entry) => total + entry) / state.data.length
      )
    },

    parseSalary: () => str => {
      Number(parseInt(str.slice(1).replace(/,/g, '')))
    }
  },

  mutations: {
    set: (state, { key, value }) => (state[key] = value),

    setData: (state, payload) => (state.data = payload),

    setKeyOrder: (state, key) => {
      if (state.sortKey === key) state.order = !state.order
      state.sortKey = key
    }
  },

  actions: {
    uploadData({ commit }, data) {
      console.log('~ uploading new JSON data ...')
      // alert('Upload successful')
      commit('setData', JSON.parse(data))
    },

    updateKeyOrder({ commit }, key) {
      console.log('~~ setting key: ' + key)
      commit('setKeyOrder', key)
    }
  }
})
