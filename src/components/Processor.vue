<template lang="html">
  <div>
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

    <div class="tabs is-centered is-boxed">
      <ul>
        <li :class="{'is-active': currentTab === 'processing'}">
          <a @click.prevent="toggleTab('processing')">
            <span class="icon is-small"><i class="fa fa-flash"></i></span>
            <span>Procesamiento</span>
          </a>
        </li>
        <li :class="{'is-active': currentTab === 'resume'}">
          <a @click.prevent="toggleTab('resume')">
            <span class="icon is-small"><i class="fa fa-table"></i></span>
            <span>Resumen</span>
          </a>
        </li>
      </ul>
    </div>

    <section
      tabindex="-1"
      @keyup.p="handlePauseKeyup"
      @keyup.c="handleContinueKeyup"
      @keyup.e="handleInterruptKeyup"
      @keyup.w="handleErrorKeyup"
      v-if="currentTab === 'processing'"
    >
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
    </section>

    <section v-if="currentTab === 'resume'">
      <process-review-table
        :processes="processedPrograms"
        caption="Procesos Finalizados"
      ></process-review-table>
    </section>
  </div>
</template>

<script>
import Stopwatch from '@/components/Stopwatch';
import Batch from '@/components/Batch';
import FinishedProcesses from '@/components/FinishedProcesses';
import ReadyProcesses from '@/components/ReadyProcesses';
import ProcessInProgress from '@/components/ProcessInProgress';
import BlockedProcesses from '@/components/BlockedProcesses';
import ProcessReviewTable from '@/components/ProcessReviewTable';

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
      currentTab: 'processing',
    };
  },
  methods: {
    async handleStartClick() {
      this.$refs.timer.start();

      this.status = PROCESOR_STATUS.processing;
      this.pullProcesses(5);
      this.processNext();
    },

    pullProcesses(count = 1) {
      const newProcesses = this.pendingBatch.splice(0, count);
      const arrivalTime = this.$refs.timer.seconds;

      /* eslint-disable */
      newProcesses.forEach(p => (p.arrivalTime = arrivalTime));
      /* eslint-disable */

      this.batch = [...this.batch, ...newProcesses];
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
      if (!this.currentProcess.responseTime) {
        this.currentProcess.responseTime = this.$refs.timer.seconds;
      }

      return this.processCurrent();
    },

    async processCurrent() {
      await this.currentProcess.processOperation();

      await this.restTime(1000);

      this.finishProcess();

      return this.processNext();
    },

    finishProcess() {
      this.currentProcess.finishTime = this.$refs.timer.seconds;
      this.processedPrograms.push(this.currentProcess);
      this.pullProcesses(1);
      this.currentProcess = {};
    },

    resumeProcessing() {
      this.$refs.timer.start();
      this.processCurrent();
      this.resumeBlockedProcesses();
      this.status = PROCESOR_STATUS.processing;
    },

    stopProcessing() {
      if (!this.blockedPrograms.length) {
        this.pauseProcessing();
      }
    },

    pauseProcessing() {
      this.$refs.timer.stop();
      this.stopBlockedProcesses();
      this.status = PROCESOR_STATUS.paused;
    },

    resumeBlockedProcesses() {
      this.blockedPrograms.forEach(p => this.startBlocking(p));
    },

    stopBlockedProcesses() {
      this.blockedPrograms.forEach(p => p.stopBlocked());
    },

    async startBlocking(program) {
      await program.startBlocking();

      this.blockedPrograms = this.blockedPrograms.filter(p => p.id !== program.id);
      this.batch.push(program);

      if (this.batch.length === 1 && !this.currentProcess.id) {
        this.processNext();
      }
    },

    interruptCurrentProcess() {
      this.currentProcess.pauseProcess();

      this.blockedPrograms.push(this.currentProcess);
      this.startBlocking(this.currentProcess);

      this.currentProcess = {};
      this.processNext();
    },

    cancelCurrentProcess() {
      this.currentProcess.pauseProcess();
      this.currentProcess.status = PROCESS_STATUS.error;
      this.finishProcess();
      this.$refs.timer.start();
      this.processNext();
    },

    handlePauseKeyup() {
      this.currentProcess.pauseProcess();
      this.pauseProcessing();
    },

    handleContinueKeyup() {
      if (this.status === PROCESOR_STATUS.paused) {
        this.resumeProcessing();
      }
    },

    handleInterruptKeyup() {
      if (this.status === PROCESOR_STATUS.processing) {
        this.interruptCurrentProcess();
      }
    },

    handleErrorKeyup() {
      this.cancelCurrentProcess();
    },

    async restTime(time = 1000) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    },

    toggleTab(tab) {
      this.currentTab = tab;
    },
  },
  components: {
    Stopwatch,
    Batch,
    FinishedProcesses,
    ReadyProcesses,
    ProcessInProgress,
    BlockedProcesses,
    ProcessReviewTable,
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
