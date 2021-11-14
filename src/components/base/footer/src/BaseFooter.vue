<template>
  <div class="base-footer">
    <slot name="top"></slot>
    <p class="p" v-if="showText">{{ showText }}</p>
    <img class="footer-script" v-else-if="img" :src="$src + img" />
    <slot name="bottom"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BaseFooter',
  props: {
    img: {
      type: String,
      default: ''
    },
    showText: {
      type: String,
      default: () => ''
    }
  }
})
</script>

<style lang="scss" scoped>
.base-footer {
  margin-bottom: 20px;
  color: #999999;
  font-size: 12px;
  .pps-primary {
    padding-bottom: 30px;
  }
  img {
    height: 31px;
    width: 117px;
  }
  .p {
    padding-top: 10px;
  }
}
</style>
