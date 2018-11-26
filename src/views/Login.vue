<template lang="pug">
  .container
    .row.justify-content-center
      .col-6
        img.logo(src="../assets/logo.png")
        h3 Ingresar

        form(v-on:submit.prevent="onSubmit")
          v-input(
          :errors="errors"
          type="email"
          label="Correo electrónico"
          name="email"
          ref="email"
          v-model="form.email"
          placeholder="ejemplo@usach.cl"
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

          .alert.alert-danger(role="alert" v-if="errors['error']")
            i.material-icons warning
            |{{ errors['error'] }}

          v-submit(:loading="loading.submit") Ingresar
          p
            router-link(:to="{ name: 'Register' }") no tengo cuenta, registrarme
</template>

<script>
export default {
  name: 'Login',
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
      window.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/login`,
        method: 'POST',
        data: this.form
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          this.errors = error.response.data
          console.log(this.errors)
          if (Object.keys(this.errors).length > 0) {
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
