<template lang="html">
  <div>
    <h4 class="title is-4 has-text-centered">
      <span class="icon has-text-success">
        <i class="fa fa-check"></i>
      </span>
      <span>
        Procesos Finalizados
      </span>
    </h4>
    <batch :programs="processes">
      <template slot="item" scope="props">
        <div
          class="message is-small"
          :class="{'is-success': props.program.statusIs('ok'), 'is-danger': props.program.statusIs('error')}"
        >
          <div class="message-body">
            <div class="tags has-addons is-pulled-right">
              <span class="tag">Status</span>
              <span
                class="tag"
                :class="{'is-success': props.program.statusIs('ok'), 'is-danger': props.program.statusIs('error')}"
              >
                {{ props.program.status }}
              </span>
            </div>

            <dl>
              <div>
                <dt class="is-inline"><strong>ID:</strong></dt>
                <dd class="is-inline"><strong>{{ props.program.id }}</strong></dd>
              </div>

              <div>
                <dt class="is-inline">Operación:</dt>
                <dd class="is-inline">
                  {{ `${props.program.operation.operand1} ${props.program.operation.operator} ${props.program.operation.operand2}` }}
                </dd>
              </div>

              <div v-if="props.program.statusIs('ok')">
                <dt class="is-inline">Resultado:</dt>
                <dd class="is-inline">{{ props.program.operation.result }}</dd>
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
  name: 'finished-processes',
  props: ['processes'],
  components: {
    Batch,
  },
};
</script>

<style lang="css">
</style>
