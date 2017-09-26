<template lang="html">
  <table class="table is-striped is-fullwidth">
    <caption>{{ caption }}</caption>

    <thead>
      <tr>
        <th>ID</th>
        <th>Tiempo de Llegada</th>
        <th>Tiempo de Finalización</th>
        <th>Tiempo de Retorno</th>
        <th>Tiempo de Respuesta</th>
        <th>Tiempo de Espera</th>
        <th>Tiempo de Servicio</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="program in processes" :key="program.id">
        <td>{{ program.id }}</td>
        <td>{{ program.arrivalTime }}</td>
        <td>{{ program.finishTime }}</td>
        <td>{{ program.id }}</td>
        <td>{{ program.id }}</td>
        <td>{{ program.id }}</td>
        <td>{{ program.id }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Batch from '@/components/Batch';

export default {
  name: 'process-review-table',
  props: ['processes', 'caption'],
  components: {
    Batch,
  },
};
</script>

<style lang="css">
</style>
