<template>
  <loading :loading="loading" :status="status" :shadow="true">
    <div class="pro-wrapper">
      <div class="pro-thumbnail" v-if="imageList.length > 0">
        <thumbnail-comp :image-list="imageList"></thumbnail-comp>
      </div>
      <div class="pro-detail">
        <info :title="title" :maxPrice="maxPrice" :minPrice="minPrice" :minQuantity="minQuantity"/>
        <categories :selectable-attributes="getSelectableAttributes()" @setattributes="setAttributes"/>
        <barem-list :min-quantity="minQuantity" :barem-list="baremList" @changeQuantity="setQuantity"/>
        <bucket :total-price="totalPrice" @sendBucket="sendBucket" :is-submit-enable="selectedAttributes.Renk && selectedAttributes.Beden"/>
      </div>
    </div>
  </loading>
</template>

<script>
import {
  reactive, computed, onMounted, toRefs,
} from 'vue';
import { useStore } from 'vuex';
import Loading from '@/templates/box/Loading.vue';
import module from './modules/State';
import Info from './Info.vue';
import Categories from './Categories.vue';
import BaremList from './BaremList.vue';
import Bucket from './Bucket.vue';
import ThumbnailComp from './ThumbnailComp.vue';

const moduleName = 'ProductDetail';
export default {
  name: moduleName,
  components: {
    Loading,
    ThumbnailComp,
    Info,
    Categories,
    BaremList,
    Bucket,
  },
  setup() {
    const store = useStore();

    const state = reactive({
      loading: false,
      moduleName,
      status: computed(() => store.state[moduleName].status),
      selectableAttributes: computed(() => store.state[moduleName].selectableAttributes),
      selectedAttributes: computed(() => store.state[moduleName].selectedAttributes),
      quantity: computed(() => store.state[moduleName].quantity),

      title: computed(() => store.getters[`${state.moduleName}/title`]),
      baremList: computed(() => store.getters[`${state.moduleName}/baremList`]),
      minPrice: computed(() => store.getters[`${state.moduleName}/minPrice`]),
      maxPrice: computed(() => store.getters[`${state.moduleName}/maxPrice`]),
      minQuantity: computed(() => store.getters[`${state.moduleName}/minQuantity`]),
      totalPrice: computed(() => store.getters[`${state.moduleName}/totalPrice`]),
      selectedVariants: computed(() => store.getters[`${state.moduleName}/selectedVariants`]),
      imageList: computed(() => store.getters[`${state.moduleName}/imageList`]),
    });

    store.registerModule(state.moduleName, module);

    function getSelectableAttributes() {
      return store.state[moduleName].selectableAttributes;
    }

    function sendBucket() {
      const id = state.selectedVariants[0].id;
      const selectedBarem = state.baremList.filter((barem) => (barem.minimumQuantity <= state.quantity && barem.maximumQuantity >= state.quantity))[0];
      console.log(`id: ${id}, minimumQuantity: ${selectedBarem.minimumQuantity}, maximumQuantity: ${selectedBarem.maximumQuantity}, price: ${selectedBarem.price}`);
    }

    function apiRequest() {
      state.loading = true;
      store.dispatch(`${state.moduleName}/getProductDetail`).then(() => {
        state.loading = false;
      }).catch(() => {
        state.loading = false;
      });
    }

    function setAttributes(event) {
      state.selectedAttributes[event[0]] = event[1];
      if (event[0] === 'Renk') {
        state.selectedAttributes.Beden = null;
        store.commit(`${state.moduleName}/CHANGE_SELECTABLE_VARIANTS`);
        store.commit(`${state.moduleName}/CHANGE_SELECTABLE_ATTRIBUTE`);
      } else {
        store.commit(`${state.moduleName}/CHANGE_SELECTABLE_ATTRIBUTE`);
      }
    }

    function setQuantity(event) {
      store.commit(`${state.moduleName}/CHANGE_BAREM_QUANTITY`, event);
    }

    onMounted(() => {
      apiRequest();
    });

    return {
      ...toRefs(state),
      setAttributes,
      getSelectableAttributes,
      setQuantity,
      sendBucket,
    };
  },
};
</script>

<style lang="scss" scoped>
.pro-wrapper {
  display: flex;
  .pro-thumbnail {
    width: 400px;
    text-align: center;
  }
  .pro-detail {
    width: 400px;
  }
}

</style>
