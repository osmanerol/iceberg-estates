<script>
import * as service from '@/service/service.js'
import axios from 'axios'
import AppTitle from '@/components/AppTitle.vue'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppLoading from '@/components/AppLoading.vue'
import { gmapApi } from 'vue2-google-maps'
import { required, email, minValue } from 'vuelidate/lib/validators'
import moment from 'moment'

export default {
  name: 'CreateAppointment',
  metaInfo() {
    return {
      titleTemplate: '%s | Randevu Güncelle'
    }
  },
  components: {
    AppTitle,
    AppInput,
    AppSelect,
    AppLoading
  },
  data() {
    return {
      moment,
      id: null,
      centerPostCode: 'CM27PJ',
      center: { },
      markers: [],
      distanceInfo: null,
      destinationCoordinates: {},
      agentTimeInfo: {},
      agentList: [],
      requestObject: {
        appointment_date: null,
        appointment_postcode: null,
        agent_id: null,
        contact_name: null,
        contact_surname: null,
        contact_phone: null,
        contact_email: null,
        contact_id: null
      },
      requiredText: 'Bu alan zorunludur',
      minDateText: 'Randevu tarihi en erken şimdi olabilir',
      emailErrorText: 'E-posta formatına uygun değil',
      loading: false,
      submitLoading: false,
      showError: false
    }
  },
  validations: {
    requestObject: {
      appointment_date: {
        required,
        minValue: value =>{
          return new Date(value).getTime() > new Date().getTime()
        }
      },
      appointment_postcode: {
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
  async created() {
    this.getAgents()
    this.id = this.$route.params.id
    if(this.id) {
      await this.getAppointment()
    }
  },
  computed: {
    google: gmapApi,
    destinationInformation() {
      return {
        leaveOfficeTime: new Date(new Date(this.requestObject.appointment_date).getTime() - this.distanceInfo.duration.value * 1000),
        arriveOfficeTime: new Date(new Date(this.requestObject.appointment_date).getTime() + 60 * 60000 + this.distanceInfo.duration.value * 1000)
      }
    },
    appointmentDateErrors() {
      let errors = []
      if (!this.$v.requestObject.appointment_date.$dirty) 
        return errors
      !this.$v.requestObject.appointment_date.required && 
        errors.push(this.requiredText)
      !this.$v.requestObject.appointment_date.minValue && 
        errors.push(this.minDateText)
      return errors 
    },
    appointmentPostCodeErrors() {
      let errors = []
      if (!this.$v.requestObject.appointment_postcode.$dirty) 
        return errors
      !this.$v.requestObject.appointment_postcode.required && 
        errors.push(this.requiredText)
      return errors 
    },
    agentIdErrors() {
      let errors = []
      if (!this.$v.requestObject.agent_id.$dirty) 
        return errors
      !this.$v.requestObject.agent_id.required && 
        errors.push(this.requiredText)
      return errors 
    },
    contactNameErrors() {
      let errors = []
      if (!this.$v.requestObject.contact_name.$dirty) 
        return errors
      !this.$v.requestObject.contact_name.required && 
        errors.push(this.requiredText)
      return errors 
    },
    contactSurnameErrors() {
      let errors = []
      if (!this.$v.requestObject.contact_surname.$dirty) 
        return errors
      !this.$v.requestObject.contact_surname.required && 
        errors.push(this.requiredText)
      return errors 
    },
    contactEmailErrors() {
      let errors = []
      if (!this.$v.requestObject.contact_email.$dirty) 
        return errors
      !this.$v.requestObject.contact_email.required && 
        errors.push(this.requiredText)
      !this.$v.requestObject.contact_email.email && 
        errors.push(this.emailErrorText)
      return errors 
    },
    contactPhoneErrors() {
      let errors = []
      if (!this.$v.requestObject.contact_phone.$dirty) 
        return errors
      !this.$v.requestObject.contact_phone.required && 
        errors.push(this.requiredText)
      return errors 
    }
  },
  methods: {
    async getAppointment() {
      this.loading = true
      await service.getAppointment(this.id).then(async response => {
        this.requestObject = {
          appointment_date: response.fields.appointment_date.substring(0, 16),
          appointment_postcode: response.fields.appointment_postcode,
          agent_id: response.fields.agent_id[0],
          contact_id: response.fields.contact_id[0],
          contact_name: response.fields.contact_name[0],
          contact_surname: response.fields.contact_surname[0],
          contact_phone: response.fields.contact_phone[0],
          contact_email: response.fields.contact_email[0]
        }
        this.center = await this.getCoordinate(this.centerPostCode)
        this.destinationCoordinates = await this.getCoordinate(response.fields.appointment_postcode)
        this.markers = [{
          position: this.destinationCoordinates
        }]
      }).catch(error => {
        this.showError = true
      })
      if(!this.showError) {
        this.calculateDistance()
      }
      this.loading = false
    },
    async getCoordinate(postCode) {
      let axiosInstance = axios.create()
      delete axiosInstance.defaults.headers.common['Authorization']
      return await axiosInstance.get(`https://api.postcodes.io/postcodes/${postCode}`).then(response => {
        return  {
          lat: response.data.result.latitude,
          lng: response.data.result.longitude
        }
      })
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
          text: '-- Seçiniz --',
          disabled: true
        })
      })
    },
    setLocation(location) {
      if(location) {
        this.destinationCoordinates = {
          lat: location.latLng.lat(),
          lng: location.latLng.lng()
        }
        this.calculateDistance()
        let axiosInstance = axios.create()
        delete axiosInstance.defaults.headers.common['Authorization']
        axiosInstance.get(`https://api.postcodes.io/postcodes/lon/${this.destinationCoordinates.lng}/lat/${this.destinationCoordinates.lat}`).then(response => {
          if(response) {
            this.requestObject.appointment_postcode = response.data.result[0].postcode
          }
        })
      }
    },
    calculateDistance() {
      this.$gmapApiPromiseLazy().then(() => {
        const origin = new this.google.maps.LatLng(this.center.lat, this.center.lng)
        const destination = new this.google.maps.LatLng(this.destinationCoordinates.lat, this.destinationCoordinates.lng)
        const service = new this.google.maps.DistanceMatrixService()
        service.getDistanceMatrix({
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        }).then(response => {
          this.distanceInfo = response.rows[0].elements[0]
        })
      })
    },
    async save() {
      this.$v.$touch()
      if(!this.$v.$invalid) {
        this.submitLoading = true
        const contactObject = {
          contact_name: this.requestObject.contact_name,
          contact_surname: this.requestObject.contact_surname,
          contact_email: this.requestObject.contact_email,
          contact_phone: this.requestObject.contact_phone,
        }
        await service.updateContact({
          records: [
            {
              id: this.requestObject.contact_id,
              fields: contactObject
            }
          ]
        }).then(async response => {
          const appointmentObject = {
            appointment_date: this.requestObject.appointment_date,
            appointment_postcode: this.requestObject.appointment_postcode,
            contact_id: [
              this.requestObject.contact_id
            ],
            agent_id: [
              this.requestObject.agent_id
            ]
          }
          await service.updateAppointment({
            records: [
              {
                id: this.id,
                fields: appointmentObject
              }
            ]
          }).then(response => {
            if(response.records) {
              this.$bvToast.toast('Randevu başarıyla güncellenmiştir.', {
                title: 'Başarılı',
                autoHideDelay: 2000,
                variant: 'success'
              })
              setTimeout(() => {
                this.$router.push('/appointments')
              }, 2000)
            }
          })
        })
      }
    }
  }
}
</script>

