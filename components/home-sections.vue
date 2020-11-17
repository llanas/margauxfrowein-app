<template>
  <div class="sections-grid">
    <div
      v-for="section in sections"
      :key="section.id"
      class="section-card"
      :class="{
        'section-tall': section.cover != null && section.cover.ratio === 'tall',
        'section-wide': section.cover != null && section.cover.ratio === 'wide',
        'section-wide': section.cover != null && section.cover.ratio === 'big',
      }"
      v-on:click="onSectionClick(section.url)"
      @mouseenter="hoveredSection = section.id"
      @mouseleave="hoveredSection = null"
    >
      <div
        class="section-card-background"
        :style="{
          backgroundImage:
            section.cover != null
              ? 'url(' + section.cover.image.formats['medium'].url + ')'
              : '',
        }"
      ></div>
      <transition name="fade">
        <div
          class="section-card-filter"
          v-show="hoveredSection != null && hoveredSection == section.id"
        >
          <span>{{ section.title }}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoveredSection: "",
    };
  },
  methods: {
    onSectionClick(sectionUrl) {
      this.$router.push({ path: `/section/${sectionUrl}` });
    },
  },
  props: ["sections"],
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";

.sections-grid {
  padding: 0rem var(--margin);
  margin: var(--margin) 0;

  display: grid;
  gap: var(--spacing);

  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: 400px;
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