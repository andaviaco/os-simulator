<template lang="html">
  <div
    tabindex="-1"
    @keyup.p="handlePauseKeyup"
    @keyup.c="handleContinueKeyup"
    @keyup.e="handleInterruptKeyup"
    @keyup.w="handleErrorKeyup"
    @keyup.b="handleProcessesModalKeyup"
    @keyup.u="handleRequestProcessKeyup"
    @keyup.t="handlePauseKeyup"
  >
    <div class="columns">
      <aside class="column is-2">
        <memory-table
          :memory="memory.data"
          :runningPid="currentProcessPid"
          :readyPids="readyProgramsPid"
          :blockedPids="blockedProgramsPid"
        ></memory-table>
      </aside>

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
import MemoryTable from '@/components/MemoryTable';

import Memory from '@/models/Memory';

import {
  PROCESOR_STATUS,
  PROCESS_STATUS,
  FRAMES_QTY,
  FRAME_SIZE,
} from '@/const';


const memory = new Memory(FRAMES_QTY, FRAME_SIZE);
export default {
  name: 'processor',
  props: ['initialBatch', 'pendingBatch', 'currentTime', 'quantum'],
  data() {
    return {
      batch: this.initialBatch || [],
      currentProcess: {},
      processedPrograms: [],
      blockedPrograms: [],
      status: PROCESOR_STATUS.paused,
      memory,
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

    currentProcessPid() {
      return this.currentProcess.id;
    },

    blockedProgramsPid() {
      return this.blockedPrograms.map(proc => proc.id);
    },

    readyProgramsPid() {
      return this.batch.map(proc => proc.id);
    },
  },
  watch: {
    pendingBatch(newVal, oldVal) {
      if (this.status === PROCESOR_STATUS.processing) {
        const diff = newVal.length - oldVal.length;

        if (diff > 0) {
          this.pullProcesses();

          if (!this.currentProcess.id) {
            this.processNext();
          }
        }
      }
    },
  },
  methods: {
    async start() {
      this.status = PROCESOR_STATUS.processing;
      this.pullProcesses();
      this.processNext();
    },

    pullProcesses() {
      let newProcess;
      let arrivalTime;

      for (const proc of [...this.pendingBatch]) {
        if (!this.memory.fits(proc.memory)) {
          break;
        }

        newProcess = this.pendingBatch.shift();
        arrivalTime = this.currentTime;

        this.memory.add(newProcess.id, newProcess.memory);

        newProcess.setReady();
        newProcess.arrivalTime = arrivalTime;

        this.batch = [...this.batch, newProcess];
      }
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
      const processingTime = this.quantum;

      const result = await this.currentProcess.processOperation(processingTime);

      if (result === null) {
        // enqueue again
        this.batch = [...this.batch, this.currentProcess];
        this.currentProcess = {};
      } else {
        this.finishProcess();
      }

      return this.processNext();
    },

    finishProcess() {
      this.currentProcess.finishTime = this.currentTime;
      this.processedPrograms.push(this.currentProcess);
      this.memory.remove(this.currentProcess.id);

      this.$emit('finish-process', this.currentProcess);

      this.pullProcesses();
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

    handleProcessesModalKeyup() {
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
    MemoryTable,
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
