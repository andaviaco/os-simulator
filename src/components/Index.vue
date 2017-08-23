<template>
  <div>
    <h1>OS Simulator</h1>
    <process-form></process-form>
  </div>
</template>

<script>
import ProcessForm from '@/components/ProcessForm';

export default {
  name: 'index',
  data() {
    return {};
  },
  components: {
    ProcessForm,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}*/
</style>
