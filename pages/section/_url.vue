<template>
  <div v-if="section != null">
    <HeaderComponent
      :title="section.title"
      :description="section.description"
    ></HeaderComponent>
    <section
      v-if="section.photos != null && section.photos.length > 0"
      class="hero"
    >
      <div class="sections-grid">
        <div
          v-for="(photo, index) in section.photos"
          :key="photo.id"
          class="section-card"
          :class="{
            'section-tall': photo.ratio === 'tall',
            'section-wide': photo.ratio === 'wide',
            'section-big': photo.ratio === 'big',
          }"
          @click="selectPhoto(index)"
          @mouseenter="hoveredPhoto = photo.id"
          @mouseleave="hoveredPhoto = null"
        >
          <div
            class="section-card-background"
            :style="{
              backgroundImage:
                photo.image != null
                  ? 'url(' + getPhotoImageUrl(photo) + ')'
                  : '',
            }"
          ></div>
        </div>
      </div>
    </section>
    <div class="modal" :class="{ 'is-active': selectedPhotoIndex != null }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <client-only>
          <swiper
            class="swiper has-text-centered"
            ref="swiper"
            :options="swiperOptions"
          >
            <swiper-slide
              v-for="photo in section.photos"
              :key="photo.id"
              class="slide"
            >
              <img
                :src="photo.image.url"
                :alt="photo.description"
                :title="photo.title"
                class="swiper-lazy"
              />
              <h2 class="is-size-4 has-text-weight-semibold">
                {{ photo.title }}
              </h2>
              <h3>{{ photo.description }}</h3>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </client-only>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="selectedPhotoIndex = null"
      ></button>
    </div>
  </div>
</template>

<script>
import sectionQuery from "~/apollo/queries/section/section_url";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      section: null,
      hoveredPhoto: "",
      selectedPhotoIndex: null,
      swiperOptions: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        lazy: {
          loadPrevNext: true,
        },
      },
    };
  },
  methods: {
    getPhotoImageUrl(photo) {
      return photo.image.formats["medium"]
        ? photo.image.formats["medium"].url
        : photo.image.formats["large"];
    },
    selectPhoto(photoIndex) {
      this.selectedPhotoIndex = photoIndex;
      this.$refs.swiper.$swiper.slideTo(photoIndex);
    },
  },
  async fetch() {
    let sections = await fetch(
      `${process.env.API_URL}/sections?url=${this.$route.params.url}`
    ).then((response) => response.json());
    if (!!sections && sections.length > 0) {
      this.section = sections[0];
    } else {
      console.error(sections);
    }
  },
  props: ["url"],
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";

.sections-grid {
  padding: 0rem var(--margin);
  margin: var(--margin) 0;

  display: grid;
  gap: var(--spacing);

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 300px;
}

@media screen and (min-width: 1150px) {
  .section-tall {
    grid-row: span 2 / auto;
  }

  .section-wide {
    grid-column: span 2 / auto;
  }

  .section-big {
    grid-column: span 2 / auto;
    grid-row: span 2 / auto;
  }
}

.section-card {
  position: relative;
  background: #353535;
  font-size: 3rem;
  color: #fff;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}

.section-card-background {
  position: absolute;
  height: 100%;
  width: 100%;
  transition: all 500ms;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.section-card:hover > .section-card-background {
  box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em,
    rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
  transform: scale(1.1);
}

.section-card-filter {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(53, 53, 53, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.modal-close {
  z-index: 1000;
}

.swiper {
  height: 100%;
}

.slide > img {
  max-height: 90%;
  max-width: 100%;
}
</style>