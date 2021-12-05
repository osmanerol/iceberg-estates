<script>
export default {
  name: 'Input',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: []
    }
  },
  computed: {
    displayValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<template>
  <div class="form-group select">
    <label v-if="text != ''">{{ text }}</label>
    <b-form-select 
      v-model="displayValue"    
      :options="options"
      size="sm"
    />
  </div>
</template>

<style lang="scss" scoped>
.select {
  label {
    margin-bottom: 4px;
    font-size: 13px;
  }
  margin-bottom: 6px;
}
</style>