<template lang="pug">
  .container
    .row.justify-content-center
      .col-6
        img.logo(src="../assets/logo.png")
        h3 Ingresar

        form(v-on:submit.prevent="onSubmit")
          v-input(
          type="email"
          label="Correo Electrónico"
          name="email"
          placeholder="ejemplo@usach.cl"
          @change="form.email"
          )
          v-input(
          type="password"
          label="Contraseña"
          placeholder=""
          name="password"
          @change="form.password"
          )
          v-submit(:loading="loading.submit") Ingresar
          p
            router-link(:to="{ name: 'Register' }") no tengo cuenta, registrarme
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
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
      window.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/login`,
        method: 'POST',
        data: this.form
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch((_) => {})
        .finally(() => {
          this.loading.submit = false
        })
    }
  }
}
</script>
