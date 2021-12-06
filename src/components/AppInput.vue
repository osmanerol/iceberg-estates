<script>
export default {
  name: 'Input',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    text: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
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
  <div class="form-group input">
    <label v-if="text != ''">{{ text }}</label>
    <b-form-input 
      v-model="displayValue"    
      :type="type"
      :placeholder="placeholder"
      size="sm"
      :disabled="disabled"
    />
  </div>
</template>

<style lang="scss" scoped>
.input {
  margin-bottom: 6px;
  label {
    margin-bottom: 4px;
    font-size: 13px;
  }
}
</style>