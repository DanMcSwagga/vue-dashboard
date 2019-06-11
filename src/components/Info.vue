<template>
  <div class="info-wrapper">
    <h1>Main Info</h1>
    <span>
      Current page: <b>{{ curPage }}</b>
    </span>
    <span>
      Per-page visibility: <b>{{ perPage }}</b>
    </span>
    <span>
      Data entries: <b>{{ data.length }}</b>
    </span>
    <hr />
    <span>Averages...</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['curPage', 'perPage', 'data'])
  }
}
</script>

<style lang="scss" scoped>
.info-wrapper {
  border: 1px solid #ddd;
  padding: 8px 16px;

  display: flex;
  flex-direction: column;
}
</style>
