<template lang="pug">
  #app
    p
      router-link(to="/registro") Registro
      |
      router-link(to="/login") Login

    router-view
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  @import "./scss/app";
</style>
