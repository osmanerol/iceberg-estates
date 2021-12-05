<script>
export default {
  name: 'Appointment',
  props: [
    'item'
  ],
  methods: {
    update() {
      if(new Date() > new Date(this.item.fields.appointment_date)) {
        this.$bvToast.toast('Geçmiş tarihli rezervasyonu güncelleyemezsiniz.', {
          title: 'Bilgi',
          autoHideDelay: 8000,
          variant: 'warning'
        })
      }
      else {
        this.$router.push('/new-appointment')
      }
    }
  }
}
</script>

<template>
  <div class="appointment" :class="{ disabled : new Date() > new Date(item.fields.appointment_date) }">
    <div class="agent-info">
      <h6>Emlakçı</h6>
      <div class="contact-item"> 
        <span class="sub-title">Ad Soyad : </span>
        <span class="sub-text">{{ item.fields.agent_name[0] }} {{ item.fields.agent_surname[0] }} </span>
      </div>
    </div>
    <div class="contact-info">
      <h6>Müşteri</h6>
      <div class="contact-item"> 
        <span class="sub-title">Ad Soyad : </span>
        <span class="sub-text">{{ item.fields.contact_name[0] }} {{ item.fields.contact_surname[0] }}</span>
      </div>
      <div class="contact-item"> 
        <span class="sub-title">E-posta : </span>
        <span class="sub-text">{{ item.fields.contact_email[0] }}</span>
      </div>
      <div class="contact-item"> 
        <span class="sub-title">Telefon No :</span>
        <span class="sub-text">{{ item.fields.contact_phone[0] }}</span>
      </div>
    </div>
    <div class="appointment-info">
      <h6>Randevu</h6>
      <div class="contact-item"> 
        <span class="sub-title">Tarih : </span>
        <span class="sub-text">{{ new Date(item.fields.appointment_date).toLocaleString() }}</span>
      </div>
      <div class="contact-item"> 
        <span class="sub-title">Posta Kodu : </span>
        <span class="sub-text">{{ item.fields.appointment_postcode }}</span>
      </div>
    </div>
    <div class="update">
      <b-btn size="sm" @click="update">Güncelle</b-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.disabled {
  background-color: rgba(0, 0, 0, .08)! important;
}
.appointment {
  background-color: var(--white-01);
  border-radius: 2px;
  padding: 6px;
  height: 100%;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
  h6 {
    margin-bottom: 6px;
  }
  .agent-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    text-transform: capitalize;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--gray-01);
    span {
      font-size: 15px;
    }
  }
  .contact-info {
    padding: 4px 0; 
    border-bottom: 1px solid var(--gray-01);
    .contact-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      font-size: 15px;
      .sub-title {
        font-weight: 500;
        margin-right: 4px;
      }
    }
  }
  .appointment-info {
    padding-top: 4px;
    .contact-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      font-size: 15px;
      .sub-title {
        font-weight: 500;
        margin-right: 4px;
      }
    }
  }
  .update {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
    .btn {
      background-color: var(--blue-02);
    }
  }
}

</style>