<script>
import * as service from '@/service/service.js'
import _ from 'lodash'
import AppTitle from '@/components/AppTitle.vue'
import Appointment from '@/components/Appointment.vue'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'

export default {
  name: 'Appointments',
  metaInfo() {
    return {
      titleTemplate: '%s | Randevular'
    }
  },
  components: {
    AppTitle,
    Appointment,
    AppInput,
    AppSelect
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
      list: [],
      loading: false,
      agent: null,
      agentList: [],
      dateOrder: null,
      dateOrderList: [
        { value: null, text: '-- Seçiniz --' },
        { value: 1, text: 'Tarihe Göre Artan' },
        { value: 2, text: 'Tarihe Göre Azalan' }
      ]
    }
  },
  created() {
    this.getAppointments()
    this.getAgents()
  },
  computed: {
    appointmentList() {
      let renderList = this.list
      if(this.agent != null) {
        renderList = renderList.filter(item => item.fields.agent_id[0] == this.agent)
      }
      // sort asc
      if(this.dateOrder == 1) {
        renderList = _.orderBy(renderList, 'fields.appointment_date', 'asc')
      }
      // sort desc
      else if(this.dateOrder == 2) {
        renderList = _.orderBy(renderList, 'fields.appointment_date', 'desc')
      }
      return renderList
    }
  },
  methods: {
    async getAppointments() {
      this.loading = true
      await service.getAppointments(this.offset).then(response => {
        // some data does not have all fields, just show not blank data
        this.list = response.records.filter(item => item.fields.agent_id)
      })
      this.loading = false
    },
    async getAgents() {
      await service.getAgents().then(response => {
        this.agentList = response.records.map(item => {
          return {
            value: item.id,
            text: `${item.fields.agent_name} ${item.fields.agent_surname}`
          }
        })
        this.agentList.unshift({
          value: null,
          text: '-- Tüm Emlakçılar --'
        })
      })
    },
  }
}
</script>

<template>
  <div class="appointments layout">
    <app-title text="Randevular" icon="calendar2-check-fill" />
    <div class="sub-layout">
      <b-row class="search" v-if="!loading">
        <b-col
          md="4"
          xs="12"
        >
          <app-select 
            v-model="agent"
            text="Emlakçı Filtrele"
            :options="agentList"
          />
        </b-col>
        <b-col
          md="4"
          xs="12"
        >
          <app-select 
            v-model="dateOrder"
            text="Tarihe Göre Sırala"
            :options="dateOrderList"
          />
        </b-col>
      </b-row>
      <div class="appointment-list" v-if="!loading">
        <appointment
          v-for="(item, index) in appointmentList"
          :key="index"
          :item="item"
        />
      </div>
      <div v-else class="loading">
        <b-spinner type="grow" label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.appointments {
  .search {
    justify-content: space-between;
  }
  .appointment-list { 
    margin-top: 16px;
    display: grid;
  }
  .loading {
    width: 100%;
    height: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media screen and (min-width: 1200px) {
  .appointments {
    .appointment-list {
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1199.9px) {
  .appointments {
    .appointment-list {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
  }
}

@media screen and (max-width: 767.9px) {
  .appointments {
    .appointment-list {
      grid-template-columns: 1fr;
      row-gap: 16px;
    }
  }
}
</style>