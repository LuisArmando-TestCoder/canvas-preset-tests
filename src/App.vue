<template>
  <div id="app">
    <Birds/>
  </div>
</template>

<script>
import Birds from './components/canvas/Birds'

export default {
  name: 'App',
  components: {
    Birds
  }
}
</script>

<style>
body, canvas {
  display: block;
  margin: 0;
}
</style>
