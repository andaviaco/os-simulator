<template>
  <form>
    <div class="field">
      <label class="label">Quantum</label>
      <div class="control has-icons-right">
        <input
          class="input"
          type="number"
          v-bind:value="quantum"
          v-on:input="handleQantumChange"
        />
        <span class="icon is-small is-right">
          <i class="fa fa-warning"></i>
        </span>
      </div>
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
