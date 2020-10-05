<template>
  <!-- Start Hero Carousel -->
  <section class="hero is-fullheight-with-navbar">
    <VueSlickCarousel v-bind="slickOptions" v-if="homePhotos != null">
      <div
        v-for="(photo, index) in homePhotos"
        :key="photo.id"
        :class="'item-' + (index + 1)"
      >
        <img :src="photo.url" alt="" />
      </div>
    </VueSlickCarousel>
  </section>
</template>

<script>
export default {
  data() {
    return {
      slickOptions: {
        arrow: false,
        dots: true,
        adaptiveHeight: true,
        slideToShow: 1,
      },
    };
  },
  props: ["home-photos"],
};
</script>

<style lang="scss" scoped>
@import "~/assets/main.scss";
</style>