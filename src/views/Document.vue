<template lang="pug">
.container
  .row.justify-content-center.mb-3
    .col-6
      h3 Detalle de un Documento
    .col-2.text-right
      router-link.btn.btn-outline-secondary(:to="{name: 'documents'}")
        i.material-icons keyboard_arrow_left
        | Volver

  .row.justify-content-center
    .col-8.col-sm-12
      clip-loader(v-if="loading.init" color="#002f6c" size="60px")
      div(v-else)
        table.col-6.table.table-bordered
          tbody
            tr
              th(scope='row') #ID
              td {{document.id}}
            tr
              th(scope='row') Nombre
              td {{document.name}}
            tr
              th(scope='row') Tipo de envio
              td {{(document.type == 1) ? 'Físico' : 'Digital'}}

        table.table
          thead
            tr
              th(scope='col') Desde
              th(scope='col') Hasta
              th(scope='col') Fecha
          tbody
            tr(v-for="item in document.transfers")
              td {{item.userFromName}} {{item.userFromLastName}}
              td {{item.userToName}} {{item.userToLastName}}
              td {{item.createdAt}}

</template>
<script>
export default {
  name: 'Document',
  data () {
    return {
      document: '',
      loading: {
        init: false
      }
    }
  },
  mounted () {
    this.getDocument()
  },
  methods: {
    getDocument () {
      this.loading.init = true
      this.axios({
        url: `${process.env.VUE_APP_BACKEND_API_URL}/documents/${this.$route.params.id}`,
        method: 'GET',
        headers: {
          Authorization: this.$auth.getToken()
        },
        data: this.form
      })
        .then((response) => {
          this.document = response.data
        })
        .finally(() => {
          this.loading.init = false
        })
    }
  }
}
</script>
