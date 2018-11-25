<template lang="pug">
  #app
    img(src="./assets/logo.png")
    router-view

    input(v-model="name")
    input(v-model="lastName")

    p {{fullName}}
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      name: '',
      lastName: ''
    }
  },
  computed: {
    fullName () {
      return `${this.name} ${this.lastName}`
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
