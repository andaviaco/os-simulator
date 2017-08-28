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
        <div class="field">
          <div class="control">
            <input
              id="program_id"
              class="input"
              type="text"
              v-model="process.id"
              @input="handleIdChange($event)"
            >
          </div>
          <p
            class="help is-danger"
            v-show="!isCurrentIdValid"
          >
            El ID no está disponible.
          </p>
        </div>
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
            v-model="process.operation.operand1"
          >
        </div>

        <div class="control">
          <div class="select">
            <select v-model="process.operation.operator">
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">×</option>
              <option value="/">÷</option>
              <option value="%">mod</option>
            </select>
          </div>
        </div>

        <div class="field is-narrow">
          <input
            id="operation2"
            class="input"
            type="number"
            name="operation2"
            v-model="process.operation.operand2"
            v-validate="'required|numeric|min_value:1'"
          >
        </div>
      </div>
      <p
        class="help is-danger"
        v-show="errors.has('operation2')"
      >
        {{ errors.first('operation2') }}
      </p>
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
        <div class="field">
          <div class="control">
            <input
            id="time-max"
            :class="[{ 'is-danger': errors.has('time-max') }, 'input']"
            type="number"
            name="time-max"
            v-model="process.timeMax"
            v-validate="'required|numeric|min_value:1'"
            >
          </div>
          <p
            class="help is-danger"
            v-show="errors.has('time-max')"
          >
            {{ errors.first('time-max') }}
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
      </div>
      <div class="field-body">
        <button class="button is-primary is-outlined" type="submit">
          <span class="icon is-small">
            <i class="fa fa-plus"></i>
          </span>
          <span>Agregar</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
function initialState() {
  return {
    isCurrentIdValid: true,
    process: {
      id: '',
      programmerName: '',
      timeMax: 1,
      operation: {
        operand1: 1,
        operator: '+',
        operand2: 1,
        result: 0,
      },
      time: 0,
    },
  };
}

export default {
  name: 'process-form',
  data() {
    return initialState();
  },
  methods: {
    async handleSubmitForm() {
      const formIsValid = await this.$validator.validateAll();

      if (formIsValid && this.isCurrentIdValid) {
        this.$emit('submit-program', this.process);

        Object.assign(this.$data, initialState());
      }
    },
    handleIdChange($event) {
      this.$emit('id-change', $event.target.value);
    },
    setIdValidity(value) {
      this.isCurrentIdValid = value;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
