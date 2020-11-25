<template>
  <div class="content">
    <div v-if="$fetchState.pending" class="loader" />
    <div v-else-if="$fetchState.error" class="has-text-centered">
      An error occured
    </div>
    <div v-else>
      <header v-if="home.covers != null">
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
  fetchDelay: 1000,
  async fetch() {
    console.dir(this.$axios);
    this.home = await this.$axios.$get("/home");
    console.log("recupération speed:" + this.home.carousel.speed);
    this.swiperOptions.speed = this.home.carousel.speed;
    this.swiperOptions.autoplay.delay = this.home.carousel.delay;
  },
};
</script>

<style lang="scss" scoped>
</style>
