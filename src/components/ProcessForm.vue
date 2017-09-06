<template>
  <form @submit.prevent="handleSubmitForm">
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="operation">Operación</label>
      </div>
      <div class="field-body">
        <div>
          <div class="field is-narrow">
            <input
              id="operation"
              class="input"
              type="number"
              v-model="process.operation.operand1"
            >
          </div>
        </div>

        <div class="control">
          <div class="select">
            <select
              v-model="process.operation.operator"
              ref="operator"
              @input="handleOperationChange()"
            >
              <option :value="getOperator('plus')">{{ getOperatorRep('plus') }}</option>
              <option :value="getOperator('minus')">{{ getOperatorRep('minus') }}</option>
              <option :value="getOperator('times')">{{ getOperatorRep('times') }}</option>
              <option :value="getOperator('divition')">{{ getOperatorRep('divition') }}</option>
              <option :value="getOperator('pow')">{{ getOperatorRep('pow') }}</option>
              <option :value="getOperator('mod')">{{ getOperatorRep('mod') }}</option>
            </select>
          </div>
        </div>

        <div>
          <div class="field is-narrow">
            <input
              id="operand2"
              class="input"
              type="number"
              name="operand2"
              ref="operand2"
              v-model="process.operation.operand2"
              v-validate="'required|numeric'"
              @input="handleOperationChange()"
            >
          </div>
        </div>

      </div>
    </div>

    <div>
      <p
        class="help is-danger"
        v-show="errors.has('operand2')"
      >
        {{ errors.first('operand2') }}
      </p>
      <p
        class="help is-danger"
        v-show="operationError"
      >
        {{ operationError }}
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
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-primary is-outlined"
              type="submit"
            >
              <span class="icon is-small">
                <i class="fa fa-plus"></i>
              </span>
              <span>Agregar</span>
            </button>
          </div>

          <div class="control">
            <button
              class="button is-white"
              type="button"
              @click="handleRandomClick"
            >
              <span class="icon is-small">
                <i class="fa fa-magic"></i>
              </span>
              <span>Random</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { OPERATORS, OPERATORS_REP } from '@/const';

function initialState() {
  return {
    operationError: null,
    process: {
      operation: {
        operand1: 1,
        operator: '+',
        operand2: 1,
        result: 0,
      },
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

      if (formIsValid) {
        this.$emit('submit-program', this.process);

        Object.assign(this.$data, initialState());
      }
    },

    handleOperationChange() {
      const operand2 = this.$refs.operand2.value;
      const operator = this.$refs.operator.value;

      this.validateOperation(operand2, operator);
    },

    handleRandomClick() {
      console.log('holas');
      const operators = Object.values(OPERATORS);

      this.process.timeMax = this.getRandom(1, 5);
      this.process.operation.operand1 = this.getRandom(1, 50);
      this.process.operation.operator = operators[this.getRandom(0, operators.length - 1)];
      this.process.operation.operand2 = this.getRandom(1, 50);
    },

    getOperator(op) {
      return OPERATORS[op];
    },

    getOperatorRep(op) {
      return OPERATORS_REP[op];
    },

    validateOperation(operand2, operator) {
      const isRestrictedOperator = ['/', '%'].find(op => op === operator);

      if (isRestrictedOperator && operand2 <= 0) {
        this.operationError = 'El segundo operando debe ser mayor a 0.';
      } else {
        this.operationError = null;
      }
    },

    getRandom(min, max) {
      const minCeil = Math.ceil(min);
      const maxFloor = Math.floor(max);

      return Math.floor(Math.random() * ((maxFloor - minCeil) + 1)) + minCeil;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
