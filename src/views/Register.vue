<template lang="pug">
  div
    h1 Register

    form(v-on:submit.prevent="onSubmit")
      v-input(
      type="text",
      label="Ingrese Nombres",
      name="firstName"
      @change="form.firstName"
      )
      v-input(
      type="text",
      label="Ingrese Apellidos",
      name="lastName"
      @change="form.lastName"
      )
      v-input(
      type="text",
      label="Ingrese Rut",
      name="rut"
      @change="form.rut"
      )
      v-input(
      type="email",
      label="Correo Electrónico",
      name="email"
      @change="form.email"
      )
      v-input(
      type="password",
      label="Contraseña",
      name="password"
      @change="form.password"
      )
      v-submit(:loading="loading.submit") {{loading.submit}}
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
