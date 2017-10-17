<template>
  <form>
    <div class="field">
      <label class="label">Quantum</label>
      <div class="control has-icons-right">
        <input
          type="number"
          name="quantum"
          min="1"
          :class="['input', { 'is-danger': errors.has('quantum') }]"
          v-bind:value="quantum"
          v-on:input="handleQantumChange"
          v-validate="'required|numeric|min_value:1'"
        />
        <span class="icon is-small is-right">
          <i class="fa fa-warning"></i>
        </span>
      </div>

      <p
        class="help is-danger"
        v-show="errors.has('quantum')"
      >
        {{ errors.first('quantum') }}
      </p>
    </div>
  </form>
</template>

<script>

export default {
  name: 'config-form',
  props: ['initialConfig'],
  data() {
    return {
      quantum: this.initialConfig.quantum,
    };
  },
  methods: {
    handleQantumChange($event) {
      this.quantum = $event.target.value;
      this.$emit('quantum-change', this.quantum);
    },
  },
};
</script>
