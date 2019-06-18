<template>
  <nav>
    <ul>
      <li>
        <router-link
          :to="{ name: 'home', params: { page: curPage - 1 } }"
          v-if="curPage !== 1"
          @click.prevent="setPage(curPage - 1)"
        >
          Previous
        </router-link>
        <span v-else class="disabled">Previous</span>
      </li>

      <template v-if="numPages <= 6">
        <li v-for="n in numPages" :key="n">
          <router-link
            :to="{ name: 'home', params: { page: n } }"
            v-if="curPage !== n"
            @click.prevent="setPage(n)"
          >
            {{ n }}
          </router-link>
          <span v-else class="active">{{ n }}</span>
        </li>
      </template>

      <template v-else-if="numPages > 6 && curPage <= 4">
        <li v-for="n in 5" :key="n">
          <router-link
            :to="{ name: 'home', params: { page: n } }"
            v-if="curPage !== n"
            @click.prevent="setPage(n)"
          >
            {{ n }}
          </router-link>
          <span v-else class="active">{{ n }}</span>
        </li>
        <li>
          <span class="disabled">...</span>
        </li>
      </template>

      <template v-else-if="numPages > 6 && curPage > numPages - 4">
        <li>
          <span class="disabled">...</span>
        </li>
        <li
          v-for="n in [
            numPages - 4,
            numPages - 3,
            numPages - 2,
            numPages - 1,
            numPages
          ]"
          :key="n"
        >
          <router-link
            :to="{ name: 'home', params: { page: n } }"
            v-if="curPage !== n"
            @click.prevent="setPage(n)"
          >
            {{ n }}
          </router-link>
          <span v-else class="active">{{ n }}</span>
        </li>
      </template>

      <template v-else>
        <li>
          <router-link
            :to="{ name: 'home', params: { page: 1 } }"
            @click.prevent="setPage(1)"
          >
            {{ 1 }}
          </router-link>
        </li>
        <li>
          <span class="disabled">...</span>
        </li>
        <li v-for="n in [curPage - 1, curPage, curPage + 1]" :key="n">
          <router-link
            :to="{ name: 'home', params: { page: n } }"
            v-if="curPage !== n"
            @click.prevent="setPage(n)"
          >
            {{ n }}
          </router-link>
          <span v-else class="active">{{ n }}</span>
        </li>
        <li>
          <span class="disabled">...</span>
        </li>
        <li>
          <router-link
            :to="{ name: 'home', params: { page: numPages } }"
            @click.prevent="setPage(numPages)"
          >
            {{ numPages }}
          </router-link>
        </li>
      </template>

      <li>
        <router-link
          :to="{ name: 'home', params: { page: curPage + 1 } }"
          v-if="curPage !== numPages"
          @click.prevent="setPage(curPage + 1)"
        >
          Next
        </router-link>
        <span v-else class="disabled">Next</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['curPage']),
    ...mapGetters(['numPages'])
  },

  methods: {
    setPage(page) {
      this.$store.commit('set', { key: 'curPage', value: page })
    }
  },

  watch: {
    '$route.params.page': function(page) {
      console.log('reacting to route change from [Pagination], page: ' + page)
      this.setPage(page)
    }
  }
}
</script>

<style>
nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline-block;
}

nav ul li a {
  margin: 7px 2px;
  padding: 0 5px;
  display: block;
  text-decoration: none;
  color: #337ab7;
}

nav ul li span {
  margin: 5px 3px;
  padding: 2px 4px;
  display: block;
}

nav ul li span.active {
  /* color: #515a64; */
  color: #ffffff;
  background-color: #337ab7;
}

nav ul li span.disabled {
  color: #777;
  cursor: not-allowed;
}
</style>
