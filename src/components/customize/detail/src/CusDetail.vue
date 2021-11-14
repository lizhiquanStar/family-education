<template>
  <div class="base-detail">
    <div class="base-detail-notice" v-if="Config.showNotice">
      <base-notice :config="Config.noticeConfig"></base-notice>
    </div>
    <div class="base-detail-title">
      <div
        class="detail-info"
        v-if="Config.title || Config.sub || Config.showTag"
      >
        <slot name="title">{{ Config.title }}</slot>
        <div class="detail-info-small">
          <slot name="sub">{{ Config.sub }}</slot>
        </div>
        <div class="detail-info-tag" v-if="Config.showTag">
          <base-tag
            v-for="(tag, i) in Config.tagConfig"
            :key="i"
            :config="tag"
          ></base-tag>
        </div>
      </div>
      <slot name="right"></slot>
      <div class="detail-btn" v-if="Config.showBtn">
        <template v-for="(btn, i) in Config.btnConfig" :key="i">
          <base-button
            :class="{ btn: i > 0 }"
            :config="btn"
            v-if="btn.visible && btn.showType !== 'share'"
          ></base-button>
          <bus-share
            v-else-if="btn.visible && btn.showType == 'share'"
            v-bind="btn.shareConfig"
          >
            <template #reference>
              <base-button :config="btn"></base-button>
            </template>
          </bus-share>
        </template>
      </div>
    </div>
    <div class="base-detail-form" v-if="Config.showForm">
      <slot name="form">
        <base-form-detail :config="Config.formConfig"></base-form-detail>
      </slot>
      <div
        class="form-tip"
        v-if="Config.showTip"
        :class="Config.statusConfig?.className"
      >
        <slot name="tip">{{ Config.statusConfig.text }}</slot>
      </div>
    </div>
    <div class="base-detail-tab"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { BaseNotice, BaseTag, BaseFormDetail } from '@/components/base'
import { DetailAdapter } from './CusDetail.adapter'
import { DETAIL_DEFAULT_CONFIG } from './CusDetail.default'
import { mergeEventsAndDasherizeKeys } from '@/core/utils/factory/view.factory'
import { BusShare } from '@/components/business'
export default defineComponent({
  name: 'PpsDetail',
  components: {
    BusShare,
    BaseNotice,
    BaseTag,
    BaseFormDetail
  },
  props: {
    config: {
      type: Object as PropType<DetailAdapter>
    }
  },
  setup(props) {
    const Config = computed(() => {
      return { ...DETAIL_DEFAULT_CONFIG, ...props.config }
    })
    return {
      Config,
      mergeEventsAndDasherizeKeys
    }
  }
})
</script>
<style lang="scss" scoped>
.base-detail {
  padding: 24px 32px;
  background: #fff;
  :deep {
    .form-detail {
      padding: 0;
    }
  }
  &-notice {
    margin-bottom: 16px;
  }
  &-title {
    @include layout(row, nowrap);
    .detail-info {
      font-size: var(--van-font-size-xxl);
      font-weight: var(--van-font-weight-bold);
      flex: 1;
      &-small {
        font-size: var(--van-font-size-sm);
        font-weight: var(--van-font-weight-light);
        color: var(--van-gray-7);
        margin-top: 4px;
        max-width: 620px;
      }
      &-tag {
        margin-top: 6px;
      }
    }
    .detail-btn {
      margin-left: 20px;
      :deep .base-button {
        min-width: 90px;
        font-size: 14px;
      }
      .btn {
        margin-left: 10px;
      }
    }
  }
  &-form {
    @include layout(row, wrap);
    margin-top: 10px;
    .base-form-detail {
      :deep .form-detail-box {
        width: 50%;
        &:first-child {
          padding-right: 10px;
        }
        &:last-child {
          padding-left: 10px;
        }
      }
    }
    .form-tip {
      flex-shrink: 0;
      margin-left: 20px;
      text-align: right;
      color: var(--van-gray-7);
    }
  }
}
@media screen and (max-width: 768px) {
  .base-detail {
    padding: 16px 24px;
  }
}
@media screen and (max-width: 750px) {
  .base-detail {
    &-form {
      .form-detail-box {
        &:first-child {
          padding-right: 0;
        }
        &:last-child {
          padding-left: 0;
        }
      }
      .form-tip {
        align-self: flex-start;
      }
    }
    .detail-btn {
      display: none;
    }
  }
}
</style>
