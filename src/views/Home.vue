<template lang="pug">
  .container
    .row.justify-content-center
      .col-6
        h3 Home
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
