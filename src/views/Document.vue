<template lang="pug">
.container
  .row.justify-content-center.mb-3
    .col-6
      h3 Documentos
    .col-2.text-right
      button.btn.btn-outline-primary(type='button' data-toggle='modal' data-target='#exampleModal')
        | Crear Documento

  .row.justify-content-center
    .col-8
      ul#myTab.nav.nav-pills.nav-fill(role='tablist')
        li.nav-item
          a#home-tab.nav-link.active(data-toggle='tab' href='#home' role='tab' aria-controls='home' aria-selected='true') Mis Documentos Creados
        li.nav-item
          a#profile-tab.nav-link(data-toggle='tab' href='#profile' role='tab' aria-controls='profile' aria-selected='false') Mis Documentos Asignados ({{itemsReceived.length}})
      #myTabContent.tab-content.pt-3
        #home.tab-pane.fade.show.active(role='tabpanel' aria-labelledby='home-tab')
          clip-loader(v-if="loading.init" color="#002f6c" size="60px")
          table.table(v-else)
            thead
              tr
                th(scope='col') ID
                th(scope='col') Nombre
                th(scope='col') Tipo de envio
                th.text-right(scope='col') Acciones
            tbody
              tr(v-for="item in items")
                th(scope='row') {{item.id}}
                td {{item.name}}
                td {{(item.type == 1) ? 'Escrito' : 'Digital'}}
                td.text-right
                  button.btn.btn-warning(type='button' data-toggle='modal' data-target='#asignarModal' @click="setDocumentAssign(item.id)") Asignar

        #profile.tab-pane.fade(role='tabpanel' aria-labelledby='profile-tab')
          clip-loader(v-if="loading.init" color="#002f6c" size="60px")
          table.table(v-else)
            thead
              tr
                th(scope='col') ID
                th(scope='col') Nombre
                th(scope='col') Tipo de envio
                th.text-right(scope='col') Acciones
            tbody
              tr(v-for="item in itemsReceived")
                th(scope='row') {{item.id}}
                td {{item.name}}
                td {{(item.type == 1) ? 'Escrito' : 'Digital'}}
                td.text-right
                  button.btn.btn-success(type='button' @click="setDocumentReceived(item.id)") Recibido

  // Modal Crear Documentos
  #exampleModal.modal.fade(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
    .modal-dialog(role='document')
      form(v-on:submit.prevent="onSubmit")
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title Creación de Documentos
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') &times;
          .modal-body(v-if="show.infoEscrito")
            .alert.alert-info(role="alert")
              | Recuerda agregar el Identificador
              b  {{form.id}}
              |  en el documento a enviar, para que el receptor al recibirla pueda ingresar al sistema y notificar que ya recibi&oacute; el documento.

            .modal-footer
              button.btn.btn-secondary(type='button' data-dismiss='modal') Cerrar
              button.btn.btn-info(type='button' @click='show.infoEscrito=false') Crear otro Documento
          .modal-body(v-else)
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
  // Modal Asignar Documentos
  #asignarModal.modal.fade(tabindex='-1' role='dialog' aria-labelledby='asignarModalLabel' aria-hidden='true')
    .modal-dialog(role='document')
      form(v-on:submit.prevent="assignDocument")
        .modal-content
          .modal-header
            h5#asignarModalLabel.modal-title Asignar Documento
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') &times;
          .modal-body
            .form-group
              label(for='type') Usuario a asignar
              select#user.form-control(v-model="assign.id_user" ref="id_user")
                option(value=1) Sebastián Iturra

            .modal-footer
              button.btn.btn-secondary(type='button' data-dismiss='modal') Cerrar
              v-submit(:loading="loading.submit") Asignar
</template>
<script>
export default {
  name: 'Document',
  data () {
    return {
      errors: {},
      form: {
        id: null,
        type: 1,
        name: ''
      },
      assign: {
        id_document: null,
        id_user: null
      },
      received: {
        id_document: null,
        id_user: null
      },
      itemsReceived: [],
      items: [],
      loading: {
        init: false,
        submit: false
      },
      show: {
        infoEscrito: false
      }
    }
  },
  mounted () {
    this.getListDocuments()
    this.getListDocumentsReceived()
  },
  methods: {
    getListDocuments () {
      this.loading.init = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents-received`,
        method: 'GET',
        headers: {
          Authorization: this.$auth.getToken()
        }
      })
        .then((response) => {
          this.itemsReceived = response.data
        })
        .finally(() => {
          this.loading.init = false
        })
    },
    getListDocumentsReceived () {
      this.loading.init = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents`,
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
    setDocumentAssign (id) {
      this.assign.id_document = id
    },
    setDocumentReceived (id) {
      this.received.id_document = id
    },
    receivedDocument () {
      this.loading.submit = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents/received`,
        method: 'POST',
        headers: {
          Authorization: this.$auth.getToken()
        },
        data: this.received
      })
        .then((response) => {
          console.log(response.data)
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
    },
    assignDocument () {
      this.loading.submit = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents/assign`,
        method: 'POST',
        headers: {
          Authorization: this.$auth.getToken()
        },
        data: this.assign
      })
        .then((response) => {
          console.log(response.data)
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
    },
    onSubmit () {
      this.loading.submit = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents`,
        method: 'POST',
        headers: {
          Authorization: this.$auth.getToken()
        },
        data: this.form
      })
        .then((response) => {
          this.form.id = response.data.id
          if (response.data.type === 1) {
            this.show.infoEscrito = true
          }
          this.items.push(this.form)
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
