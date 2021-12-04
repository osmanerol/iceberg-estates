<script>
import AppTitle from '@/components/AppTitle.vue'
import AppTable from '@/components/AppTable.vue'

export default {
  name: 'Appointments',
  metaInfo() {
    return {
      titleTemplate: '%s | Randevular'
    }
  },
  components: {
    AppTitle,
    AppTable
  },
  data() {
    return {
      fields: ['first_name', 'last_name', 'age'],
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  }
}
</script>

<template>
  <div class="appointments">
    <app-title text="Randevular" icon="calendar2-check-fill" />
    <div class="layout-container shadow">
      <app-table 
        :items="items" 
        :fields="fields"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>