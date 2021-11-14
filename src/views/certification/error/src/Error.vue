<template>
  <div class="error">PpsError Working!</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PpsErrorConfig } from './Error.config'
export default defineComponent({
  setup() {
    return {
      ...PpsErrorConfig()
    }
  }
})
</script>
