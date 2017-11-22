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
      <tr v-for="(frame, i) in memory" :key="i">
        <td><strong>{{ i }}</strong></td>
        <td><em>{{ frame[0] || '-' }}</em></td>
        <td>
          <div class="tags">
            <span v-for="(slot, j) in frame" :key="j" :class="['tag', tagClass(slot)]"></span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'memory-table',
  props: {
    memory: {
      type: Array,
      default: [],
    },
    runingPid: {
      type: Number,
      default: null,
    },
    readyPids: {
      type: Array,
      default: [],
    },
    blockedPids: {
      type: Array,
      default: [],
    },
  },
  methods: {
    tagClass(pid) {
      if (!pid) return '';

      if (this.runingPid === pid) {
        return 'is-warning';
      } else if (this.readyPids.find(ipid => ipid === pid)) {
        return 'is-primary';
      } else if (this.blockedPids.find(ipid => ipid === pid)) {
        return 'is-info';
      }

      return '';
    },
  },
};

</script>

<style lang="css">
</style>
