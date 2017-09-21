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
        <blocked-processes :processes="blockedPrograms"></blocked-processes>
    </div>
    <div class="column">
      <ready-processes :processes="batch"></ready-processes>
    </div>

    <div class="column">
      <process-in-progress :currentProcess="currentProcess"></process-in-progress>
    </div>

    <div class="column">
      <finished-processes :processes="processedPrograms"></finished-processes>
    </div>
  </div>
  </div>
</template>

<script>
import Stopwatch from '@/components/Stopwatch';
import Batch from '@/components/Batch';
import FinishedProcesses from '@/components/FinishedProcesses';
import ReadyProcesses from '@/components/ReadyProcesses';
import ProcessInProgress from '@/components/ProcessInProgress';
import BlockedProcesses from '@/components/BlockedProcesses';

import { PROCESOR_STATUS, PROCESS_STATUS } from '@/const';

export default {
  name: 'processor',
  props: ['initialBatch', 'pendingBatch'],
  data() {
    return {
      batch: this.initialBatch || [],
      currentProcess: {},
      processedPrograms: [],
      blockedPrograms: [],
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
      this.blockedPrograms.push(this.currentProcess);
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
    FinishedProcesses,
    ReadyProcesses,
    ProcessInProgress,
    BlockedProcesses,
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
