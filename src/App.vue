<template>
  <div id="app" class="app">
    <div class="app-uploader">
      <Upload />
      <!-- this.$store.state.data = $event -->
    </div>

    <div class="app-header">
      <ShowItems />
      <SearchItems />
    </div>

    <TableData />

    <div class="app-footer">
      <Info />
      <Pagination />
    </div>
  </div>
</template>

<script>
import TableData from '@/components/Table.vue'
import ShowItems from '@/components/ShowItems.vue'
import SearchItems from '@/components/SearchItems.vue'
import Pagination from '@/components/Pagination.vue'
import Info from '@/components/Info.vue'
import Upload from '@/components/Upload.vue'

export default {
  name: 'app',

  components: {
    TableData,
    ShowItems,
    SearchItems,
    Pagination,
    Info,
    Upload
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  color: #73879c;
  font-size: 14px;
}

#app {
  & > div {
    display: flex;
    justify-content: space-between;
    padding: 8px 10px;
  }
  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
  }
}

.app-upload {
  padding: 10px 0;
}
</style>
