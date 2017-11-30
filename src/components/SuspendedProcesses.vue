<template lang="html">
  <div>
    <h4 class="title is-4 has-text-centered">
      <span class="icon">
        <i class="fa fa-database"></i>
      </span>
      <span>
        Procesos Suspendidos <span class="tag is-dark">{{processes.length}}</span>
      </span>
    </h4>
    <batch :programs="processes">
      <template slot="item" scope="props">
        <div class="message is-dark">
        <div class="message-body">
          <dl>
            <div>
              <dt class="is-inline"><strong>ID:</strong></dt>
              <dd class="is-inline"><strong>{{ props.program.id }}</strong></dd>
            </div>

            <div>
              <dt class="is-inline">Memoria:</dt>
              <dd class="is-inline">{{ props.program.memory }}</dd>
            </div>
          </dl>
        </div>
        </div>
      </template>
    </batch>
  </div>
</template>

<script>
import Batch from '@/components/Batch';

export default {
  name: 'suspended-processes',
  props: ['processes'],
  components: {
    Batch,
  },
};
</script>

<style lang="css">
</style>
