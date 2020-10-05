<template>
  <HomeHeader :home-photos="home.photos"></HomeHeader>
</template>

<script>
import homeQuery from "~/apollo/queries/home/home";
export default {
  data() {
    return {
      home: {},
    };
  },
  apollo: {
    home: {
      prefetch: false,
      query: homeQuery,
    },
  },
};
</script>

<style>
</style>
