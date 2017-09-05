<template lang="html">
  <div
    tabindex="-1"
    @keyup.p="handlePauseKeyup"
    @keyup.c="handleContinueKeyup"
    @keyup.e="handleInterruptKeyup"
    @keyup.w="handleErrorKeyup"
  >
    <h3 class="title is-3">Procesamiento</h3>
    <div class="level">
        <div class="level-left">
          <div class="level-item">
            <button
              class="button is-success"
              type="button"
              @click="handleStartClick"
              >
              <span class="icon">
                <i class="fa fa-flash"></i>
              </span>
              <span>
                Procesar
              </span>
            </button>
          </div>
      </div>

      <div class="level-right">
        <div class="leve-item">
          <div class="field is-grouped ">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-dark">Lotes restantes:</span>
                <span class="tag is-warning">
                  {{ this.batches.length }}
                </span>
              </div>
            </div>

            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-dark">Tiempo transcurrido:</span>
                <span class="tag is-info">
                  <stopwatch ref="timer"></stopwatch>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <div class="columns">
    <div class="column">
      <h4 class="title is-4 has-text-centered">Lote en ejecución</h4>
      <batch :programs="currentBatch">
        <template slot="item" scope="props">
          <div class="message is-small is-primary">
            <div class="message-body">
              <dl>
                <div>
                  <dt class="is-inline"><strong>ID:</strong></dt>
                  <dd class="is-inline"><strong>{{ props.program.id }}</strong></dd>
                </div>

                <div>
                  <dt class="is-inline">Tiempo Maximo:</dt>
                  <dd class="is-inline">{{ props.program.timeMax }} secs.</dd>
                </div>

                <div>
                  <dt class="is-inline">Tiempo Restante:</dt>
                  <dd class="is-inline">{{ props.program.timeMax - props.program.time }} secs.</dd>
                </div>
              </dl>
            </div>
          </div>
        </template>
      </batch>
    </div>

    <div class="column">
      <h4 class="title is-4 has-text-centered">Proceso en ejecución</h4>
      <transition name="fade">
        <div class="message is-small is-warning" v-if="currentProcess.id">
          <div class="message-body">
            <dl>
              <div>
                <dt class="is-inline"><strong>ID:</strong></dt>
                <dd class="is-inline"><strong>{{ currentProcess.id }}</strong></dd>
              </div>

              <div>
                <dt class="is-inline">Programador:</dt>
                <dd class="is-inline">{{ currentProcess.programmerName }}</dd>
              </div>

              <div>
                <dt class="is-inline">Operación:</dt>
                <dd class="is-inline">{{ `${currentProcess.operation.operand1} ${currentProcess.operation.operator} ${currentProcess.operation.operand2}` }}</dd>
              </div>

              <div>
                <dt class="is-inline">Tiempo Maximo:</dt>
                <dd class="is-inline">{{ currentProcess.timeMax }} secs.</dd>
              </div>

              <div>
                <dt class="is-inline">Tiempo Transcurrido:</dt>
                <dd class="is-inline">{{ currentProcess.time }} secs.</dd>
              </div>

              <div>
                <dt class="is-inline">Tiempo Restante:</dt>
                <dd class="is-inline">{{ currentProcess.timeMax - currentProcess.time }} secs.</dd>
              </div>
            </dl>
          </div>
        </div>
      </transition>
    </div>

    <div class="column">
      <h4 class="title is-4 has-text-centered">Procesos terminados</h4>
      <process-batches
        :batches="processedBatches"
      >
        <template slot="program" scope="batchScope">
          <div class="message is-small is-success">
            <div class="message-body">
              <dl>
                <div>
                  <dt class="is-inline"><strong>ID:</strong></dt>
                  <dd class="is-inline"><strong>{{ batchScope.program.id }}</strong></dd>
                </div>

                <div>
                  <dt class="is-inline">Operación:</dt>
                  <dd class="is-inline">
                    {{ `${batchScope.program.operation.operand1} ${batchScope.program.operation.operator} ${batchScope.program.operation.operand2}` }}
                  </dd>
                </div>

                <div>
                  <dt class="is-inline">Resultado:</dt>
                  <dd class="is-inline">{{ batchScope.program.operation.result }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </template>
      </process-batches>
    </div>
  </div>
  </div>
</template>

<script>
import Stopwatch from '@/components/Stopwatch';
import ProcessBatches from '@/components/ProcessBatches';
import Batch from '@/components/Batch';

import ProgramBatcher from '@/models/ProgramBatcher';

const processedPrograms = new ProgramBatcher();

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b,
  '^': (a, b) => a ** b,
};

export default {
  name: 'processor',
  props: ['batches'],
  data() {
    return {
      currentBatch: [],
      currentProcess: {},
      processedBatches: processedPrograms.batches,
    };
  },
  methods: {
    async handleStartClick() {
      this.$refs.timer.start();

      await this.processBatches();

      this.$refs.timer.stop();
    },

    async processBatches() {
      const allBatches = [...this.batches];

      for (const batch of allBatches) {
        this.$emit('batch-start');
        this.currentBatch = batch;

        await this.processBatch(batch);
      }
    },

    async processBatch(batch) {
      const allPrograms = [...batch];

      for (const program of allPrograms) {
        this.currentBatch.shift();
        this.currentProcess = program;
        this.currentProcess.time = 0;

        this.currentProcess.startTimer();
        const result = await this.processProgram(program);
        this.currentProcess.stopTimer();

        program.operation.result = result;
        this.currentProcess = {};
        processedPrograms.addProgram(program);
      }
    },

    async processProgram(program) {
      const timeoutTime = program.timeMax * 1000;

      return new Promise((resolve) => {
        setTimeout(() => {
          const { operand1, operator, operand2 } = program.operation;
          const result = operations[operator](operand1, operand2);

          resolve(result);
        }, timeoutTime);
      });
    },

    handlePauseKeyup() {
      console.log('pause');
    },

    handleContinueKeyup() {
      console.log('continue');
    },

    handleInterruptKeyup() {
      console.log('interrupt');
    },

    handleErrorKeyup() {
      console.log('error');
    },
  },
  components: {
    Stopwatch,
    ProcessBatches,
    Batch,
  },
};
</script>

<style scoped lang="scss">
.list-item:not(:last-child) {
  margin-bottom: 0.5rem;
}

.list-enter-active, .list-leave-active {
  transition: all .5s;
}

.list-enter, .list-leave-to  {
  opacity: 0;
  transform: translateY(30px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}

</style>
