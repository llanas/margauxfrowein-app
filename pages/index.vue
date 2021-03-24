<template>
  <div class="content">
    <div v-if="pending" class="hero is-fullheight has-text-centered">
      <div class="hero-body">
        <div class="lds-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div v-else>
      <header v-if="covers != null && covers.length > 1">
        <client-only>
          <swiper
            class="swiper has-text-centered"
            ref="swiper"
            :options="swiperOptions"
          >
            <swiper-slide v-for="photo in covers" :key="photo.id" class="slide">
              <div
                class="hero is-fullheight cover-image"
                :style="{ backgroundImage: `url(${photo.url})` }"
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
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      pending: true,
      home: {},
      covers: [],
      swiperOptions: {
        loop: true,
        speed: 1000,
        lazy: {
          loadPrevNext: true,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        effect: "fade",
      },
    };
  },
  watch: {
    $route: "$asyncData",
  },
  async asyncData({ $axios }) {
    const home = await $axios.$get("/home");
    return { home };
  },
  mounted() {
    this.setImages();
  },
  methods: {
    setImages() {
      let listCoversImagePromises = [];
      for (let cover of this.home.covers) {
        let image = new Image();
        let imagePromise = new Promise((res, rej) => {
          image.addEventListener("load", () => {
            res();
          });
        });
        listCoversImagePromises.push(imagePromise);
        image.src = cover.image.url;
        this.covers.push({
          id: cover.id,
          url: cover.image.url,
        });
      }
      Promise.all(listCoversImagePromises).then(() => (this.pending = false));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";

.lds-grid {
  top: 50%;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-grid div {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  animation: lds-grid 1.2s linear infinite;
}
.lds-grid div:nth-child(1) {
  top: 8px;
  left: 8px;
  animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
  top: 8px;
  left: 32px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
  top: 8px;
  left: 56px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
  top: 32px;
  left: 8px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
  top: 32px;
  left: 32px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
  top: 32px;
  left: 56px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
  top: 56px;
  left: 8px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
  top: 56px;
  left: 32px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
  top: 56px;
  left: 56px;
  animation-delay: -1.6s;
}
@keyframes lds-grid {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
