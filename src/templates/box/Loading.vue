<template>
  <div class="wrapperLoading" :style="{'width': width}">
    <div
      v-if="loading"
      class="loading"
      :class="{ 'shadow': shadow }"
      :style="{'min-height': height}"
    >
      <div class="loadingContent">
        <div id="circle_square">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="status">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingBoxIfElse',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: true,
    },
    height: {
      default: '400px',
      type: String,
    },
    width: {
      default: '800px',
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/loader.scss';
.wrapperLoading {
  padding: 0;
}
.loading {
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  .loadingContent {
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    justify-items: center;
    border-radius: 5px;
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.15);
    padding-left: 22px;
    height: 100px;
    width: 100px;
    border: 1px solid #e6e8ec;
  }
}
.shadow {
  box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.19);
}
</style>
