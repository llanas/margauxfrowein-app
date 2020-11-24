<template>
  <div class="sections-grid">
    <HomeSectionItem
      v-for="section in sections"
      :key="section.id"
      :sectionId="section.id"
    >
    </HomeSectionItem>
  </div>
</template>

<script>
import homeSectionItem from "./home-section-item.vue";
export default {
  components: { homeSectionItem },
  data() {
    return {
      hoveredSection: "",
    };
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
</style>