<template>
  <div class="content" v-if="!loading">
    <header>
      <client-only>
        <swiper
          class="swiper has-text-centered"
          ref="swiper"
          :options="swiperOptions"
        >
          <swiper-slide
            v-for="photo in home.covers"
            :key="photo.id"
            class="slide"
          >
            <div
              class="hero is-fullheight cover-image"
              :style="{ backgroundImage: `url(${photo.image.url})` }"
            ></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </client-only>
    </header>
    <section>
      <HomeSections :sections="home.sections"></HomeSections>
    </section>
  </div>
</template>

<script>
import homeQuery from "~/apollo/queries/home/home";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      loading: 0,
      home: {},
      swiperOptions: {
        loop: true,
        speed: 1000,
        lazy: {
          loadPrevNext: true,
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      },
    };
  },
  apollo: {
    $loadingKey: "loading",
    home: {
      prefetch: true,
      query: homeQuery,
    },
  },
};
</script>

<style>
</style>
