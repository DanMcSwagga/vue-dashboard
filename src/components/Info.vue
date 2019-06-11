<template>
  <div class="info-wrapper">
    <h1>Main Info</h1>
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
    <hr />
    <span>
      Average age: <b>{{ getAverage('Age') }}</b>
    </span>
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
  padding: 0 16px 8px 16px;

  display: flex;
  flex-direction: column;
}
</style>