<template>
  <div class="create-appointment layout">
    <app-title text="Randevu Güncelle" icon="calendar2-date-fill" />
    <div class="sub-layout">
      <app-loading v-if="loading" />
      <div class="not-found" v-if="!loading && showError">
        <img src="@/assets/images/404.svg" alt="not-found">
        <h3>Kayıt bulunamadı.</h3>
        <router-link to="/appointments">Randevulara Dön</router-link>
      </div>
      <template v-if="!loading && !showError">
        <div>
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
                type="datetime-local"
                :min="moment().format('YYYY-MM-DDTHH:MM')"
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
                text="Posta Kodu"
                v-model="requestObject.appointment_postcode"
                :disabled="true"
              />
              <p
                v-if="appointmentPostCodeErrors.length"
                class="error"
              >
                {{ appointmentPostCodeErrors[0] }}
              </p>
            </b-col>
          </b-row>
          <small>İmleci randevu adresi üzerine getiriniz.</small>
          <GmapMap
            v-if="Object.keys(destinationCoordinates).length > 0"
            :center="destinationCoordinates"
            :zoom="14"
            map-type-id="terrain"
            style="width:100%; height: 400px;"
          >
            <GmapMarker
              :position="destinationCoordinates"
              :draggable="true"
              @dragend="setLocation"
            />
          </GmapMap>
          <b-row 
            v-if="distanceInfo"
            class="distance-info-container"
          >
            <b-col 
              class="distance-info"
              md="6" 
              xs="12"
            >
              <div class="distance-item">
                <span>Ofise Uzaklık : </span>
                <span>{{ distanceInfo.distance.text }}</span>
              </div>
              <div class="distance-item">
                <span>Ofisten Süre (Araba) : </span>
                <span>{{ distanceInfo.duration.text }}</span>
              </div>
              <div class="distance-item">
                <span>Randevu Süresi : </span>
                <span>1 saat</span>
              </div>
              <template v-if="requestObject.appointment_date">
                <div>
                  <div class="distance-item">
                    <span>Tahmini Ofisten Çıkış : </span>
                    <span>{{ new Date(destinationInformation.leaveOfficeTime).toLocaleString() }}</span>
                  </div>
                  <div class="distance-item">
                    <span>Emlakçının Sıradaki Müsaitliği : </span>
                    <span>{{ new Date(destinationInformation.arriveOfficeTime).toLocaleString() }}</span>
                  </div>
                </div>
              </template>
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
            class="submit-button mt-3"
            :disabled="submitLoading"
          >
            Güncelle
          </b-btn>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-appointment {
  .not-found {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    img {
      max-width: 400px;
      height: 300px;
      margin-bottom: 20px;
    }
    h3 {
      font-size: 20px;
    }
  }
  .distance-info-container {
    margin: 10px 0;
    .distance-info {
      background-color: var(--white-01);
      border-radius: 2px;
      padding: 10px;
      font-size: 14px;
      .distance-item {
        span:first-child {
          font-weight: 500;
        }
        &:not(:last-child) {
          margin-bottom: 4px;
        }
      }
    }
  }
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
  .submit-button {
    background-color: var(--blue-01);
  }
}
</style>