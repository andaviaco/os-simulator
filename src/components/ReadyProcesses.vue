<template lang="html">
  <div>
    <h4 class="title is-4 has-text-centered">
      <span class="icon has-text-info">
        <i class="fa fa-clock-o"></i>
      </span>
      <span>
        Procesos Listos
      </span>
    </h4>
    <batch :programs="processes">
      <template slot="item" scope="props">
        <div class="message is-small is-primary">
          <div class="message-body">
            <dl>
              <div class="tags has-addons is-pulled-right">
                <span class="tag">Turno</span>
                <span class="tag is-info" >
                  {{ props.index + 1 }}
                </span>
              </div>

              <div>
                <dt class="is-inline"><strong>ID:</strong></dt>
                <dd class="is-inline"><strong>{{ props.program.id }}</strong></dd>
              </div>

              <div>
                <dt class="is-inline">Tiempo Maximo:</dt>
                <dd class="is-inline">{{ props.program.timeMax }} secs.</dd>
              </div>

              <div>
                <dt class="is-inline">Tiempo Restante:</dt>
                <dd class="is-inline">{{ props.program.timeMax - props.program.time }} secs.</dd>
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
  name: 'ready-processes',
  props: ['processes'],
  components: {
    Batch,
  },
};
</script>

<style lang="css">
</style>
