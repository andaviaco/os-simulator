<template lang="html">
  <div>
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
      <h4 class="title is-4 has-text-centered">Lotes en ejecución</h4>
      <ul>
        <li v-for="program in currentBatch" :key="program.id">
          <div class="message is-small is-primary is-marginless">
            <div class="message-body">
              <strong>ID: {{ program.id }}</strong> - Tiempo Maximo: {{ program.timeMax }}
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="column">
      <h4 class="title is-4 has-text-centered">Proceso en ejecución</h4>
      <div class="message is-small is-warning" v-show="currentProcess.id">
        <div class="message-body">
          <p><strong>ID: {{ currentProcess.id }}</strong></p>
          <p>Tiempo Maximo: {{ currentProcess.timeMax }}</p>
        </div>
      </div>
    </div>

    <div class="column">
      <h4 class="title is-4 has-text-centered">Procesos terminados</h4>
    </div>
  </div>
  </div>
</template>

<script>
import Stopwatch from '@/components/Stopwatch';

export default {
  name: 'processor',
  props: ['batches'],
  data() {
    return {
      currentBatch: [],
      currentProcess: {},
    };
  },
  methods: {
    handleStartClick() {
      this.$refs.timer.start();
      this.currentBatch = this.batches.pop();
      this.$emit('update:batches', this.batches);

      this.processBatches();
    },

    async processBatches() {
      const allPrograms = [...this.currentBatch];

      for (const program of allPrograms) {
        this.currentBatch.pop();
        this.currentProcess = program;

        await this.processProgram(program);
      }
    },

    async processProgram(program) {
      const timeoutTime = program.timeMax * 1000;

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, timeoutTime);
      });
    },
  },
  components: {
    Stopwatch,
  },
};
</script>
