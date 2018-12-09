<template lang="pug">
div
  <!-- Navbar -->
  Header
  <!-- Breadcrumb -->
  <!-- Breadcrumb -->
  router-view
</template>
<script>
import Header from './Header'
import Breadcrumb from './Breadcrumb'
export default {
  components: {Header, Breadcrumb},
  name: 'Index'
}
</script>
