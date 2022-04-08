<template>
  <div class="pro-detail__selection" v-if="selectableAttributes">
    <div class="pro-selection" v-for="(selectableAttributeCategory, index) in selectableAttributes" :key="index">
      <h3>{{selectableAttributeCategory.name}}</h3>
      <div class="pro-selection__value">
        <div
          v-for="(selectableAttributeItem, index) in selectableAttributeCategory.values"
          :key="index"
          :class="{ disable: selectableAttributeItem.isDisable, active: selectableAttributeItem.isActive}"
          @click="setAttributes([selectableAttributeCategory.name, selectableAttributeItem.name])"
        >
          {{selectableAttributeItem.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive, toRefs,
} from 'vue';

const moduleName = 'ProductDetailCategories';
export default {
  name: moduleName,
  components: {
  },
  props: {
    selectableAttributes: {
      default: null,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
    });

    function setAttributes(event) {
      emit('setattributes', event);
    }

    return {
      ...toRefs(state),
      setAttributes,
    };
  },
};
</script>

<style lang="scss" scoped>
  .pro-detail__selection {
    padding: 5px 10px;
    .pro-selection {
      display: flex;
      align-items: center;
      margin: 5px 0;
      h3 {
        font-size: 12px;
        font-weight: 400;
        display: inline-block;
        width: 40px;
      }
      .pro-selection__value {
        display: flex;
        padding: 0;
        margin: 0;
        margin-left: 30px;
        div {
          border: 2px solid lightgrey;
          padding: 3px 12px;
          border-radius: 2px;
          margin-right: 5px;
        }
        &::before {
          padding-right: 5px;
          content: ":";
          display: flex;
          align-items: center;
        }
        div.active {
          border: 2px solid black;
        }
        div:hover {
          border: 2px solid black;
          cursor: pointer;
        }
        div.disable {
          pointer-events: none;
          opacity: 0.4;
        }
      }
    }
  }
</style>
