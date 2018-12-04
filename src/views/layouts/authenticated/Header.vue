<template lang="pug">
  nav.navbar.navbar-expand-lg.navbar-light.bg-light
    a.navbar-brand(href='#') SISGEDOPRA
    button.navbar-toggler(type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.mr-auto
        li.nav-item.active
          a.nav-link(href='#')
            | Inicio
            span.sr-only (current)
        li.nav-item
          a.nav-link(href='#') Link
        li.nav-item
          a.nav-link.disabled(href='#') Disabled

      a.btn.btn-link(@click="logout") Salir

</template>
<script>
export default {
  methods: {
    logout () {
      this.$auth.destroyToken()
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
