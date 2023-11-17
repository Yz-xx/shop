<template>
  <div class="swiper-container" id="mySwiper" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true,
            autoplay: {
              delay: 2000,
              disableOnInteraction: false,
              waitForTransition: false,
            },

            pagination: {
              el: '.swiper-pagination'
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })

          mySwiper.el.onmouseover = function () {
            mySwiper.autoplay.stop();
          }
          mySwiper.el.onmouseout = function () {
            mySwiper.autoplay.start();
          }
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>