<template>
  <div>
    <div class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">OS Simulator</h1>
          <h2 class="subtitle is-2">
            Round Robin
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
              <div>
                <div class="field">
                  <label class="label">Quantum</label>
                  <div class="control has-icons-right">
                    <input class="input" type="number" placeholder="4" v-model.number="quantum">
                    <span class="icon is-small is-right">
                      <i class="fa fa-warning"></i>
                    </span>
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
            <processor ref="processor" :quantum="quantum"></processor>
          </article>
        </div>
      </div>
    </div>

    <modal-card ref="modal">
      <template slot="title">
        Round Robin
      </template>
      <template slot="body">
        <div class="content">
          <p>
            Es un método para seleccionar todos los elementos en un grupo de manera equitativa y en un orden racional, normalmente comenzando por el primer elemento de la lista hasta llegar al último y empezando de nuevo desde el primer elemento.
          </p>

          <p>
            Round Robin es uno de los algoritmos de planificación de procesos más complejos y difíciles, dentro de un sistema operativo asigna a cada proceso una porción de tiempo equitativa y ordenada, tratando a todos los procesos con la misma prioridad.
          </p>

          <p>
            Se define un intervalo de tiempo denominado cuanto, cuya duración varía según el sistema. La cola de procesos se estructura como una cola circular. El planificado la recorre asignando un cuanto de tiempo a cada proceso. La organización de la cola es FIFO.
          </p>

          <figure>
            <img src="/static/RoundRobin.gif" alt="">
            <figcaption>Ejemplo: Round Robin</figcaption>
          </figure>
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
      quantum: 4,
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
