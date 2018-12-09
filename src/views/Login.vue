<template lang="pug">
.container
  .row.justify-content-center
    .col-6
      div.text-center
        img.logo-login(src="../assets/logo.png")
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

        alert-danger(:errors="errors")

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
