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
    <table class="table table-sm">
      <thead>
        <tr>
          <th
            v-for="(item, index) in fields"
            :key="index"
          >
            {{ item.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(item, index) in items"
          :key="index"
          :class="{ gray: new Date() > new Date(item.fields.appointment_date) }"
        >
          <td
            v-for="(field, index) in fields"
            :key="index"
          >
            <template v-if="typeof item.fields[field.name] == 'object'">
              {{ item.fields[field.name][0] }}
            </template>
            <template v-else>
              {{ item.fields[field.name] }}
            </template>
            <router-link to='/' v-if="field.name == 'update'">
              {{ field.text }}
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  overflow-x: scroll;
  ::v-deep {
    .table {
      margin: 10px 0;
      min-width: 1000px;
      th {
        font-weight: 600;
      }
      .gray {
        background-color: var(--gray-01);
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .table-container {
    ::v-deep {
      .table {
        th, td {
          font-size: 15px;
        }
      }
    }
  }
}

@media screen and (max-width: 991.9px) {
  .table-container {
    ::v-deep {
      .table {
        th, td {
          font-size: 14px;
        }
      }
    }
  }
}

</style>