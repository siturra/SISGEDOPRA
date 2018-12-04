<template lang="pug">
  div
    <!-- Navbar -->
    Header
    router-view
</template>
<script>
import Header from './Header'
export default {
  components: {Header},
  name: 'Index'
}
</script>
