<template>
  <div class="content" v-if="loading">
    <header
      v-if="!!home.cover"
      class="hero is-fullheight cover-image"
      :style="{ backgroundImage: `url(${home.cover.image.url})` }"
    ></header>
    <section>
      <HomeSections :sections="home.sections"></HomeSections>
    </section>
  </div>
</template>

<script>
import homeQuery from "~/apollo/queries/home/home";

export default {
  data() {
    return {
      loading: true,
      home: {},
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
