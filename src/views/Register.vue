<template lang="pug">
.container
  .row.justify-content-center
    .col-6
      div.text-center
        img.logo-login(src="../assets/logo.png")
      h3 Registro

      form(v-on:submit.prevent="onSubmit")
        v-input(
        type="text"
        label="Nombres"
        :errors="errors"
        ref="firstName"
        name="firstName"
        v-model="form.firstName"
        )
        v-input(
        type="text"
        label="Apellidos"
        :errors="errors"
        name="lastName"
        ref="lastName"
        v-model="form.lastName"
        )
        v-input(
        :errors="errors"
        type="text"
        label="Rut"
        placeholder="18.765.525-0"
        name="rut"
        ref="rut"
        v-model="form.rut"
        )
        v-input(
        :errors="errors"
        type="email"
        label="Correo electrónico"
        name="email"
        ref="email"
        placeholder="ejemplo@usach.cl"
        v-model="form.email"
        )
        v-input(
        :errors="errors"
        type="password"
        label="Contraseña"
        placeholder=""
        name="password"
        ref="password"
        v-model="form.password"
        )

        alert-danger(:errors="errors")

        v-submit(:loading="loading.submit") Registrarme
        p
          router-link(:to="{ name: 'Login' }") tengo cuenta, ingresar
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
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/signup`,
        method: 'POST',
        data: this.form
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          this.errors = error.response.data
          let firstError = Object.keys(this.errors)[0]
          this.$refs[firstError].$refs[firstError].focus()
        })
        .finally(() => {
          this.loading.submit = false
        })
    }
  }
}
</script>
