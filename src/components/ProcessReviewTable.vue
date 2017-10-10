<template lang="html">
  <table class="table is-striped is-fullwidth">
    <caption>{{ caption }}</caption>

    <thead>
      <tr>
        <th>ID</th>
        <th class="has-text-centered">Estado</th>
        <th class="has-text-centered">Tiempo de Llegada</th>
        <th class="has-text-centered">Tiempo de Finalización</th>
        <th class="has-text-centered">Tiempo de Retorno</th>
        <th class="has-text-centered">Tiempo de Respuesta</th>
        <th class="has-text-centered">Tiempo de Espera</th>
        <th class="has-text-centered">Tiempo de Servicio</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(program, i) in processes"
        v-if="program.id"
        :class="{'is-selected': i === selectedRow}"
        :key="program.id"
        @click="selectRow(i)"
      >
        <td><strong>{{ program.id }}</strong></td>
        <td class="has-text-centered">
          <span
            class="tag"
            :class="program.statusClass()"
          >
            {{ program.status }}
          </span>
        </td>
        <td class="has-text-centered">{{ program.arrivalTime }}</td>
        <td class="has-text-centered">{{ program.finishTime }}</td>
        <td class="has-text-centered">{{ program.returnTime }}</td>
        <td class="has-text-centered">{{ program.relativeResponseTime }}</td>
        <td class="has-text-centered">{{ program.waitingTime }}</td>
        <td class="has-text-centered">{{ program.time }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Batch from '@/components/Batch';

export default {
  name: 'process-review-table',
  props: ['processes', 'caption'],
  data() {
    return {
      selectedRow: null,
    };
  },
  methods: {
    selectRow(index) {
      if (index === this.selectedRow) {
        this.selectedRow = null;
      } else {
        this.selectedRow = index;
      }
    },
  },
  components: {
    Batch,
  },
};
</script>

<style lang="css">
</style>
