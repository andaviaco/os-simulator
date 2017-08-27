<template>
  <div>
    <div class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">OS Simulator</h1>
          <h2 class="subtitle is-2">Practica 1</h2>
        </div>
      </div>
    </div>

    <div class="section">

      <div class="tile is-ancestor">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <h3 class="title">Crear Proceso</h3>
              <process-form
              ref="processForm"
              @submit-program="handleSubmitProgram"
              @id-change="handleIdChange"
              ></process-form>
            </article>
          </div>

          <div class="tile is-parent">
            <article class="tile is-child box">
              <h3 class="title">Lotes</h3>
              <process-batches :batches="batches"></process-batches>
            </article>
          </div>
        </div>
      </div>


      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <processor :batches="batches"></processor>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProcessForm from '@/components/ProcessForm';
import ProcessBatches from '@/components/ProcessBatches';
import Processor from '@/components/Processor';

import ProgramBatcher from '@/models/ProgramBatcher';


const batcher = new ProgramBatcher();

export default {
  name: 'index',
  data() {
    return {
      batches: batcher.batches,
    };
  },
  methods: {
    handleSubmitProgram(program) {
      batcher.addProgram(program);
    },
    handleIdChange(id) {
      this.$refs.processForm.setIdValidity(batcher.isIdAvailable(id));
    },
  },
  components: {
    ProcessForm,
    ProcessBatches,
    Processor,
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
