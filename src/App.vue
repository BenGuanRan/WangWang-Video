<template>
  <div id="app">
    <theme-container>
      <router-view/>
    </theme-container>
  </div>
</template>
<script></script>

<script>
import themeContainer from "./components/theme-container.vue";
export default {
  components: {
    themeContainer,
  },
}
</script>

<style lang="scss">
#app::-webkit-scrollbar {
  width: 5px;
}
#app::-webkit-scrollbar-track {
  background-color: #ffffff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
#app::-webkit-scrollbar-thumb {
  background-color: #e7e7ec;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
</style>
