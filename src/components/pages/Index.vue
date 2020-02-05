<template>
  <div>
    <!-- Loading -->
    <loading :active.sync="isLoading">
      <template slot="default">
        <div class="loading-image"></div>
      </template>
    </loading>

    <!-- Banner -->
    <div class="banner d-flex justify-content-center align-items-center">
      <h3 class="text-center">
        回到最初的感動
        <br />我在冒險的起點等你！
      </h3>
    </div>

    <!-- ABOUT US -->
    <section class="about-us container py-5 text-center">
      <h2 class="font-weight-bolder mb-3 pb-2">ABOUT US</h2>
      <p class="h4 pb-2">MapleStory Shop</p>
      <div class="row justify-content-center pb-3">
        <div class="col-10 col-lg-6">
          <p
            class="mb-0"
          >在楓之谷世界中，打倒怪物後繼續前進是生存的唯一方式。MapleStory Shop 提供您冒險時所需要的裝備，有了這些裝備，在執行任務時不管是怪物還是 BOSS 都能像切菜一樣輕鬆地打倒。</p>
        </div>
      </div>
      <router-link to="/category" class="text-maple text-decoration-none">進入商城</router-link>
    </section>

    <!-- 熱銷商品 -->
    <section class="pt-5 mb-3 best-seller">
      <div class="container pb-5 text-center best-seller">
        <h2 class="font-weight-bolder mb-4 pb-2">熱銷商品</h2>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <!-- 加上 v-if 使得數據變更時觸發並重新渲染整個 Swiper -->
            <swiper :options="swiperOption1" ref="mySwiper" v-if="products.length > 0">
              <swiper-slide class="py-3" v-for="item in hotProducts" :key="item.id">
                <div class="card border h-100">
                  <div class="border-bottom">
                    <span class="badge float-right badge-danger">熱銷商品</span>
                    <figure
                      class="mt-4 mb-4 item-image"
                      :style="{backgroundImage: `url(${item.imageUrl})`}"
                    ></figure>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title text-center">
                      <a href="#" class="text-dark font-weight-bold">{{ item.title }}</a>
                    </h4>
                    <p class="card-text text-secondary text-center">{{ item.content }}</p>
                    <div class="d-flex justify-content-center align-items-end">
                      <div class="h5" v-if="!item.price">{{ item.origin_price | currency }}</div>
                      <del
                        class="h6 text-secondary pr-1"
                        v-if="item.price"
                      >{{ item.origin_price | currency }}</del>
                      <div
                        class="h5 text-maple font-weight-bold"
                        v-if="item.price"
                      >{{ item.price | currency }}</div>
                    </div>
                  </div>
                  <div class="card-footer d-flex bg-white border-0 pt-0 flex-md-column flex-xl-row">
                    <router-link
                      :to="`/detail/${item.id}`"
                      class="btn btn-outline-secondary btn-xl-sm w-100 mr-2"
                    >查看更多</router-link>
                    <button
                      type="button"
                      class="btn btn-outline-maple btn-xl-sm ml-auto w-100 mt-md-2 mt-xl-0"
                      @click="addToCart(item.id)"
                    >
                      <!-- <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i> -->
                      立即購買
                    </button>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="swiper-pagination swp1" slot="pagination"></div>
      </div>
      <div class="row justify-content-center no-gutters">
        <div class="col-10 text-center">
          <router-link
            to="/category"
            class="btn btn-maple d-block d-md-inline-block py-2 px-md-5 py-md-3 font-weight-bold rounded-0"
          >看更多商品</router-link>
        </div>
      </div>
    </section>

    <!-- 各職業展示 -->
    <section class="job-swiper py-5 mb-5 text-center">
      <h2 class="font-weight-bolder mb-3 pb-2">各職業展示</h2>
      <p class="h4">我們為不同的職業提供裝備上的選擇。</p>
      <div class="swiper-container pt-4">
        <div class="swiper-wrapper">
          <swiper :options="swiperOption2" ref="mySwiper">
            <!-- slides -->
            <swiper-slide>
              <div class="slide">
                <img src="../../assets/images/jobs/beginner.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../../assets/images/jobs/wizard.png" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../../assets/images/jobs/warrior.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../../assets/images/jobs/thief-male.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../../assets/images/jobs/thief2.png" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../../assets/images/jobs/sword.png" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../../assets/images/jobs/magician.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../../assets/images/jobs/knight.png" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../../assets/images/jobs/archer-male.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../../assets/images/jobs/archer.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../../assets/images/jobs/thief.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="swiper-button-prev swp2"></div>
        <div class="swiper-button-next swp2"></div>
      </div>
      <!-- Optional controls -->
      <div class="swiper-pagination swp2" slot="pagination"></div>
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
      swiperOption1: {
        initialSlide: 0,
        direction: "horizontal",
        speed: 800,
        grabCursor: true,
        // centeredSlides: true,
        slidesPerView: 4, // "auto",
        spaceBetween: 30,
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination.swp1",
          clickable: true,
          type: "bullets"
        },
        navigation: {
          nextEl: ".swiper-button-next.swp1",
          prevEl: ".swiper-button-prev.swp1"
        },
        breakpoints: {
          // 當寬度小於等於 544
          544: {
            slidesPerView: 1
          },
          // 當寬度小於等於 767
          767: {
            slidesPerView: 2,
            centeredSlides: false
          },
          // 當寬度小於等於 991
          991: {
            slidesPerView: 3,
            centeredSlides: true
          }
        },
        pagination: {
          el: ".swiper-pagination.swp1",
          clickable: true,
          type: "bullets"
        }
      },
      swiperOption2: {
        initialSlide: 0,
        direction: "horizontal",
        speed: 800,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 4, // "auto"
        // spaceBetween: 0,
        loop: true,
        // autoplay: true,
        autoplay: {
          delay: 5000
        },
        breakpoints: {
          // 當寬度 <= 544
          544: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // 當寬度 <= 767
          767: {
            slidesPerView: 2,
            // spaceBetween: 10,
            centeredSlides: true
          },
          // 當寬度 <= 991
          991: {
            slidesPerView: 3,
            // spaceBetween: 10,
            centeredSlides: true
          },
          // 當寬度 <= 1023
          1023: {
            slidesPerView: 4,
            // spaceBetween: 0,
            centeredSlides: false
          }
        },
        pagination: {
          el: ".swiper-pagination.swp2",
          clickable: true,
          type: "bullets"
        },
        navigation: {
          nextEl: ".swiper-button-next.swp2",
          prevEl: ".swiper-button-prev.swp2"
        }
      },
      products: [],
      isLoading: false
      // status: {
      //   loadingItem: ""
      // }
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.products = response.data.products;
        // console.log(response);
        vm.isLoading = false;
      });
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      // vm.status.loadingItem = id;
      vm.isLoading = true;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        console.log(response);
        // vm.getCart(); // 加入後刷新購物車
        // vm.status.loadingItem = "";
        vm.isLoading = false;
      });
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    hotProducts() {
      // 取得熱門商品
      const vm = this;
      return vm.products.filter(function(item) {
        if (item.category == "熱銷商品") {
          return item;
        }
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style scope lang="scss">
// Loading
.loading-image {
  // background-image: url(../../assets/images/gif/slime.gif);
  background-image: url(../../assets/images/gif/KingSlime.gif);
  background-size: cover;
  // width: 76.5957446809px;
  // height: 100px;
  width: 219px;
  height: 230px;
}

// Banner
.banner {
  background-image: url(../../assets/images/pocket.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  height: 30vh;
  @media (min-width: 992px) {
    height: 50vh;
  }
  h3 {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.55); // 0.45
    padding: 10px;
    border-radius: 10px;
    min-height: 90px;
    max-height: 100%;
  }
}

// ABOUT US
.about-us {
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
  }
}

// 熱銷商品
.best-seller {
  background-color: #ededed;
  .container {
    position: relative;
    h2 {
      display: inline-block;
      font-weight: 600;
      border-bottom: 3px solid #c1170c;
    }
    .swiper-slide {
      height: auto;
      .card {
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
        .badge {
          font-size: 14px;
          padding: 5px 8px;
          margin-right: 4px;
          margin-top: 4px;
        }
        figure.item-image {
          height: 120px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
        .card-text {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .btn-xl-sm {
          @media (min-width: 1200px) {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            line-height: 1.5;
            border-radius: 0.2rem;
            font-size: 16px;
          }
        }
      }
    }
    .swiper-pagination {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      .swiper-pagination-bullet {
        width: 16px;
        height: 16px;
        background-color: #c1170c;
        margin-left: 8px;
        margin-right: 8px;
      }
    }
  }
  .row .btn {
    position: relative;
    transform: translateY(50%);
    z-index: 9;
    font-size: 24px;
    @media (max-width: 767px) {
      font-size: 20px;
    }
  }
}

// 各職業展示
.job-swiper {
  position: relative;
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
  }
  .swiper-container {
    width: 100%;
    .slide img {
      height: 250px;
    }
    .swiper-button-prev,
    .swiper-button-next {
      outline: none;
    }
  }
  .swiper-pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    .swiper-pagination-bullet {
      width: 16px;
      height: 16px;
      background-color: #c1170c;
      margin-left: 8px;
      margin-right: 8px;
      @media (max-width: 767px) {
        // width: 14px;
        // height: 14px;
        margin-left: 4px;
        margin-right: 4px;
      }
    }
  }
}
</style>
