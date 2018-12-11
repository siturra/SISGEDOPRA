<template lang="pug">
.container-fluid
  .row.justify-content-center.mb-3
    .offset-3.col-6
      h3 Documentos
    .col-2.text-right
      button.btn.btn-outline-primary(type='button' data-toggle='modal' data-target='#exampleModal')
        i.material-icons note_add
        | Crear Documento

  .row.justify-content-center
    .col-sm-3.col-3
      #v-pills-tab.nav.flex-column.nav-pills(role='tablist' aria-orientation='vertical')
        a#v-pills-v-pills-home.nav-link.active(data-toggle='pill' href='#v-pills-home' role='tab' aria-controls='v-pills-home' aria-selected='true') Creados ({{items.length}})
        a#v-pills-messages-tab.nav-link(data-toggle='pill' href='#v-pills-messages' role='tab' aria-controls='v-pills-messages' aria-selected='false') Confirmar recepción ({{itemsWaitingApproved.length}})
        a#v-pills-profile-tab.nav-link(data-toggle='pill' href='#v-pills-profile' role='tab' aria-controls='v-pills-profile' aria-selected='false') Recibidos ({{itemsReceived.length}})
        a#v-pills-finished-tab.nav-link(data-toggle='pill' href='#v-pills-finished' role='tab' aria-controls='v-pills-finished' aria-selected='false') Finalizados ({{itemsFinished.length}})

    .col-sm-9.col-8
      #v-pills-tabContent.tab-content.pt-3
        #v-pills-home.tab-pane.fade.show.active(role='tabpanel' aria-labelledby='v-pills-home')
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
                th(scope='row')
                  router-link(:to="{ name: 'document', params: { id: item.id }}") {{item.id}}
                td
                  router-link(:to="{ name: 'document', params: { id: item.id }}") {{item.name}}
                td {{(item.type == 1) ? 'Físico ' : 'Digital'}}
                td.text-right
                  button.btn.btn-warning(v-if="item.currentUserAssigned == null" type='button' data-toggle='modal' data-target='#asignarModal' @click="setDocumentAssign(item.id)")
                    i.material-icons assignment
                    | Asignar
        #v-pills-messages.tab-pane.fade(role='tabpanel' aria-labelledby='v-pills-messages')
          clip-loader(v-if="loading.init" color="#002f6c" size="60px")
          table.table(v-else)
            thead
              tr
                th(scope='col') ID
                th(scope='col') Nombre
                th(scope='col') Tipo de envio
                th.text-right(scope='col') Acciones
            tbody
              tr(v-for="item in itemsWaitingApproved")
                th(scope='row')
                  router-link(:to="{ name: 'document', params: { id: item.documentId }}") {{item.documentId}}
                td
                  router-link(:to="{ name: 'document', params: { id: item.documentId }}") {{item.documentName}}
                td Físico
                td.text-right
                  button.btn.btn-success(type='button' @click="setDocumentReceived(item.transferId)")
                    i.material-icons check
                    | Confirmar recepción
        #v-pills-profile.tab-pane.fade(role='tabpanel' aria-labelledby='v-pills-profile')
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
                th(scope='row')
                  router-link(:to="{ name: 'document', params: { id: item.documentId }}") {{item.documentId}}
                td
                  router-link(:to="{ name: 'document', params: { id: item.documentId }}") {{item.documentName}}
                td Físico
                td.text-right
                  button.btn.btn-warning(type='button' data-toggle='modal' data-target='#asignarModal' @click="setDocumentAssign(item.documentId)")
                    i.material-icons assignment
                    | Asignar
                  |
                  button.btn.btn-success(type='button' @click="setFinishedDocument(item.documentId)")
                    i.material-icons assignment_turned_in
                    | Finalizar

        #v-pills-finished.tab-pane.fade(role='tabpanel' aria-labelledby='v-pills-finished')
          clip-loader(v-if="loading.init" color="#002f6c" size="60px")
          table.table(v-else)
            thead
              tr
                th(scope='col') ID
                th(scope='col') Nombre
                th(scope='col') Tipo de envio
            tbody
              tr(v-for="item in itemsFinished")
                th(scope='row')
                  router-link(:to="{ name: 'document', params: { id: item.documentId }}") {{item.documentId}}
                td
                  router-link(:to="{ name: 'document', params: { id: item.documentId }}") {{item.documentName}}
                td Físico

  // Modal Crear Documentos
  #exampleModal.modal.fade(tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')
    .modal-dialog(role='document')
      form(v-on:submit.prevent="onSubmit")
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title Creación de Documentos
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') &times;
          .modal-body(v-if="show.infoFisico")
            .alert.alert-info(role="alert")
              | Recuerda agregar el identificador
              b  {{form.id}}
              |  en el documento a enviar. Este identificador será necesario cuando el receptor confirme el traspaso del documento.

            .modal-footer
              button.btn.btn-secondary(type='button' data-dismiss='modal') Cerrar
              button.btn.btn-info(type='button' @click='show.infoFisico=false') Crear otro Documento
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
              label(for='type') Tipo de envío
              select#type.form-control(v-model="form.type")
                option(value=1) Físico

            .modal-footer
              button.btn.btn-secondary(type='button' data-dismiss='modal') Cerrar
              v-submit(:loading="loading.submit") Crear
  // Modal Asignar Documentos
  #asignarModal.modal.fade(tabindex='-1' role='dialog' aria-labelledby='asignarModalLabel' aria-hidden='true')
    .modal-dialog(role='document')
      form(v-on:submit.prevent="transferDocument")
        .modal-content
          .modal-header
            h5#asignarModalLabel.modal-title Asignar Documento
            button.close(type='button' data-dismiss='modal' aria-label='Close')
              span(aria-hidden='true') &times;
          .modal-body(v-if="show.transfer")
            .form-group
              .alert.alert-success(role="alert") Documento asignado con exito!
            .modal-footer
              button.btn.btn-secondary(type='button' data-dismiss='modal') Cerrar
          .modal-body(v-else)
            .form-group
              label(for='to') Usuario a asignar
              select#to.form-control(v-model="transfer.to" ref="to")
                option(value="") Seleccione usuario a asignar
                option(v-for="item in listsUsers" :value="item.id") {{item.firstName}} {{item.lastName}} ({{item.email.toLowerCase()}})

            .modal-footer
              button.btn.btn-secondary(type='button' data-dismiss='modal') Cerrar
              v-submit(:loading="loading.submit")
                i.material-icons assignment
                | Asignar
