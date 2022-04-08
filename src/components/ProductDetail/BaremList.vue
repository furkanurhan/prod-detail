<template>
  <div class="pro-detail__barem-list" v-if="baremList && baremList.length > 0">
    <div class="pro-barem-list">
      <h3>Toptan Fiyat</h3>
      <div class="pro-barem__value">
        <div
          v-for="(barem, index) in baremList"
          :key="index"
          :class="{active: (barem.minimumQuantity <= quantity && barem.maximumQuantity >= quantity) }"
        >
          {{barem.minimumQuantity}} -
          {{barem.maximumQuantity}}
          <br /> {{barem.price}} TL
        </div>
      </div>
    </div>
    <div class="pro-barem-quantity">
      <h3>Adet</h3>
      <div class="pro-barem-quantity__value">
        <label for="name">
          <input type="number" id="name" v-model="quantityComp" :min="minQuantity"/>
          <span>Adet</span>
        </label>
      </div>
      <div class="pro-barem-quantity__stok">
        <span>Stok Adeti: <strong>500</strong></span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive, toRefs, computed,
} from 'vue';

const moduleName = 'ProductDetailBaremList';
export default {
  name: moduleName,
  components: {
  },
  props: {
    baremList: {
      default: [],
    },
    minQuantity: {
      default: 0,
    },
  },
  setup(context, { emit }) {
    function changeQuantity(event) {
      emit('changeQuantity', event);
    }

    const state = reactive({
      quantity: context.minQuantity,
      quantityComp: computed({
        get() {
          return state.quantity;
        },
        set(newValue) {
          state.quantity = newValue;
          changeQuantity(newValue);
        },
      }),
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
  .pro-detail__barem-list {
    padding: 5px 10px;
    background-color: #f5f5f5;
    .pro-barem-list {
      display: flex;
      align-items: center;
      margin: 5px 0;
      h3 {
        font-size: 12px;
        font-weight: 400;
        display: inline-block;
        width: 40px;
      }
      .pro-barem__value {
        display: flex;
        padding: 0;
        margin: 0;
        margin-left: 30px;
        div {
          border-right: 2px solid lightgrey;
          padding: 3px 6px;
          padding-right: 20px;
          border-radius: 2px;
          font-size: 12px;
        }
        &::before {
          padding-right: 5px;
          content: ":";
          display: flex;
          align-items: center;
        }
        div.active {
          background-color: #ffedb9;
          font-weight: 600;
        }
        div:last-child {
          border: none;
        }
      }
    }
    .pro-barem-quantity {
      display: flex;
      align-items: center;
      margin: 5px 0;
      h3 {
        font-size: 12px;
        font-weight: 400;
        display: inline-block;
        width: 40px;
      }
      .pro-barem-quantity__value {
        display: flex;
        padding: 0;
        margin: 0;
        margin-left: 30px;
        &::before {
          padding-right: 5px;
          content: ":";
          display: flex;
          align-items: center;
        }
        input {
          height: 25px;
          width: 60px;
        }
        span {
          margin-left: 10px;
          font-size: 12px;
          font-weight: 400;
        }
      }
      .pro-barem-quantity__stok {
        color: #8cd395;
        font-size: 12px;
        margin-right: 10px;
        margin-left: auto;
      }
    }
  }
</style>
