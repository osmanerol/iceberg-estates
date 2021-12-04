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
  background-color: var(--blue-02);
  color: var(--white-01);
  display: flex;
  align-items: center;
  h3 {
    margin-bottom: 0;
    font-weight: 300;
  }
}

@media screen and (max-width: 992px) {
  .title {
    padding: 8px;
    padding: 20px;
    .b-icon {
      font-size: 22px;
    }
    h3 {
      font-size: 18px;
      margin-left: 10px;
    }
  }
}

@media screen and (min-width: 992px) {
  .title {
    padding: 40px 70px;
    .b-icon {
      font-size: 30px;
    }
    h3 {
      font-size: 24px;
      margin-left: 16px;
    }
  }
}
</style>