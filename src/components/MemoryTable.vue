<template lang="html">
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>PID</th>
        <th>Frame</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in 30" :key="i">
        <td><strong>{{ i }}</strong></td>
        <td><em>{{ i + 1 }}</em></td>
        <td>
          <div class="tags">
            <span class="tag is-dark"></span>
            <span class="tag is-warning"></span>
            <span class="tag is-primary"></span>
            <span class="tag is-info"></span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'memory-table',
};

</script>

<style lang="css">
</style>
