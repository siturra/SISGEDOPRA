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
          :errors="errors"
          name="firstName"
          @change="form.firstName"
          )
          v-input(
          type="text"
          label="Ingrese Apellidos"
          :errors="errors"
          name="lastName"
          @change="form.lastName"
          )
          v-input(
          :errors="errors"
          type="text"
          label="Ingrese Rut"
          placeholder="18.765.525-0"
          name="rut"
          @change="form.rut"
          )
          v-input(
          :errors="errors"
          type="email"
          label="Correo Electrónico"
          name="email"
          placeholder="ejemplo@usach.cl"
          @change="form.email"
          )
          v-input(
          :errors="errors"
          type="password"
          label="Contraseña"
          placeholder=""
          name="password"
          @change="form.password"
          )
          v-submit(:loading="loading.submit") Registrarme
          p
            router-link(:to="{ name: 'Login2' }") tengo cuenta, ingresar
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      errors: {},
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
  },
  methods: {
    onSubmit () {
      this.loading.submit = true
      window.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/signup`,
        method: 'POST',
        data: this.form
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          this.errors = error.response.data
        })
        .finally(() => {
          this.loading.submit = false
        })
    }
  }
}
</script>
