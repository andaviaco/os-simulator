<template lang="html">
  <div>
    <h4 class="title is-4 has-text-centered">
      <span class="icon has-text-danger">
        <i class="fa fa-ban"></i>
      </span>
      <span>
        Procesos Bloqueados
      </span>
    </h4>
    <batch :programs="processes">
      <template slot="item" scope="props">
        <div class="message is-small is-info">
          <div class="message-body">
            <dl>
              <div>
                <dt class="is-inline"><strong>ID:</strong></dt>
                <dd class="is-inline"><strong>{{ props.program.id }}</strong></dd>
              </div>

              <div>
                <dt class="is-inline">Tiempo Transcurrido:</dt>
                <dd class="is-inline">{{ props.program.time }} secs.</dd>
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
  name: 'blocked-processes',
  props: ['processes'],
  components: {
    Batch,
  },
};
</script>

<style lang="css">
</style>
