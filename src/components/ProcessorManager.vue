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

    <section v-show="currentTab === 'processing'">
      <processor
        ref="processor"
        :pendingBatch.sync="pendingBatch"
        :currentTime="timer.seconds"
        @finish-process="handleProcessFinish"
        @resume-processing="handleProcessingResume"
        @pause-processing="handleProcessingPause"
      ></processor>
    </section>

    <section v-show="currentTab === 'resume'">
      <process-review-table
        :processes="processedPrograms"
        caption="Procesos Finalizados"
      ></process-review-table>
    </section>
  </div>
</template>

<script>
import Stopwatch from '@/components/Stopwatch';
import Processor from '@/components/Processor';
import ProcessReviewTable from '@/components/ProcessReviewTable';

export default {
  name: 'processor-manager',
  props: ['pendingBatch'],
  data() {
    return {
      processedPrograms: [],
      currentTab: 'processing',
      timer: { seconds: 0 },
    };
  },
  mounted() {
    this.timer = this.$refs.timer;
  },
  methods: {
    async handleStartClick() {
      this.$refs.timer.start();
      this.$refs.processor.start();
    },

    handleProcessFinish(program) {
      this.processedPrograms.push(program);
    },
    handleProcessingResume() {
      this.$refs.timer.start();
    },

    handleProcessingPause() {
      this.$refs.timer.stop();
    },

    toggleTab(tab) {
      this.currentTab = tab;
    },
  },
  components: {
    Stopwatch,
    Processor,
    ProcessReviewTable,
  },
};
</script>

<style scoped lang="scss">

</style>