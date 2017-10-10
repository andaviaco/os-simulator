<template lang="html">
  <div
    tabindex="-1"
    @keyup.p="handlePauseKeyup"
    @keyup.c="handleContinueKeyup"
    @keyup.e="handleInterruptKeyup"
    @keyup.w="handleErrorKeyup"
    @keyup.b="handleProcessesModalKeyup"
    @keyup.u="handleRequestProcessKeyup"
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
  </div>
</template>

<script>
import FinishedProcesses from '@/components/FinishedProcesses';
import ReadyProcesses from '@/components/ReadyProcesses';
import ProcessInProgress from '@/components/ProcessInProgress';
import BlockedProcesses from '@/components/BlockedProcesses';

import {
  PROCESOR_STATUS,
  PROCESS_STATUS,
  MAX_PROCESSES_IN_MEMORY,
} from '@/const';

export default {
  name: 'processor',
  props: ['initialBatch', 'pendingBatch', 'currentTime'],
  data() {
    return {
      batch: this.initialBatch || [],
      currentProcess: {},
      processedPrograms: [],
      blockedPrograms: [],
      status: PROCESOR_STATUS.paused,
    };
  },
  computed: {
    processesInMemory() {
      let inMemory = [
        ...this.blockedPrograms,
        ...this.batch,
      ];

      if (this.currentProcess.id) {
        inMemory = [this.currentProcess, ...inMemory];
      }

      return inMemory;
    },
  },
  methods: {
    async start() {
      this.status = PROCESOR_STATUS.processing;
      this.pullProcesses(MAX_PROCESSES_IN_MEMORY);
      this.processNext();
    },

    pullProcesses(count = 1) {
      const newProcesses = this.pendingBatch.splice(0, count);
      const arrivalTime = this.currentTime;

      /* eslint-disable */
      newProcesses.forEach(p => {
        p.setReady();
        p.arrivalTime = arrivalTime;
      });
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
      if (this.currentProcess.responseTime === null) {
        this.currentProcess.responseTime = this.currentTime;
      }

      return this.processCurrent();
    },

    async processCurrent() {
      await this.currentProcess.processOperation();

      this.finishProcess();

      return this.processNext();
    },

    finishProcess() {
      this.currentProcess.finishTime = this.currentTime;
      this.processedPrograms.push(this.currentProcess);

      this.$emit('finish-process', this.currentProcess);

      this.pullProcesses(1);
      this.currentProcess = {};
    },

    resumeProcessing() {
      this.$emit('resume-processing');

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
      this.$emit('pause-processing');

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
      // this.$refs.timer.start();
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

    handleProcessesModalKeyup(e) {
      this.handlePauseKeyup();
      this.$emit('open-processes-modal');
    },

    handleErrorKeyup() {
      this.cancelCurrentProcess();
    },

    handleRequestProcessKeyup() {
      this.$emit('request-new-process');
    },
  },
  components: {
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
