<template>
  <div class="pro-detail__bucket">
    <div class="pro-bucket">
      <h3>Toplam</h3>
      <div class="pro-bucket__info">
        <div class="info">
          <div class="price">
            <span>{{totalPrice}} TL</span>
          </div>
          <div class="ship">
            <div class="ship__img">
              <img src="../../assets/truck.svg" alt="" width="20" height="20">
            </div>
            <div class="ship__text">
              Kargo ücreti:
              <a href="#">Alıcı Öder</a>
            </div>
          </div>
          <div class="bucket">
            <button
              class="bucket__btn"
              @click="sendBucket()"
              :disabled="!isSubmitEnable"
            >SEPETE EKLE</button>
            <div class="bucket__options">
              <a href="#">Ödeme Seçenekleri</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive, toRefs,
} from 'vue';

const moduleName = 'ProductDetailBucket';
export default {
  name: moduleName,
  components: {
  },
  props: {
    totalPrice: {
      default: 0,
    },
    isSubmitEnable: {
      default: false,
    },
  },
  setup(context, { emit }) {
    const state = reactive({
    });

    function sendBucket() {
      emit('sendBucket');
    }

    return {
      ...toRefs(state),
      sendBucket,
    };
  },
};
</script>

<style lang="scss" scoped>
  .pro-detail__bucket {
    padding: 5px 10px;
    .pro-bucket {
      display: flex;
      align-items: center;
      margin: 5px 0;
      h3 {
        font-size: 13px;
        font-weight: 700;
        display: inline-block;
        width: 40px;
      }
      .pro-bucket__info {
        display: flex;
        padding: 0;
        margin: 0;
        margin-left: 30px;
        .info {
          position: relative;
          top: 32px;
          .price {
            span {
              border-radius: 2px;
              font-size: 20px;
              font-weight: 700;
            }
          }
          .ship {
            display: flex;
            align-items: center;
            .ship__text {
              margin-left: 5px;
              font-size: 12px;
              font-weight: 400;
              a {
                text-decoration: none;
              }
            }
          }
          .bucket {
            display: flex;
            align-items: center;
            margin-top: 10px;
            .bucket__btn {
              background-color: #ffbf00;
              padding: 10px 30px;
              border-radius: 5px;
              color: white;
              font-size: 13px;
              border: 1px solid transparent;
              &:hover {
                cursor: pointer;
                border: 1px solid white;
              }
              &:disabled {
                border: 1px solid #999999;
                background-color: #cccccc;
                color: #666666;
              }
            }
            .bucket__options {
              margin-left: 5px;
              font-size: 12px;
              font-weight: 400;
              a {
                padding-left: 5px;
                text-decoration: none;
              }
            }
          }
        }
        &::before {
          padding-right: 5px;
          content: ":";
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
