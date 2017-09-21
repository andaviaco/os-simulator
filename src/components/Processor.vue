<template lang="html">
  <div
    tabindex="-1"
    @keyup.p="handlePauseKeyup"
    @keyup.c="handleContinueKeyup"
    @keyup.e="handleInterruptKeyup"
    @keyup.w="handleErrorKeyup"
  >
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h3 class="title is-3">
            Procesamiento
          </h3>
        </div>
    </div>

    <div class="level-right">
      <div class="leve-item">
        <div class="field is-grouped ">
          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-dark">Procesos Nuevos</span>
              <span class="tag is-warning">
                {{ this.pendingBatch.length }}
              </span>
            </div>
          </div>

          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-dark">Tiempo transcurrido</span>
              <span class="tag is-info">
                <stopwatch ref="timer"></stopwatch>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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

  <div class="columns">
    <div class="column">
      <h4 class="title is-4 has-text-centered">
        <span class="icon has-text-info">
          <i class="fa fa-clock-o"></i>
        </span>
        <span>
          Lote en ejecución
        </span>
      </h4>
      <batch :programs="batch">
        <template slot="item" scope="props">
          <div class="message is-small is-primary">
            <div class="message-body">
              <dl>
                <div class="tags has-addons is-pulled-right">
                  <span class="tag">Turno</span>
                  <span class="tag is-info" >
                    {{ props.index + 1 }}
                  </span>
                </div>

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
      <h4 class="title is-4 has-text-centered">
        <span class="icon has-text-warning">
          <i class="fa fa-bolt"></i>
        </span>
        <span>
          Proceso en ejecución
        </span>
      </h4>
      <transition name="fade">
        <div class="message is-small is-warning" v-if="currentProcess.id">
          <div class="message-body">
            <dl>
              <div class="tags has-addons is-pulled-right">
                <span class="tag">Tiempo Restante</span>
                <span class="tag is-danger" >
                  {{ currentProcess.timeMax - currentProcess.time }}
                </span>
              </div>

              <div>
                <dt class="is-inline"><strong>ID:</strong></dt>
                <dd class="is-inline"><strong>{{ currentProcess.id }}</strong></dd>
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
            </dl>

            <progress
              class="progress is-primary"
              :value="currentProcess.time"
              :max="currentProcess.timeMax"
            >
              {{ currentProcess.time }} / {{ currentProcess.timeMax }}
            </progress>
          </div>
        </div>
      </transition>
    </div>

    <div class="column">
      <h4 class="title is-4 has-text-centered">
        <span class="icon has-text-success">
          <i class="fa fa-check"></i>
        </span>
        <span>
          Procesos finalizados
        </span>
      </h4>
      <batch :programs="processedPrograms">
        <template slot="item" scope="props">
          <div
            class="message is-small"
            :class="{'is-success': props.program.statusIs('ok'), 'is-danger': props.program.statusIs('error')}"
          >
            <div class="message-body">
              <div class="tags has-addons is-pulled-right">
                <span class="tag">Status</span>
                <span
                  class="tag"
                  :class="{'is-success': props.program.statusIs('ok'), 'is-danger': props.program.statusIs('error')}"
                >
                  {{ props.program.status }}
                </span>
              </div>

              <dl>
                <div>
                  <dt class="is-inline"><strong>ID:</strong></dt>
                  <dd class="is-inline"><strong>{{ props.program.id }}</strong></dd>
                </div>

                <div>
                  <dt class="is-inline">Operación:</dt>
                  <dd class="is-inline">
                    {{ `${props.program.operation.operand1} ${props.program.operation.operator} ${props.program.operation.operand2}` }}
                  </dd>
                </div>

                <div v-if="props.program.statusIs('ok')">
                  <dt class="is-inline">Resultado:</dt>
                  <dd class="is-inline">{{ props.program.operation.result }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </template>
      </batch>
    </div>
  </div>
  </div>
</template>

<script>
import Stopwatch from '@/components/Stopwatch';
import Batch from '@/components/Batch';

import { PROCESOR_STATUS, PROCESS_STATUS } from '@/const';

export default {
  name: 'processor',
  props: ['initialBatch', 'pendingBatch'],
  data() {
    return {
      batch: this.initialBatch || [],
      currentProcess: {},
      processedPrograms: [],
      currentTimeoutId: null,
      status: PROCESOR_STATUS.paused,
    };
  },
  methods: {
    async handleStartClick() {
      this.$refs.timer.start();

      this.status = PROCESOR_STATUS.processing;
      this.batch = this.pendingBatch.splice(0, 5);
      this.processNext();
    },

    async processNext() {
      if (this.batch.length > 0) {
        this.selectNext();

        return this.runSelected();
      }

      this.stopProcessing();
      return Promise.resolve();
    },

    selectNext() {
      const nextProcess = this.batch[0];

      this.currentProcess = nextProcess;
      this.batch = this.batch.filter(program => program.id !== nextProcess.id);
    },

    runSelected() {
      return this.processCurrent();
    },

    async processCurrent() {
      await this.currentProcess.processOperation();

      await this.restTime(1000);

      this.processedPrograms.push(this.currentProcess);
      this.currentProcess = {};

      return this.processNext();
    },

    resumeProcessing() {
      this.$refs.timer.start();
      this.processCurrent();
      this.status = PROCESOR_STATUS.processing;
    },

    stopProcessing() {
      this.$refs.timer.stop();
      this.status = PROCESOR_STATUS.paused;
    },

    interruptCurrentProcess() {
      this.currentProcess.pauseProcess();
      this.batch.push(this.currentProcess);
      this.currentProcess = {};
      this.processNext();
    },

    cancelCurrentProcess() {
      this.currentProcess.pauseProcess();
      this.currentProcess.status = PROCESS_STATUS.error;
      this.processedPrograms.push(this.currentProcess);
      this.currentProcess = {};
      this.$refs.timer.start();
      this.processNext();
    },

    handlePauseKeyup() {
      console.log('pause');
      this.currentProcess.pauseProcess();
      this.stopProcessing();
    },

    handleContinueKeyup() {
      if (this.status === PROCESOR_STATUS.paused) {
        console.log('continue');
        this.resumeProcessing();
      }
    },

    handleInterruptKeyup() {
      if (this.status === PROCESOR_STATUS.processing) {
        console.log('interrupt');
        this.interruptCurrentProcess();
      }
    },

    handleErrorKeyup() {
      console.log('error');
      this.cancelCurrentProcess();
    },

    async restTime(time = 1000) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    },
  },
  components: {
    Stopwatch,
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
