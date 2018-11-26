<template lang="pug">
  .form-group
    label(:for="name") {{ label }}
    input.form-control(
    :type="type"
    :placeholder="placeholder"
    :id="name"
    :name="name"
    :class="{'is-invalid': errors[name]}"
    )
    .invalid-feedback(v-for="e in errors[name]") {{e}}
</template>
<script>
export default {
  name: 'Vinput',
  props: {
    errors: {
      type: Object
    },
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
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>
