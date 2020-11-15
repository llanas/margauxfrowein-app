<template>
  <div v-if="sections != null && sections.length > 0">
    <HeaderComponent
      :title="sections[0].title"
      :description="sections[0].description"
    ></HeaderComponent>
    <section v-if="sections[0].photos != null && sections[0].photos.length > 0">
      <div class="sections-grid">
        <div
          v-for="photo in sections[0].photos"
          :key="photo.id"
          class="section-card"
          :class="{
            'section-tall': photo.ratio === 'tall',
            'section-wide': photo.ratio === 'wide',
            'section-wide': photo.ratio === 'big',
          }"
          @mouseenter="hoveredPhoto = photo.id"
          @mouseleave="hoveredPhoto = null"
        >
          <div
            class="section-card-background"
            :style="{
              backgroundImage:
                photo.image != null
                  ? 'url(' + photo.image.formats['small'].url + ')'
                  : '',
            }"
          ></div>
          <transition name="fade">
            <div
              class="section-card-filter"
              v-show="hoveredPhoto != null && hoveredPhoto == photo.id"
            >
              <span>{{ photo.title }}</span>
            </div>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import sectionQuery from "~/apollo/queries/section/section";

export default {
  data() {
    return {
      sections: [],
      hoveredPhoto: "",
    };
  },
  apollo: {
    sections: {
      query: sectionQuery,
      variables() {
        return { url: this.$route.params.url };
      },
    },
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
</style>