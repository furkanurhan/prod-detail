<template>
  <div>
    <header-page />
    <section-page />
  </div>
</template>

<script>
import headerPage from './children/Header.vue';
import sectionPage from './children/Section.vue';

export default {
  name: 'MainTemplate',
  components: {
    headerPage,
    sectionPage,
  },
};
</script>
