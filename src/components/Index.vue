<template>
  <div>
    <div class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">OS Simulator</h1>
          <h2 class="subtitle is-2">Práctica 2</h2>
        </div>
      </div>
    </div>

    <div class="section">

      <div class="tile is-ancestor">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <h3 class="title">Crear Proceso</h3>
              <process-form
              ref="processForm"
              @submit-program="handleProgramSubmit"
              @id-change="handleIdChange"
              ></process-form>
            </article>
          </div>

          <div class="tile is-parent">
            <article class="tile is-child box">
              <h3 class="title">Lotes</h3>
              <process-batches
                :batches="batches"
              >
                <template slot="program" scope="batchScope">
                  <div class="message is-dark is-small is-primary">
                    <div class="message-body">
                      ID: {{ batchScope.program.id }} - {{ batchScope.program.programmerName }}
                    </div>
                  </div>
                </template>
              </process-batches>
            </article>
          </div>
        </div>
      </div>


      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <processor :batches="batches" @batch-start="handleBatchStart"></processor>
          </article>
        </div>
      </div>
    </div>

    <section class="section">
      <div
        class="message is-primary"
        tabindex="-1"
        @keyup.p="handleKeyup($event)"
        @keyup.c="handleKeyup($event)"
        @keyup.e="handleKeyup($event)"
        @keyup.w="handleKeyup($event)"
    >
        <div class="message-header">
          Comandos
        </div>
        <div class="message-body">
          <div class="content">
            <p v-show="pressedKey.key">Presionaste: <strong>{{ pressedKey.key }}</strong></p>
            <ul>
              <li><strong>P</strong>: Pausa</li>
              <li><strong>C</strong>: Continuar</li>
              <li><strong>E</strong>: Entrada/Salida</li>
              <li><strong>W</strong>: Error</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProcessForm from '@/components/ProcessForm';
import ProcessBatches from '@/components/ProcessBatches';
import Processor from '@/components/Processor';

import ProgramBatcher from '@/models/ProgramBatcher';
import Program from '@/models/Program';


const batcher = new ProgramBatcher([
  new Program(
    '55',
    {
      operand1: 5,
      operator: '*',
      operand2: 6,
    },
    3,
    'Andrés',
  ),

  new Program(
    '3',
    {
      operand1: 3,
      operator: '/',
      operand2: 6,
    },
    4,
    'Andrés',
  ),
]);

export default {
  name: 'index',
  data() {
    return {
      batches: batcher.batches,
      pressedKey: {
        key: null,
        keyCode: null,
      },
    };
  },
  methods: {
    handleProgramSubmit(programData) {
      const program = new Program(
        programData.id,
        programData.operation,
        programData.timeMax,
        programData.programmerName,
      );
      batcher.addProgram(program);
    },
    handleIdChange(id) {
      this.$refs.processForm.setIdValidity(batcher.isIdAvailable(id));
    },
    handleBatchStart() {
      batcher.popBatch();
    },
    handleKeyup($event) {
      this.pressedKey = {
        key: $event.key,
        keyCode: $event.keyCode,
      };
    },
  },
  components: {
    ProcessForm,
    ProcessBatches,
    Processor,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}*/
</style>
