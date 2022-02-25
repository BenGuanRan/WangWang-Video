<template>
  <div id="app" :class="$route.name === 'About' || theme">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
};
</script>

<style lang="scss">
.theme-dark {
  filter: invert(1) hue-rotate(180deg);
  img,
  video,
  .a,
  .darkmode-ignore {
    filter: invert(1) hue-rotate(180deg);
  }
  video:fullscreen {
    filter: none;
  }
}
</style>
