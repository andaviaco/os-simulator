<template lang="html">
  <div>
    <div class="">
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

      <span class="is-pulled-right">
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
      </span>
    </div>
  </div>
</template>

<script>
import Stopwatch from '@/components/Stopwatch';

export default {
  name: 'processor',
  props: ['batches'],
  methods: {
    handleStartClick() {
      this.$refs.timer.start();
    },
  },
  components: {
    Stopwatch,
  },
};
</script>
