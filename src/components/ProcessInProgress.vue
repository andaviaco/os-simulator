<template lang="html">
  <div>
    <h4 class="title is-4 has-text-centered">
      <span class="icon has-text-warning">
        <i class="fa fa-bolt"></i>
      </span>
      <span>
        Proceso en Ejecución
      </span>
    </h4>
    <transition name="fade">
      <div class="message is-small is-warning" v-if="currentProcess.id">
        <div class="message-body">
          <dl>
            <div class="tags has-addons is-pulled-right">
              <span class="tag">Tiempo Restante</span>
              <span class="tag is-danger" >
                {{ currentProcess.remainingTime }}
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
            :max="currentProcess.timeMax - 1"
          >
            {{ currentProcess.time }} / {{ currentProcess.timeMax }}
          </progress>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Batch from '@/components/Batch';

export default {
  name: 'precess-in-progress',
  props: ['currentProcess'],
  components: {
    Batch,
  },
};
</script>

<style lang="css">
</style>
