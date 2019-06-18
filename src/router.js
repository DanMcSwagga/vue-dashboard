import Vue from 'vue'
import Router from 'vue-router'
import Table from './views/Table.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:page',
      name: 'home',
      component: Table
    }
  ]
})
