<template>
  <div>
    <div class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">OS Simulator</h1>
          <h2 class="subtitle is-2">Práctica 4</h2>
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
              <h3 class="title">Configuración</h3>
              <config-form
                :initialConfig="config"
                @quantum-change="handleQuantumChange"
              ></config-form>
            </article>
          </div>
        </div>
      </div>

      <div class="tile is-ancestor">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <h3 class="title">Procesos Nuevos</h3>
              <batch class="new-process-list":programs="batch">
                <template slot="item" scope="props">
                  <div class="message is-dark is-small is-primary">
                    <div class="message-body">
                      ID: {{ props.program.id }}
                    </div>
                  </div>
                </template>
              </batch>
            </article>
          </div>

          <div class="tile is-parent">
            <article class="tile is-child box">
              <commands-info></commands-info>
            </article>
          </div>
        </div>
      </div>

      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <processor-manager
              :pendingBatch.sync="batch"
              :config="config"
              @request-new-process="handleNewProcessRequest"
            ></processor-manager>
          </article>
        </div>
      </div>

    </div>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>OS-Simulator</strong> by <a href="http://andaviaco.com">Andrés Ávila</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          </p>
          <p>
            <a class="icon" href="https://github.com/andaviaco/os-simulator">
              <i class="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import ProcessForm from '@/components/ProcessForm';
import ProcessorManager from '@/components/ProcessorManager';
import Batch from '@/components/Batch';
import ConfigForm from '@/components/ConfigForm';
import CommandsInfo from '@/components/CommandsInfo';

import Program from '@/models/Program';
import { generateProcessValues } from '@/util';

export default {
  name: 'index',
  data() {
    return {
      batch: [],
      config: {
        quantum: 4,
      },
    };
  },
  methods: {
    handleProgramSubmit(programsData) {
      let newPrograms = programsData;

      if (!Array.isArray(newPrograms)) {
        newPrograms = [newPrograms];
      }

      newPrograms = newPrograms.map(data => new Program(data.operation, data.timeMax));

      this.batch = [...this.batch, ...newPrograms];
    },
    handleNewProcessRequest() {
      const processData = generateProcessValues();

      this.batch = [...this.batch, new Program(processData.operation, processData.timeMax)];
    },
    handleQuantumChange(value) {
      this.config.quantum = value;
    },
  },
  components: {
    ProcessForm,
    ProcessorManager,
    Batch,
    ConfigForm,
    CommandsInfo,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.new-process-list {
  max-height: 330px;
  overflow-y: auto;
}

</style>
