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
        <transition-group name="list" tag="ul">
          <li
            class="list-item"
            v-for="program in batch"
            :key="program.id"
          >
            <slot
              class="message"
              name="item"
              :program="program"
            >
              <div class="message-body">
                ID: {{ program.id }}
              </div>
            </slot>
          </li>
        </transition-group>

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
.list-item:not(:last-child) {
  margin-bottom: 0.5rem;
}

.list-enter-active, .list-leave-active {
  transition: all .5s;
}

.list-enter, .list-leave-to  {
  opacity: 0;
  transform: translateY(30px);
}

</style>
