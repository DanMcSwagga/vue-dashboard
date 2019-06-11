<template>
  <div>
    <table>
      <thead>
        <!-- <th @click="setOrder('name')"> -->
        <!-- {{ fields[0] }} {{ sortKey === 'name' ? arrows[+order] : '' }} -->
        <!-- </th> -->
        <!-- <th @click="setOrder('passed')"> -->
        <!-- {{ fields[2] }} -->
        <!-- {{ sortKey === 'passed' ? arrows[+order] : '' }} -->
        <!-- </th> -->

        <tr>
          <th
            v-for="(field, index) in fields"
            :key="`f${index}`"
            @click="setKeyOrder(fields[index])"
          >
            {{ field }} {{ sortKey === fields[index] ? arrows[+order] : '' }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in sortedRows" :key="`r${index}`">
          <td v-for="(item, key) in row" :key="`r${key}`">
            <span v-html="replaceText(item.toString())" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'Table',

  data() {
    return {
      arrows: ['↑', '↓'],

      // TODO: remake using store
      sortKey: '',
      order: false
    }
  },

  computed: {
    ...mapState(['searchText']),
    ...mapGetters(['fields', 'rows']),

    sortedRows() {
      return _.orderBy(
        this.rows,
        [row => row[this.sortKey]],
        this.order ? 'asc' : 'desc'
      )
    }
  },

  methods: {
    replaceText(text) {
      return text.replace(
        new RegExp('(' + this.searchText + ')', 'gim'),
        '<i>$1</i>'
      )
    },

    setKeyOrder(key) {
      console.log('setting key & order: ' + key)
      if (this.sortKey === key) this.order = !this.order
      this.sortKey = key
    }
  }
}
</script>

<style lang="scss">
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 5px;
}

tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

th {
  text-align: left;
  border: 1px solid #ddd;
  border-bottom: 3px solid #ddd;
  font-family: 'Glyphicons Halflings';
  position: relative;
  cursor: pointer;
}

th::after {
  content: '';
  position: absolute;
  top: 12px;
  right: 8px;
  display: block;
  opacity: 0.2;
  font-size: 0.7em;
}

th.sortAsc::after {
  content: '\25b2';
  opacity: 0.8;
}

th.sortDesc::after {
  content: '\25bc';
  opacity: 0.8;
}

td {
  border: 1px solid #ddd;
}

td,
th {
  padding: 8px;
}

i {
  display: inline-block;
  font-style: normal;
  background-color: yellow;
}
</style>
