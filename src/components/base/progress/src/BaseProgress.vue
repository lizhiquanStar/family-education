<template>
  <div class="base-progress">
    <p v-if="showTitle" class="progress-title">
      {{ $filters.Percent(percentage) }}
    </p>
    <van-progress
      :percentage="percentage * 100"
      :stroke-width="strokeWidth"
      :color="color"
      :track-color="trackColor"
      :pivot-text="pivotText"
      :text-color="textColor"
      :inactive="inactive"
      :show-pivot="showPivot"
      :class="{ 'no-border': !border }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Progress } from 'vant'
export default defineComponent({
  name: 'BaseProgress',
  components: {
    [Progress.name]: Progress
  },
  props: {
    showTitle: Boolean,
    border: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#66370B'
    },
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    showPivot: {
      type: Boolean,
      default: false
    },
    pivotColor: String,
    trackColor: {
      type: String,
      default: '#F5F5F5'
    },
    strokeWidth: {
      type: [Number, String],
      default: 6
    },
    percentage: {
      type: [Number, String]
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.no-border {
  border-radius: 0;
}
.progress-title {
  margin-bottom: 4px;
}
</style>
