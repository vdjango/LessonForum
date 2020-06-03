<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">
  <div>
    <swiper :options="swiperOption" class="aaa">
      <swiper-slide>
        <img src="../../assets/0.jpg">
      </swiper-slide>
      <swiper-slide>
        <img src="../../assets/1.jpg">
      </swiper-slide>
    </swiper>

    <div class="container pt-3 mt-5" id="login">
      <div class="row justify-content-md-center mt-5">
        <div class="col-12 mb-5 text-center mt-5">
          <h1 class="text-white mt-5" style="font-weight: 100;">YTPASS
            <!--<small>后台登录</small>-->
          </h1>
          <div class="m-auto">
            <p class="text-white">
              统一商品信息出入管理平台，统一库存进销存管理平台
              <!-- —— 致力打造高效智慧办公一体化生态圈 -->
            </p>
          </div>
        </div>
        <router-view name="auth_init"></router-view>
      </div>
    </div>
  </div>
</template>


<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'auth-init',
    data: function () {
      return {
        banners: [
          require('@/assets/1.jpg')
        ],
        swiperOption: {
          autoplay: true,
          delay: 10000,
          speed: 1000,
          loop: true,
          effect: 'fade'
        }
      }
    },
    mounted: function () {
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>


<style scoped>

  .auth {
    height: 100vh;
  }

</style>
