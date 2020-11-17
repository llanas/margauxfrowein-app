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
    <footer class="footer">
      <div class="content has-text-centered">
        <div>
          <a
            v-for="socialmediaLink of footer.socialmediaLink"
            :key="socialmediaLink.id"
            :href="socialmediaLink.link"
            target="_blank"
            class="mx-2"
          >
            <span class="icon is-medium">
              <font-awesome-icon
                :icon="['fab', socialmediaLink.icon.faName]"
                class="is-size-4"
              />
            </span>
          </a>
        </div>
        <div class="footer-text">
          <p class="mb-0">
            Contactez Margaux à
            <a :href="'mailto:' + footer.contact" class="link-dark">{{
              footer.contact
            }}</a>
            pour plus d'information
          </p>
          <p class="footer-thanks">
            Website handcrafted by
            <a href="https://github.com/llanas" target="_blank"
              >Boris MAURENCE @llanas</a
            >
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import footerQuery from "~/apollo/queries/footer/footer";

export default {
  data() {
    return {
      isBurgerToggled: false,
    };
  },
  apollo: {
    footer: {
      prefetch: true,
      query: footerQuery,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/main.scss";

.app {
  min-height: 100vh;
}

.navbar {
  position: fixed;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
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

.footer {
  background: rgb(19, 19, 19);
}
</style>
