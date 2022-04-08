<template>
  <div>
    <div class="current-image">
      <img :src="imageListComp[activeImageIndex]" alt="" width="400" height="400">
    </div>
    <div>
      <div
        v-for="(image, index) in imageListComp"
        :key="index"
        class="image"
        :class="{active: activeImageIndex === index}"
      >
        <img :src="image" alt="" width="50" height="50" @click="setActiveImage(index)">
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive, toRefs, computed,
} from 'vue';

const moduleName = 'ProductDetailThumbnail';
export default {
  name: moduleName,
  components: {
  },
  props: {
    imageList: {
      default: null,
      type: Array,
    },
  },
  setup(context) {
    const state = reactive({
      activeImageIndex: 0,
      imageListComp: computed(() => {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        state.activeImageIndex = 0;
        return context.imageList;
      }),
    });

    function setActiveImage(index) {
      state.activeImageIndex = index;
    }

    function resetActiveImage() {
      state.activeImageIndex = 0;
    }

    return {
      ...toRefs(state),
      setActiveImage,
      resetActiveImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.current-image {
  margin-bottom: 30px;
}
.image {
  display: inline-block;
  margin-right: 7px;
  width: 50px;
  height: 50px;
  vertical-align: middle;
  border-radius: 2px;
  border: 2px solid transparent;
  cursor: pointer;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  &.active {
    border: 2px solid #505050;
  }
  &:hover {
    border: 2px solid #505050;
  }
}
</style>
