<template>
  <div>
    <div class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">OS Simulator</h1>
          <h2 class="subtitle is-2">
            SRTN
            <button class="button is-small is-info is-inverted is-outlined" @click="handleOpenModalClick">
              <span>WTF!?</span>
            </button>
          </h2>
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
              @submit-program="handleProgramSubmit"
              ></process-form>
            </article>
          </div>

          <div class="tile is-parent">
            <article class="tile is-child box">
              <div
                class="message is-primary"
                tabindex="-1"
                @keyup.p="handleKeyup($event)"
                @keyup.c="handleKeyup($event)"
                @keyup.e="handleKeyup($event)"
                @keyup.w="handleKeyup($event)"
            >
                <div class="message-header">
                  Comandos
                </div>
                <div class="message-body">
                  <div class="content">
                    <p v-show="pressedKey.key">Presionaste: <strong>{{ pressedKey.key }}</strong></p>
                    <ul>
                      <li><strong>P</strong>: Pausa</li>
                      <li><strong>C</strong>: Continuar</li>
                      <li><strong>E</strong>: Entrada/Salida</li>
                      <li><strong>W</strong>: Error</li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>


      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <processor ref="processor"></processor>
          </article>
        </div>
      </div>
    </div>

    <modal-card ref="modal">
      <template slot="title">
        SRTN (Short Remaining Time First)
      </template>
      <template slot="body">
        <div class="content">
          <p>
            Es similar al SJF, con la diferencia de que si un nuevo proceso pasa a listo se activa el dispatcher  para ver si es más corto que lo que queda por ejecutar del proceso en ejecución. Si es así, el proceso en ejecución pasa a listo y su tiempo de estimación se decremento con el tiempo que ha estado ejecutándose.
          </p>

          <ul>
            <li>
              Los procesos llegan a la cola y solicitan un intervalo de CPU.
            </li>
            <li>
              Si dicho intervalo es inferior al que le falta al proceso en ejecución para abandonar la CPU, el nuevo proceso pasa a la CPU y el que se ejecutaba a la cola de preparados.
            </li>
          </ul>
        </div>
      </template>
    </modal-card>
  </div>
</template>

<script>
import ProcessForm from '@/components/ProcessForm';
import Processor from '@/components/Processor';
import ModalCard from '@/components/ModalCard';

import Program from '@/models/Program';

export default {
  name: 'index',
  data() {
    return {
      pressedKey: {
        key: null,
        keyCode: null,
      },
    };
  },
  methods: {
    handleProgramSubmit(programData) {
      const program = new Program(
        programData.operation,
        programData.timeMax,
      );
      this.$refs.processor.addProcess(program);
    },
    handleKeyup($event) {
      this.pressedKey = {
        key: $event.key,
        keyCode: $event.keyCode,
      };
    },
    handleOpenModalClick() {
      this.$refs.modal.open();
    },
  },
  components: {
    ProcessForm,
    Processor,
    ModalCard,
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
