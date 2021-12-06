<script>
export default {
  name: 'NotFound'
}
</script>

<template>
  <div class="layout not-found-page">
    <img src="@/assets/images/404.svg" alt="not-found">
    <h3>Aradığınız sayfa bulunamadı.</h3>
    <router-link to="/appointments">Randevulara Dön</router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found-page {
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
</style>