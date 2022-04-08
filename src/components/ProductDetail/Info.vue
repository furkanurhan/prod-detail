<template>
  <div>
    <div class="pro-detail__title">
      <div class="pro-name-wrapper">
        <div class="pro-name">
          <h1>{{ title }}</h1>
        </div>
      </div>
      <div class="pro-rating">
        <div class="pro-rating__star">
          <star-rating />
        </div>
        <div class="pro-rating__text">
          <a href="#">23 Yorum</a>
        </div>
      </div>
    </div>
    <div class="pro-detail__price">
      <div class="pro-price">
        <div class="pro-price__price">
          <span>{{minPrice}} TL - {{maxPrice}} TL</span>
          <span class="quantity"> / Adet</span>
        </div>
        <div class="pro-price__quantity">
          <span class="quantity">{{minQuantity}} / Adet (Minimum Sipariş Adedi)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive, toRefs,
} from 'vue';
import StarRating from '../Rating/StarRating.vue';

const moduleName = 'ProductDetailInfo';
export default {
  name: moduleName,
  components: {
    StarRating,
  },
  props: {
    minPrice: {
      default: 0,
      type: Number,
    },
    maxPrice: {
      default: 0,
      type: Number,
    },
    minQuantity: {
      default: 0,
      type: Number,
    },
    title: {
      default: '',
      type: String,
    },
  },
  setup() {
    const state = reactive({
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
  .pro-detail__title {
    padding: 10px 10px;
    .pro-name-wrapper {
      width: 100%;
      max-height: 85px;
      margin-bottom: 5px;
      overflow: hidden;
      .pro-name {
        padding-left: 0;
        max-width: 100%;
        float: left;
        h1 {
          margin-bottom: 7px;
          font-size: 20px;
          font-weight: 300;
          max-height: 49px;
          overflow: hidden;
          margin: 3px 0 1px 0;
        }
      }
    }
    .pro-rating {
      padding: 0 14px 0 0;
      display: inline-block;
      vertical-align: middle;
      clear: both;
      height: 20px;
      text-align: left;
      overflow: hidden;
      .pro-rating__star {
        background-size: 118px 380px!important;
        width: 70px;
        float: left;
        margin: 1px 5px 0 0;
      }
      .pro-rating__text {
        display: inline-block;
        font-size: 12px;
        a {
          color: #06c;
          text-decoration: none;
        }
      }
    }
  }
  .pro-detail__price {
    padding: 10px 10px;
    .pro-price {
      width: 100%;
      margin-top: 5px;
      .pro-price__price {
        font-size: 20px;
        font-weight: 700;
      }
    }
    .quantity {
      font-size: 12px;
      font-weight: 400;
      color: grey;
    }
  }
</style>