</template>
<script>
export default {
  name: 'Documents',
  data () {
    return {
      errors: {},
      form: {
        id: '',
        type: 1,
        name: ''
      },
      transfer: {
        document: '',
        to: ''
      },
      received: {
        id_document: '',
        to: ''
      },
      listsUsers: [],
      items: [],
      itemsReceived: [],
      itemsWaitingApproved: [],
      itemsFinished: [],
      loading: {
        init: false,
        submit: false
      },
      show: {
        infoFisico: false,
        transfer: false
      }
    }
  },
  mounted () {
    this.getListDocuments()
    this.getListDocumentsReceived()
    this.getListDocumentsWaitingApproved()
    this.getListDocumentsFinished()
  },
  methods: {
    init () {
      this.getListDocuments()
      this.getListDocumentsReceived()
      this.getListDocumentsWaitingApproved()
      this.getListDocumentsFinished()
    },
    getListUSers (id) {
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents/${id}/allowedReceivers`,
        method: 'GET',
        headers: {
          Authorization: this.$auth.getToken()
        }
      })
        .then((response) => {
          this.listsUsers = response.data
        })
        .finally(() => {
          this.loading.init = false
        })
    },
    getListDocuments () {
      this.loading.init = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents/created`,
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
    getListDocumentsReceived () {
      this.loading.init = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents/received`,
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
    getListDocumentsWaitingApproved () {
      this.loading.init = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents/pending`,
        method: 'GET',
        headers: {
          Authorization: this.$auth.getToken()
        }
      })
        .then((response) => {
          this.itemsWaitingApproved = response.data
        })
        .finally(() => {
          this.loading.init = false
        })
    },
    getListDocumentsFinished () {
      this.loading.init = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents/finished`,
        method: 'GET',
        headers: {
          Authorization: this.$auth.getToken()
        }
      })
        .then((response) => {
          this.itemsFinished = response.data
        })
        .finally(() => {
          this.loading.init = false
        })
    },
    setFinishedDocument (id) {
      this.finishedDocument(id)
    },
    setDocumentAssign (id) {
      this.show.transfer = false
      this.getListUSers(id)
      this.transfer.document = id
    },
    setDocumentReceived (id) {
      this.receivedtransferDocument(id)
    },
    finishedDocument (id) {
      this.loading.submit = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents/${id}/finish`,
        method: 'POST',
        headers: {
          Authorization: this.$auth.getToken()
        }
      })
        .then((response) => {
          this.init()
          this.show.transfer = true
          this.$notify({
            title: 'Success',
            message: 'Flujo del documento finalizado!',
            type: 'success'
          })
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
    transferDocument () {
      this.loading.submit = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/transfers`,
        method: 'POST',
        headers: {
          Authorization: this.$auth.getToken()
        },
        data: this.transfer
      })
        .then((response) => {
          this.init()
          this.show.transfer = true
          this.$notify({
            title: 'Success',
            message: 'Documento asignado con exito!',
            type: 'success'
          })
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
    receivedtransferDocument (id) {
      this.loading.submit = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/transfers/${id}/approve`,
        method: 'POST',
        headers: {
          Authorization: this.$auth.getToken()
        },
        data: this.transfer
      })
        .then((response) => {
          this.init()
          this.$notify({
            title: 'Success',
            message: 'Documento confirmado con exito!',
            type: 'success'
          })
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
            this.show.infoFisico = true
          }
          this.items.push(this.form)
          this.$notify({
            title: 'Success',
            message: 'Documento creado con exito!',
            type: 'success'
          })
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
