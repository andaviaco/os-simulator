<template lang="html">
  <div class="modal" :class="{'is-active': isOpen}">
    <div class="modal-background"></div>
    <div class="modal-card" :class="sizeClass">
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
  props: ['size'],
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    sizeClass() {
      return {
        'is-large': this.size === 'large',
      };
    },
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

<style lang="scss">

.is-large {
  width: 90%;
}

</style>
