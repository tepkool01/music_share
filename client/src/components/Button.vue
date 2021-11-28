<template>
  <button
      @click="onClick"
      :type="type"
      :disabled="disabled"
  >
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  props: {
    type: String,
    disabled: Boolean,
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>

button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

button:active {
  transform: scale(0.99);
}

</style>
