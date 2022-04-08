<template>
  <div class="star-rating">
    <div
      v-for="star in maxStars" :key="star"
      class="star-rating__star"
      :class="{ 'active': (star <= initialGrade && star != null)}"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    maxStars: {
      type: Number,
      default: 5,
    },
    initialGrade: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style lang="scss" scoped>
.star-rating {
  .star-rating__star {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    font-size: 1.05em;
    color: grey;
    transition: color .2s ease-out;
    &:before {
      content: "\2605";
    }
    &:hover {
      cursor: pointer;
    }
    &.active {
      color: #FFD700;
    }
    &.active:hover {
      cursor: default;
    }
  }
}
</style>
