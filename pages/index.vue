<template>
  <div class="content">
    <div v-if="loading" class="loader has-text-centered">loading...</div>
    <div v-else>
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
      <section v-if="home.sections != null && home.sections.length > 0">
        <HomeSections :sections="home.sections"></HomeSections>
      </section>
    </div>
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
      loading: true,
      home: {},
      swiperOptions: {
        loop: true,
        speed: 1000,
        lazy: {
          loadPrevNext: true,
        },
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      },
    };
  },
  async fetch() {
    this.home = await fetch("http://localhost:1338/home").then((response) =>
      response.json()
    );
    this.swiperOptions.speed = this.home.carousel.speed;
    this.swiperOptions.autoplay.delay = this.home.carousel.delay;
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
