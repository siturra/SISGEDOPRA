<template lang="pug">
.container
  .row.justify-content-center.mb-3
    .col-6
      h3 Documento
    .col-2.text-right
      router-link.btn.btn-outline-secondary(:to="{name: 'documents'}") Volver

  .row.justify-content-center
    .col-8
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
              td {{(document.type == 1) ? 'Fisico' : 'Digital'}}

        table.table()
          thead
            tr
              th(scope='col') Estados
          tbody
            tr(v-for="item in items")
              th(scope='row') {{item.id}}
              td {{item.name}}
              td {{(item.type == 1) ? 'Fisico' : 'Digital'}}
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
