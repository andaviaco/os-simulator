<template>
  <form @submit.prevent="handleSubmitForm">
    <div class="field is-horizontal">
      <div class="field-label">
        <label
          class="label"
          for="program_id"
        >
          Num. Programa (ID)
        </label>
      </div>
      <div class="field-body">
        <input
          id="program_id"
          class="input"
          type="text"
          v-model="process.id"
        >
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <label
          class="label"
          for="programmer-name"
        >
          Nombre del Programador
        </label>
      </div>
      <div class="field-body">
        <input
          id="programmer-name"
          class="input"
          type="text"
          v-model="process.programmerName"
        >
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="operation">Operación</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <input
            id="operation"
            class="input"
            type="number"
            v-model="process.operation.operad1"
          >
        </div>

        <div class="control">
          <div class="select">
            <select v-model="process.operation.operator">
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="x">×</option>
              <option value="/">÷</option>
              <option value="%">mod</option>
            </select>
          </div>
        </div>

        <div class="field is-narrow">
          <input
            id="operation"
            class="input"
            type="number"
            v-model="process.operation.operand2"
          >
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <label
          class="label"
          for="time-max"
        >
          Tiempo Maximo (segundos)
        </label>
      </div>
      <div class="field-body">
        <input
          id="time-max"
          class="input"
          type="number"
        >
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
      </div>
      <div class="field-body">
        <button class="button is-primary" type="submit">
          <span class="icon is-small">
            <i class="fa fa-plus"></i>
          </span>
          <span>Agregar</span>
        </button>
      </div>
    </div>

    <pre>{{ process }}</pre>
  </form>
</template>

<script>
export default {
  name: 'process-form',
  data() {
    return {
      process: {
        id: '',
        programmerName: '',
        timeMax: '',
        operation: {
          operad1: 1,
          operator: '+',
          operand2: 1,
        },
      },
    };
  },
  methods: {
    handleSubmitForm() {
      console.log('submit');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
