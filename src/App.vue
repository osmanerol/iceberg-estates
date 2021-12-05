<script>
import AppSidebar from './components/AppSidebar.vue'

export default {
  name: 'App',
  metaInfo() {
    return {
      title: 'Iceberg Estates',
    }
  },
  components: {
    AppSidebar
  }
}
</script>

<template>
  <div id="app">
    <div class="sidebar-container">
      <app-sidebar />
    </div>
    <div class="page-container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 992px) {
  #app {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .sidebar-container {
      position: fixed;
      height: 100vh;
      width: 260px;
    }
    .page-container {
      margin-left: 260px;
      width: calc(100% - 260px);
    }
  }
}

@media screen and (max-width: 991.9px) {
  #app {
    display: flex;
    flex-direction: column;
    .sidebar-container {
      height: 100vh;
      flex: 1;
    }
    .page-container {
      flex: 1;
    }
  }
}

</style>
