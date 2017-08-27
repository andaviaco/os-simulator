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

          <div class="tile is-parent">
            <div class="tile is-child box">
              <h3 class="title">Crear Proceso</h3>
              <process-form
                ref="processForm"
                @submit-program="handleSubmitProgram"
                @id-change="handleIdChange"
              ></process-form>
            </div>
          </div>

          <div class="tile is-parent">
            <div class="tile is-child box">
              <h3 class="title">Lotes</h3>
              <process-batches
                :batches="batches"
              ></process-batches>
            </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
import ProcessForm from '@/components/ProcessForm';
import ProcessBatches from '@/components/ProcessBatches';

class ProgramBatcher {
  MAX_PROGRAM_PER_BARCH = 5;

  constructor() {
    this.batches = [[
      {
        id: '55',
        programmerName: 'andres',
        timeMax: '56',
        operation: {
          operad1: 5,
          operator: '*',
          operand2: 6,
        },
      },
    ]];
  }

  get lastBatch() {
    return this.batches[this.batches.length - 1];
  }

  addProgram(program) {
    const lastBatch = this.lastBatch;


    if (lastBatch.length + 1 < this.MAX_PROGRAM_PER_BARCH) {
      lastBatch.push(program);
    } else {
      this.createBatch(program);
    }
  }

  createBatch(...programs) {
    this.batches.push(programs);
  }

  isIdAvailable(id) {
    const flatPrograms = this.batches.reduce((acc, batch) => acc.concat(batch), []);
    const takenIds = flatPrograms.map(program => program.id);

    return !takenIds.find(programId => programId === id);
  }
}


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
