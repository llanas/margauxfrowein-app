<template>
  <header class="hero is-medium">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">{{ title }}</h1>
        <h2 class="title">{{ description }}</h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ["title", "description"],
};
</script>

<style>
</style>