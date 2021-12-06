<script>
export default {
  name: 'Loading',
}
</script>

<template>
  <div class="loading">
    <b-spinner type="grow" label="Spinning"></b-spinner>
  </div>
</template>

<style lang="scss" scoped>
.loading {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>