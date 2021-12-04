<script>
export default {
  name: 'Table',
  props: [
    'items',
    'fields'
  ]
}
</script>

<template>
  <div class="table-container">
    <b-table 
      hover 
      small
      :items="items"
      :fields="fields"
    />
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  ::v-deep {
    .table {
      margin: 10px 0;
      th {
        font-weight: 600;
      }
      td {
        font-size: 15px;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .table-container {
    .table {
      td {
        font-size: 14px;
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .table-container {
    .table {
      td {
        font-size: 15px;
      }
    }
  }
}
</style>