<template>
  <div>
    <table>
      <thead>
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="`f${index}`"
            @click="setKeyOrder(fields[index])"
            :class="
              sortKey === fields[index] ? (order ? 'sortDesc' : 'sortAsc') : ''
            "
          >
            <!-- Alternative to class arrow sorting -->
            <!-- {{ field }} {{ sortKey === fields[index] ? arrows[+order] : '' }} -->
            <span v-html="field" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in rows" :key="`r${index}`">
          <!-- @focus="event => onInput(event, index, key)" -->
          <td
            v-for="(item, key) in row"
            :key="`r${key}`"
            contenteditable="true"
            @input="event => onInput(event)"
            @blur="onSave(index, key)"
          >
            <span v-html="replaceText(item.toString())" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Table',

  data: () => ({
    // arrows: ['↑', '↓'],
    editedCell: ''
  }),

  computed: {
    ...mapState(['searchText', 'sortKey', 'order']),
    ...mapGetters(['fields', 'rows'])
  },

  methods: {
    replaceText(text) {
      return text.replace(
        new RegExp('(' + this.searchText + ')', 'gim'),
        '<i>$1</i>'
      )
    },

    setKeyOrder(key) {
      this.$store.dispatch('updateKeyOrder', key)
    },

    onInput(event) {
      console.log('------------')
      console.log('reading data: ' + event.target.innerText.trim())
      console.log('edited cell [was]: ' + this.editedCell)

      this.editedCell = event.target.innerText.trim()

      console.log('edited cell [is]: ' + this.editedCell)
    },

    onSave(index, key) {
      console.log('============')
      console.log('saving data [was]: ' + this.$store.state.data[index][key])
      console.log('edited cell is: ' + this.editedCell)

      this.$store.state.data[index][key] =
        this.editedCell.length !== 0
          ? this.editedCell
          : this.$store.state.data[index][key]

      console.log('saving data [is]: ' + this.$store.state.data[index][key])

      this.editedCell = ''

      // saving new data into a JSON file her, if needed
    }
  },

  created() {
    // debugger
    this.$store.state.curPage = Number.parseInt(this.$route.params.page)
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
  font-size: 14px !important;
}

i {
  display: inline-block;
  font-style: normal;
  background-color: yellow;
}
</style>
