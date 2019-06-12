<template>
  <div class="info-wrapper">
    <h3>Main Info</h3>
    <span>
      Current page: <b>{{ curPage }}</b>
    </span>
    <span>
      Entries displayed per page: <b>{{ perPage }}</b>
    </span>
    <span>
      Data entries: <b>{{ data.length }}</b>
    </span>
    <span>
      Showing range: from <b>{{ range.from }}</b> to <b>{{ range.to }}</b>
    </span>
    <span class="search-span">
      Search text: <b>{{ searchText ? searchText : '___' }}</b>
    </span>
    <!-- <hr /> -->
    <!-- <span>Average age: <b>{{ getAverage('Age') }}</b></span> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['data', 'curPage', 'perPage', 'searchText']),
    ...mapGetters(['range', 'getAverage'])
  }
}
</script>

<style lang="scss" scoped>
.info-wrapper {
  border: 1px solid #ddd;
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
}
span {
  margin: 2px 0;
}
.search-span {
  & > b {
    text-decoration: underline;
    // border-bottom: 1px solid #73879c;
  }
}
</style>
