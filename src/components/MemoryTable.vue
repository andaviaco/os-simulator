<template lang="html">
  <div class="columns is-gapless">
    <div class="column is-half">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>PID</th>
            <th>Frame</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(frame, i) in memorySlice1" :key="i">
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
    </div>

    <div class="column">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>PID</th>
            <th>Frame</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(frame, i) in memorySlice2" :key="i">
            <td><strong>{{ memorySlice1.length + i }}</strong></td>
            <td><em>{{ frame[0] || '-' }}</em></td>
            <td>
              <div class="tags">
                <span v-for="(slot, j) in frame" :key="j" :class="['tag', tagClass(slot)]"></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'memory-table',
  props: {
    memory: {
      type: Array,
      default: [],
    },
    runningPid: {
      type: String,
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
  computed: {
    memorySlice1() {
      return this.memory.slice(0, this.memory.length / 2);
    },
    memorySlice2() {
      return this.memory.slice(this.memory.length / 2);
    },
  },
  methods: {
    tagClass(pid) {
      if (!pid) return '';

      if (this.runningPid === pid) {
        return 'is-warning';
      } else if (this.readyPids.find(ipid => ipid === pid)) {
        return 'is-primary';
      } else if (this.blockedPids.find(ipid => ipid === pid)) {
        return 'is-info';
      } else if (pid === 'OS') {
        return 'is-dark';
      }

      return '';
    },
  },
};

</script>

<style lang="css">
</style>
