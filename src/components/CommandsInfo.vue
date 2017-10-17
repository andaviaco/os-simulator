<template>
  <div
    class="message is-primary"
    tabindex="-1"
    @keyup="handleKeyup($event)"
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
          <li><strong>E</strong>: Bloquear (E/S)</li>
          <li><strong>W</strong>: Error</li>
          <li><strong>U</strong>: Crear nuevo proceso (datos aleatorios)</li>
          <li><strong>B</strong>: Mostrar tabla de procesos</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'commands-info',
  data() {
    return {
      pressedKey: {
        key: null,
        keyCode: null,
      },
    };
  },
  methods: {
    handleKeyup($event) {
      this.pressedKey = {
        key: $event.key,
        keyCode: $event.keyCode,
      };
    },
  },
};
</script>
