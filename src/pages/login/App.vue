<template>
  <div id="app">
    <img src="@/assets/logo.png" />
    这是登录页111
    <button @click="click"></button>
    <!-- <router-view /> -->
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'App',
  methods: {
    click() {
      window.location.href = 'main.html'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
