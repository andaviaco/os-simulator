<template>
  <div>
    <article
      class="message is-dark"
      v-for="(batch, index) in batches"
      :key="index"
    >
      <div class="message-header">
        Lote {{ index + 1 }}
      </div>

      <div class="message-body">
        <slot
          class="message"
          name="item"
          v-for="program in batch"
          :program="program"
        >
          <div class="message-body">
            ID: {{ program.id }}
          </div>
        </slot>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'process-batches',
  props: ['batches'],
  data() { return {}; },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
