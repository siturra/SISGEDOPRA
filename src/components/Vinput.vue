<template lang="pug">
  .form-group
    label(:for="name") {{ label }}
    input.form-control(
    :type="type"
    :placeholder="placeholder"
    :id="name"
    :name="name"
    :class="{'is-invalid': errors[name]}"
    :ref="name"
    @input="updateInput($event.target.value)"
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
    value: {
      type: String,
      default: ''
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
  },
  methods: {
    updateInput (newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>
