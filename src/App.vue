<template>
  <div id="app" class="app">
    <MainView />
  </div>
</template>

<script>
import MainView from './components/mainview/mainview.vue'
export default {
  name: 'App',
  components: {
    MainView
  }
}
</script>

<style lang="scss">
@import "./common/common.scss";
</style>