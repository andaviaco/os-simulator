<template>
  <div>
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
                class="button is-outlined"
                type="button"
                @click="handleRandomClick"
              >
                <span class="icon is-small">
                  <i class="fa fa-magic"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <hr>

    <form @submit.prevent="handleGeneratorSubmit">
      <div class="field has-addons">
        <div class="control is-expanded">
          <input
            id="generate"
            type="number"
            name="generate"
            class="input"
            placeholder="Procesos a generar"
            v-model.number="generate"
          >
        </div>

        <div class="control">
          <button
            class="button"
            type="submit"
          >
            <span class="icon is-small">
              <i class="fa fa-magic"></i>
            </span>
            <span>Generar</span>
          </button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
import { OPERATORS, OPERATORS_REP } from '@/const';
import { generateProcessValues } from '@/util';

function initialState() {
  return {
    generate: null,
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
      this.process = generateProcessValues();
    },

    handleGeneratorSubmit() {
      const generated = Array.from(Array(this.generate), generateProcessValues);

      this.$emit('submit-program', generated);
    },

    getOperator(op) {
      return OPERATORS[op];
    },

    getOperatorRep(op) {
      return OPERATORS_REP[op];
    },

    validateOperation(operand2, operator) {
      const isRestrictedOperator = [OPERATORS.divition, OPERATORS.mod].find(op => op === operator);

      if (isRestrictedOperator && operand2 <= 0) {
        this.operationError = 'El segundo operando debe ser mayor a 0.';
      } else {
        this.operationError = null;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
