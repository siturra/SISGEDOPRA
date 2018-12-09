<template lang="pug">
.container
  .row.justify-content-center.mb-3
    .col-6
      h3 Flujos
    .col-2.text-right
      button.btn.btn-outline-primary(type='button' data-toggle='modal' data-target='#exampleModal')
        | Crear Flujo

  .row.justify-content-center
    .col-8
      clip-loader(v-if="loading.init" color="#002f6c" size="60px")
      table.table(v-else)
        thead
          tr
            th(scope='col') ID
            th(scope='col') Nombre
        tbody
          tr(v-for="item in items")
            th(scope='row') {{item.id}}
            td {{item.name}}

  // Modal Crear Documentos
  #exampleModal.modal.fade(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
    .modal-dialog(role='document')
      form(v-on:submit.prevent="onSubmit")
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title Creación de Documentos
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') &times;
          .modal-body
            v-input(
            :errors="errors"
            type="text"
            label="Nombre Descriptivo"
            name="name"
            ref="name"
            v-model="form.name"
            placeholder=""
            )
            .form-group
              label(for='type') Tipo de Envío
              select#type.form-control(v-model="form.type")
                option(value=1) Escrito

            .modal-footer
              button.btn.btn-secondary(type='button' data-dismiss='modal') Cerrar
              v-submit(:loading="loading.submit") Crear
</template>
<script>
export default {
  name: 'Flows',
  data () {
    return {
      errors: {},
      form: {
        name: ''
      },
      items: [],
      loading: {
        submit: false
      }
    }
  },
  mounted () {
    this.getListflows()
  },
  methods: {
    getListflows () {
      this.loading.init = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/flows`,
        method: 'GET',
        headers: {
          Authorization: this.$auth.getToken()
        }
      })
        .then((response) => {
          this.items = response.data
        })
        .finally(() => {
          this.loading.init = false
        })
    },
    onSubmit () {
      this.loading.submit = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/flows`,
        method: 'POST',
        headers: {
          Authorization: this.$auth.getToken()
        },
        data: this.form
      })
        .then((response) => {
          this.form.id = response.data.id
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
