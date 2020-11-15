<template>
  <div class="app">
    <nav class="navbar is-transparent" role="navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            Margaux
            <i>FROWEIN</i>
          </a>
          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            :class="{ 'is-active': isBurgerToggled }"
            v-on:click="isBurgerToggled = !isBurgerToggled"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': isBurgerToggled }">
          <div class="navbar-start">
            <nuxt-link to="/" class="navbar-item has-text-centered"
              >Home</nuxt-link
            >
            <nuxt-link to="/contact" class="navbar-item">Contact</nuxt-link>
          </div>
        </div>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBurgerToggled: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";

.navbar {
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  color: whitesmoke;
}

.navbar-start {
  flex-grow: 1;
  justify-content: center;
  text-align: center;
}

.navbar-item {
  min-width: 180px;
  justify-content: center;
}
</style>
