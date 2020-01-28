<!-- The ref attr used to find the swiper instance -->
<template>
  <div>
    <!-- Banner -->
    <div class="banner"></div>
    <!-- 最新商品 -->
    <section class="container">
      <h3>最新商品</h3>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ipsum, hic libero nam debitis neque odit quaerat nulla placeat veritatis? Explicabo eum sunt natus recusandae, rerum earum nihil repellendus debitis nulla expedita necessitatibus odit non autem laboriosam magnam dolorum voluptatem ea et nostrum, illo laudantium eaque. Sed consequuntur natus excepturi perferendis amet quos sit asperiores et commodi aliquid autem laboriosam, similique quam earum iusto nesciunt architecto suscipit repellendus dolore culpa reiciendis. Ex qui blanditiis maxime, unde sit aperiam ab molestiae saepe perferendis fugit temporibus placeat eaque adipisci alias ea. Impedit ipsam at voluptatem amet porro illo sit temporibus ipsa facere.</p>
    </section>
    <!-- 職業展示 -->
    <section class="jobSwiper py-5">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <swiper :options="swiperOption">
            <swiper-slide>
              <div class="slide" style="background-image: url(https://imgur.dcard.tw/TZlXgUC.jpg);"></div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide" style="background-image: url(https://imgur.dcard.tw/ZBXMmEY.jpg);"></div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide" style="background-image: url(https://imgur.dcard.tw/HPnt6L1.jpg);"></div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide" style="background-image: url(https://imgur.dcard.tw/PJUj1tH.jpg);"></div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide" style="background-image: url(https://imgur.dcard.tw/qlbyOo8.jpg);"></div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </section>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "Swiper",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        // Basic
        initialSlide: 0,
        direction: "horizontal",
        speed: 800,
        // grabCursor: true,
        // Slides grid
        centeredSlides: true,
        slidesPerView: "auto",
        spaceBetween: 20,
        // Loop
        loop: true,
        // Autoplay
        autoplay: true,
        // effect: "flip",
        // Pagination
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        },
        // Navigation Buttons
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
        // notNextTick: true,
      }
      // swiperSlides: [1, 2, 3, 4, 5]
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>

<style scope lang="scss">
.banner {
  background-image: url(../../assets/images/pocket.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  height: 30vh;
  @media (min-width: 992px) {
    height: 50vh;
  }
}
// Swiper
.jobSwiper {
  .swiper-container {
    width: 100%;
    height: 50vh;
    @media (max-width: 576px) {
      height: 40vh;
    }
    .swiper-wrapper {
      .swiper-slide {
        background: #fff;
        width: 50%;
        @media (max-width: 576px) {
          width: 80%;
        }
      }
      .slide {
        height: 50vh;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        @media (max-width: 576px) {
          height: 40vh;
        }
      }
      .swiper-slide-prev,
      .swiper-slide-next {
        opacity: 0.3;
      }
    }
    .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: 0px;
    }
    .swiper-button-prev,
    .swiper-button-next {
      outline: none;
    }
  }
}
</style>
