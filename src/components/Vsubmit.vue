<template lang="pug">
  button.btn.btn-primary(
  type="submit"
  :disabled="loading"
  )
    slot Enviar
</template>
<script>
export default {
  name: 'Vsubmit',
  props: ['loading']
}
</script>
