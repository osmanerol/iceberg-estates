<script>
export default {
  name: 'Title',
  props: [
    'icon',
    'text'
  ]
}
</script>

<template>
  <div class="title">
    <b-icon :icon="icon" />
    <h3>{{ text }}</h3>
  </div>
</template>

<style lang="scss" scoped>
.title {
  color: var(--blue-02);
  display: flex;
  align-items: center;
  h3 {
    margin-bottom: 0;
    font-weight: 300;
  }
}

@media screen and (min-width: 992px) {
  .title {
    margin-bottom: 40px;
    .b-icon {
      font-size: 30px;
    }
    h3 {
      font-size: 24px;
      margin-left: 16px;
    }
  }
}

@media screen and (max-width: 991.9px) {
  .title {
    margin-bottom: 20px;
    .b-icon {
      font-size: 22px;
    }
    h3 {
      font-size: 18px;
      margin-left: 10px;
    }
  }
}
</style>