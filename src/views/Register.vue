<template lang="pug">
  .container
    .row.justify-content-center
      .col-6
        img.logo(src="../assets/logo.png")
        h3 Registro

        form(v-on:submit.prevent="onSubmit")
          v-input(
          type="text"
          label="Ingrese Nombres"
          name="firstName"
          @change="form.firstName"
          )
          v-input(
          type="text"
          label="Ingrese Apellidos"
          name="lastName"
          @change="form.lastName"
          )
          v-input(
          type="text"
          label="Ingrese Rut"
          placeholder="18.765.525-0"
          name="rut"
          @change="form.rut"
          )
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
          v-submit(:loading="loading.submit") Registrarme
          p
            a.btn-link(href="/login") tengo cuenta, ingresar
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        rut: '',
        email: '',
        password: ''
      },
      loading: {
        submit: false
      }
    }
  },
  mounted () {
    console.log(process.env.VUE_APP_BACKEND_API_URL)
  },
  methods: {
    onSubmit () {
      this.loading.submit = true
      window.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/register`,
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
