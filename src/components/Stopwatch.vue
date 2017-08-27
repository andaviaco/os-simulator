<template lang="html">
  <span>{{ this.timer.format('HH:mm:ss') }}</span>
</template>

<script>
import moment from 'moment';

export default {
  name: 'stopwatch',
  data() {
    return {
      timer: moment().hour(0).minute(0).seconds(0),
      seconds: 0,
      intervalId: null,
    };
  },
  methods: {
    start() {
      this.interval = setInterval(() => {
        this.seconds += 1;
        this.timer = moment().hour(0).minute(0).seconds(this.seconds);
      }, 1000);
    },

    stop() {
      clearInterval(this.interval);
    },
  },
};
</script>
