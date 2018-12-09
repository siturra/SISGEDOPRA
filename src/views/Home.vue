<template lang="pug">
  .container
    .row.justify-content-center
      .col-10
        h3 Bienvenido
        p Sistema de Gestión Documental de Procesos Administrativos (SISGEDOPRA), es un software que permite modelar cualquier proceso administrativo de una Institución. Este software fue desarrollado por 4 estudiantes de la Universidad Santiago de Chile.
        p Los integrantes son:
        ul
          li Felipe Gaete (
            a(href="mailto:felipe.gaete@usach.cl") felipe.gaete@usach.cl
            |)
          li  Hugo Saavedra (
            a(href="mailto:hugo.saavedra@usach.cl") hugo.saavedra@usach.cl
            |)
          li  Braulio Castro Estay (
            a(href="mailto:braulio.castro@usach.cl") braulio.castro@usach.cl
            |)
          li  Sebastián Andrés Iturra Valdés (
            a(href="mailto:sebastian.iturra@usach.cl") sebastian.iturra@usach.cl
            |)

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      errors: {},
      form: {
        email: '',
        password: ''
      },
      loading: {
        submit: false
      }
    }
  },
  mounted () {
  },
  methods: {
    onSubmit () {
      this.loading.submit = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/login`,
        method: 'POST',
        data: this.form
      })
        .then((response) => {
          this.$auth.setToken(response.data.token)
          this.$router.push({path: '/'})
        })
        .catch((error) => {
          this.errors = error.response.data
          if (Object.keys(this.errors).length > 0 && Object.keys(this.errors)[0] !== 'error') {
            let firstError = Object.keys(this.errors)[0]
            this.$refs[firstError].$refs[firstError].focus()
          }
        })
        .finally(() => {
          this.loading.submit = false
        })
    }
  }
}
</script>
