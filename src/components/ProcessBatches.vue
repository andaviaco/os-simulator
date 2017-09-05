<template>
  <div>
    <article
      class="message is-dark"
      v-for="(batch, index) in batches"
      :key="index"
    >
      <div class="message-header">
        Lote {{ index + 1 }}
      </div>

      <div class="message-body">
        <batch :programs="batch">
          <template slot="item" scope="props">
            <slot class="message"
              name="program"
              :program="props.program">
              <div class="message-body">
                ID: {{ props.program.id }}
              </div>
            </slot>
          </template>
        </batch>
      </div>
    </article>
  </div>
</template>

<script>
import Batch from '@/components/Batch';

export default {
  name: 'process-batches',
  props: ['batches'],
  data() { return {}; },
  components: {
    Batch,
  },
};
</script>
