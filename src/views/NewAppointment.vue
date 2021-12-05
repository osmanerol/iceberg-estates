<script>
import AppTitle from '@/components/AppTitle.vue'

export default {
  name: 'NewAppointment',
  metaInfo() {
    return {
      titleTemplate: '%s | Yeni Randevu Oluştur'
    }
  },
  components: {
    AppTitle
  }
}
</script>

<template>
  <div class="new-appointment layout">
    <app-title text="Yeni Randevu Oluştur" icon="calendar-plus-fill" />
  </div>
</template>

<style lang="scss" scoped>
</style>