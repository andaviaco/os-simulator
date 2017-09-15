<template>
  <div>
    <div class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">OS Simulator</h1>
          <h2 class="subtitle is-2">
            <span>
              FCFS
            </span>
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
        FCFS (Firts-Come, First-Served)
      </template>
      <template slot="body">
        <div class="content">
          <p>
            En esta política de planificación, el procesador ejecuta cada proceso hasta que termina, por tanto, los procesos que en cola de procesos preparados permanecerán encolados en el orden en que lleguen hasta que les toque su ejecución. Este método se conoce también como <strong>FIFO</strong> (fist input, first output, Primero en llegar primero en salir).
          </p>

          <p>
            Se trata de una política muy simple y sencilla de llevar a la práctica, pero muy pobre en cuanto a su comportamiento.
          </p>

          <p>
            La cantidad de tiempo de espera de cada proceso depende del número de procesos que se encuentren en la cola en el momento de su petición de ejecución y del tiempo que cada uno de ellos tenga en uso al procesador, y es independiente de las necesidades del propio proceso.
          </p>

          <strong>Características:</strong>
          <ul>
            <li>No apropiativa.</li>
            <li>Es justa, aunque los procesos largos hacen esperar mucho a los cortos.</li>
            <li>Predecible.</li>
            <li>El tiempo medio de servicio es muy variable en función del número de procesos y su duración.</li>
          </ul>

          <figure>
            <img src="/static/fifo.png" alt="">
            <figcaption>Ejemplo de planificación FCFS</figcaption>
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
