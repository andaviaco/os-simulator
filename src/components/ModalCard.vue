<template lang="html">
  <div class="modal" :class="{'is-active': isOpen}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <slot name="title">
          </slot>
        </p>
        <button class="delete" aria-label="close" @click="handleCloseClick"></button>
      </header>
      <section class="modal-card-body">
        <slot name="body">
        </slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="foot">
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-card',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    handleCloseClick() {
      this.close();
    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>
