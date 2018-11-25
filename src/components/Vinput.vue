<template lang="pug">
  .form-group
    label(:for="name") {{ label }}
    input.form-control(
    :type="type"
    :placeholder="label"
    :id="name"
    :name="name"
    )
</template>
<script>
export default {
  name: 'Vinput',
  props: {
    name: {
      type: String,
      default: 'name'
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
