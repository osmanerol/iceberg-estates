<script>
import * as service from '@/service/service.js'
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
      fields: [
        { name: 'agent_name', text: 'Emlakçı Adı' },
        { name: 'agent_surname', text: 'Emlakçı Soyadı' },
        { name: 'appointment_postcode', text: 'Rezervasyon Posta Kodu' },
        { name: 'contact_name', text: 'Müşteri Adı' },
        { name: 'contact_surname', text: 'Müşteri Soyadı' },
        { name: 'contact_phone', text: 'Müşteri Telefonu' },
        { name: 'contact_email', text: 'Müşteri E-posta' },
        { name: 'update', text: 'Güncelle' },
      ],
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],
      list: []
    }
  },
  created() {
    this.getAppointments()
  },
  methods: {
    async getAppointments() {
      await service.getAppointments().then(response => {
        // some data does not have all fields, just show not blank data
        this.list = response.records.filter(item => item.fields.agent_id)
      })
    }
  }
}
</script>

<template>
  <div class="appointments layout">
    <app-title text="Randevular" icon="calendar2-check-fill" />
    <div class="sub-layout shadow">
      <app-table 
        :items="list" 
        :fields="fields"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>