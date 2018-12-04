<template lang="pug">
  .alert.alert-danger(role="alert" v-if="errors['error']")
    i.material-icons warning
    |{{ errors['error'] }}
</template>
<script>
export default {
  props: ['errors']
}
</script>
