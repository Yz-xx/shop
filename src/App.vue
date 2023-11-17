<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>

    <!-- <Footer v-show="$route.path == '/home' || $route.path == '/search'"></Footer> -->

    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'

export default {
  name: 'App',
  components: {
    Header, Footer
  },
  mounted() {
    this.$store.dispatch('categoryList')
  }
}
</script>

<style></style>
