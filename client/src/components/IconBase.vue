<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="width"
       :height="height"
       viewBox="0 0 18 18"
       :aria-labelledby="iconName"
  >
    <title :id="iconName" lang="en">{{iconName}} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'play'
    },
    width: {
      type: [Number, String],
      default: "3.998rem"
    },
    height: {
      type: [Number, String],
      default: "3.998rem"
    },
    iconColor: {
      type: String,
      default: 'var(--color-icon)'
    }
  },
  data() {
    return {
      someStyle: {
        opacity: '100',
      }
    }
  }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px; /* yes, I'm that particular about formatting */
}
</style>
