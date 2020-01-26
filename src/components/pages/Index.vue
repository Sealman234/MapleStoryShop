<!-- The ref attr used to find the swiper instance -->
<template>
  <div>
    <!-- 商品展示 -->
    <section class="topSwiper container-lg py-5">
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
    <!-- 商品類別 -->
    <section class="container-fluid container-sm">
      <h3>商品分類</h3>
      <div class="d-flex justify-content-between">
        <a
          href="#"
          class="btn category-btn mx-2 d-flex justify-content-center align-items-center p-3"
        >
          <img src="../../assets/images/gif/pig.gif" height="50px" alt />
          <p class="m-0 ml-2">所有商品</p>
        </a>
        <a
          href="#"
          class="btn category-btn mx-2 d-flex justify-content-center align-items-center p-3"
        >
          <img src="../../assets/images/Korean Fan.png" height="50px" alt />
          <p class="m-0 ml-2">熱銷商品</p>
        </a>
        <a
          href="#"
          class="btn category-btn mx-2 d-flex justify-content-center align-items-center p-3"
        >
          <img src="../../assets/images/MapleScorpio.png" height="50px" alt />
          <p class="m-0 ml-2">楓葉武器</p>
        </a>
        <a
          href="#"
          class="btn category-btn mx-2 d-flex justify-content-center align-items-center p-3"
        >
          <img src="../../assets/images/MapleShield.png" height="50px" alt />
          <p class="m-0 ml-2">楓葉防具</p>
        </a>
        <a
          href="#"
          class="btn category-btn mx-2 d-flex justify-content-center align-items-center p-3"
        >
          <img src="../../assets/images/Last Unwelcome Guest Dagger (LUK).png" height="50px" alt />
          <p class="m-0 ml-2">不速之客</p>
        </a>
      </div>
    </section>
    <!-- 最新上架 -->
    <section class="container">
      <h3>最新上架</h3>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ipsum, hic libero nam debitis neque odit quaerat nulla placeat veritatis? Explicabo eum sunt natus recusandae, rerum earum nihil repellendus debitis nulla expedita necessitatibus odit non autem laboriosam magnam dolorum voluptatem ea et nostrum, illo laudantium eaque. Sed consequuntur natus excepturi perferendis amet quos sit asperiores et commodi aliquid autem laboriosam, similique quam earum iusto nesciunt architecto suscipit repellendus dolore culpa reiciendis. Ex qui blanditiis maxime, unde sit aperiam ab molestiae saepe perferendis fugit temporibus placeat eaque adipisci alias ea. Impedit ipsam at voluptatem amet porro illo sit temporibus ipsa facere.</p>
    </section>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Tiles from "../Tiles"; // 地板

export default {
  name: "Swiper",
  components: {
    swiper,
    swiperSlide,
    Tiles // 地板
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

<style scope>
/* Swiper */
@media (max-width: 991px) {
  .topSwiper.container-lg {
    padding-right: 0px;
    padding-left: 0px;
    max-width: 100%;
  }
}
.swiper-container {
  width: 100%;
  height: 400px;
}
.swiper-slide {
  background: #fff;
  width: 50%;
}
.slide {
  height: 400px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.swiper-slide-prev,
.swiper-slide-next {
  opacity: 0.3;
}
@media screen and (max-width: 576px) {
  .swiper-container,
  .slide {
    height: 300px;
  }
  .swiper-slide {
    width: 80%;
  }
}
.swiper-button-prev,
.swiper-button-next {
  outline: none;
}
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 0px;
}
/* Category Button */
/* .category-btn {
  border-radius: 5px;
  border: 0.5px solid #ccc;
  margin: 5px;
  transition: all 0.3s;
}
.category-btn:hover {
  border: 0.5px solid #c1170c;
} */
</style>
