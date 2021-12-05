<script>
import * as service from '@/service/service.js'
import AppTitle from '@/components/AppTitle.vue'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'CreateAppointment',
  metaInfo() {
    return {
      titleTemplate: '%s | Yeni Randevu Oluştur'
    }
  },
  components: {
    AppTitle,
    AppInput,
    AppSelect
  },
  data() {
    return {
      agentList: [],
      requestObject: {
        appointment_date: null,
        appointment_time: null,
        appointment_post_code: null,
        agent_id: null,
        contact_name: null,
        contact_surname: null,
        contact_phone: null,
        contact_email: null,
      },
      requiredText: 'Bu alan zorunludur',
      emailErrorText: 'E-posta formatına uygun değil'
    }
  },
  validations: {
    requestObject: {
      appointment_date: {
        required
      },
      appointment_time: {
        required
      },
      appointment_post_code: {
        required
      },
      agent_id: {
        required
      },
      contact_name: {
        required
      },
      contact_surname: {
        required
      },
      contact_email: {
        required,
        email
      },
      contact_phone: {
        required
      },
    }
  },
  created() {
    this.getAgents()
  },
  computed: {
    appointmentDateErrors() {
      let errors = [];
      if (!this.$v.requestObject.appointment_date.$dirty) 
        return errors;
      !this.$v.requestObject.appointment_date.required && 
        errors.push(this.requiredText)
      return errors 
    },
    appointmentTimeErrors() {
      let errors = [];
      if (!this.$v.requestObject.appointment_time.$dirty) 
        return errors;
      !this.$v.requestObject.appointment_time.required && 
        errors.push(this.requiredText)
      return errors 
    },
    appointmentPostCodeErrors() {
      let errors = [];
      if (!this.$v.requestObject.appointment_post_code.$dirty) 
        return errors;
      !this.$v.requestObject.appointment_post_code.required && 
        errors.push(this.requiredText)
      return errors 
    },
    agentIdErrors() {
      let errors = [];
      if (!this.$v.requestObject.agent_id.$dirty) 
        return errors;
      !this.$v.requestObject.agent_id.required && 
        errors.push(this.requiredText)
      return errors 
    },
    contactNameErrors() {
      let errors = [];
      if (!this.$v.requestObject.contact_name.$dirty) 
        return errors;
      !this.$v.requestObject.contact_name.required && 
        errors.push(this.requiredText)
      return errors 
    },
    contactSurnameErrors() {
      let errors = [];
      if (!this.$v.requestObject.contact_surname.$dirty) 
        return errors;
      !this.$v.requestObject.contact_surname.required && 
        errors.push(this.requiredText)
      return errors 
    },
    contactEmailErrors() {
      let errors = [];
      if (!this.$v.requestObject.contact_email.$dirty) 
        return errors;
      !this.$v.requestObject.contact_email.required && 
        errors.push(this.requiredText)
      !this.$v.requestObject.contact_email.email && 
        errors.push(this.emailErrorText)
      return errors 
    },
    contactPhoneErrors() {
      let errors = [];
      if (!this.$v.requestObject.contact_phone.$dirty) 
        return errors;
      !this.$v.requestObject.contact_phone.required && 
        errors.push(this.requiredText)
      return errors 
    }
  },
  methods: {
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
          text: '-- Seçiniz --',
          disabled: true
        })
      })
    },
    async save() {
      this.$v.$touch();
      if(!this.$v.invalid) {

      }
    }
  }
}
</script>

<template>
  <div class="create-appointment layout">
    <app-title text="Yeni Randevu Oluştur" icon="calendar-plus-fill" />
    <div class="sub-layout">
      <h5>Emlakçı Bilgileri</h5>
      <b-row>
        <b-col lg="4" sm="6" xs="12">
          <app-select 
            v-model="requestObject.agent_id"
            text="Emlakçı"
            :options="agentList"
          />
          <p
            v-if="agentIdErrors.length"
            class="error"
          >
            {{ agentIdErrors[0] }}
          </p>
        </b-col>
      </b-row>
      <hr>
      <h5>Randevu Bilgileri</h5>
      <b-row>
        <b-col lg="4" sm="6" xs="12">
          <app-input
            text="Tarih"
            v-model="requestObject.appointment_date"
            type="date"
          />
          <p
            v-if="appointmentDateErrors.length"
            class="error"
          >
            {{ appointmentDateErrors[0] }}
          </p>
        </b-col>
        <b-col lg="4" sm="6" xs="12">
          <app-input
            text="Saat"
            v-model="requestObject.appointment_time"
            type="time"
          />
          <p
            v-if="appointmentTimeErrors.length"
            class="error"
          >
            {{ appointmentTimeErrors[0] }}
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" sm="6" xs="12">
          <app-input
            text="Posta Kodu"
            v-model="requestObject.appointment_post_code"
          />
          <p
            v-if="appointmentPostCodeErrors.length"
            class="error"
          >
            {{ appointmentPostCodeErrors[0] }}
          </p>
        </b-col>
      </b-row>
      <hr> 
      <h5>Müşteri Bilgileri</h5>
      <b-row>
        <b-col lg="4" sm="6" xs="12">
          <app-input
            text="Ad"
            v-model="requestObject.contact_name"
          />
          <p
            v-if="contactNameErrors.length"
            class="error"
          >
            {{ contactNameErrors[0] }}
          </p>
        </b-col>
        <b-col lg="4" sm="6" xs="12">
          <app-input
            text="Soyad"
            v-model="requestObject.contact_surname"
          />
          <p
            v-if="contactSurnameErrors.length"
            class="error"
          >
            {{ contactSurnameErrors[0] }}
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" sm="6" xs="12">
          <app-input
            text="E-posta"
            v-model="requestObject.contact_email"
            type="email"
          />
          <p
            v-if="contactEmailErrors.length"
            class="error"
          >
            {{ contactEmailErrors[0] }}
          </p>
        </b-col>
        <b-col lg="4" sm="6" xs="12">
          <app-input
            text="Telefon No"
            v-model="requestObject.contact_phone"
            type="tel"
          />
          <p
            v-if="contactPhoneErrors.length"
            class="error"
          >
            {{ contactPhoneErrors[0] }}
          </p>
        </b-col>
      </b-row>
      <b-btn
        size="sm"
        @click="save"
        class="mt-3"
      >
        Kaydet
      </b-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-appointment {
  h5 {
    font-size: 18px;
  }
  .error {
    color: var(--red-01);
    font-size: 10px;
    margin-bottom: 8px;
  }
  hr {
    margin: 10px 0 16px 0;
  }
}
</style>