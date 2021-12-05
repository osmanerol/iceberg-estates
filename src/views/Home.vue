<script>
export default {
  name: 'Home',
  metaInfo() {
    return {
      titleTemplate: '%s | Anasayfa'
    }
  }
}
</script>

<template>
  <div class="home">
    <div class="overlay">
    </div>
    <div class="info">
      <h1>Iceberg Estate</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  background-image: url('../assets/images/home-estate.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  .overlay {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0;
    background-color: rgba(0, 0, 0, .6);
  }
  .info {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--white-01);
  }
}

@media screen and (max-width: 992px) {
  .home {
    height: calc(100vh - 66px);
    max-height: -webkit-fill-available;
    .info {
      h1 {
        font-size: 28px;
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .home {
    height: 100vh;
    .info {
      h1 {
        font-size: 40px;
      }
    }
  }
}
</style>