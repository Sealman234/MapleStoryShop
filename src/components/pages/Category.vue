<template>
  <div>
    <!-- 讀取效果 -->
    <loading :active.sync="isLoading">
      <template slot="default">
        <div class="loading-image"></div>
      </template>
    </loading>
    <!-- Banner -->
    <div class="banner"></div>
    <!-- Main content -->
    <div class="category container pt-3 pb-5">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-white">
          <li class="breadcrumb-item">
            <router-link to="/index" class="text-maple">首頁</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <span v-if="tempCategory==''">所有商品</span>
            <span v-else>{{ tempCategory }}</span>
          </li>
        </ol>
      </nav>
      <div class="row">
        <!-- 商品類別 -->
        <section class="col-12 col-lg-3">
          <div class="d-flex d-lg-block flex-wrap justify-content-between sticky-list">
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = ''"
              :class="{'active': tempCategory == ''}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img src="../../assets/images/gif/pig.gif" height="50px" alt />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>所有商品</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = '熱銷商品'"
              :class="{'active': tempCategory == '熱銷商品'}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img src="../../assets/images/mesobag.png" height="50px" alt />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>熱銷商品</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = '最新商品'"
              :class="{'active': tempCategory == '最新商品'}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img src="../../assets/images/Korean Fan.png" height="50px" alt />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>最新商品</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = '楓葉武器'"
              :class="{'active': tempCategory == '楓葉武器'}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img src="../../assets/images/MapleScorpio.png" height="50px" alt />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>楓葉武器</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = '楓葉防具'"
              :class="{'active': tempCategory == '楓葉防具'}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img src="../../assets/images/MapleShield.png" height="50px" alt />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>楓葉防具</p>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="btn category-btn d-md-flex justify-content-center align-items-center p-3"
              @click.prevent="tempCategory = '不速之客'"
              :class="{'active': tempCategory == '不速之客'}"
            >
              <div class="row no-gutters">
                <div class="col-md-4 align-self-center text-center text-md-right">
                  <img
                    src="../../assets/images/Last Unwelcome Guest Dagger (LUK).png"
                    height="50px"
                    alt
                  />
                </div>
                <div class="col-md-8 align-self-center text-center text-md-left">
                  <p>不速之客</p>
                </div>
              </div>
            </a>
          </div>
        </section>
        <!-- 商品列表 -->
        <section class="col-12 col-lg-9">
          <h3 v-if="tempCategory">{{ tempCategory }}</h3>
          <h3 v-else>所有商品</h3>
          <div class="row mt-3">
            <article class="col-md-6 col-lg-4 mb-4" v-for="item in activeProducts" :key="item.id">
              <div class="card border">
                <div class="border-bottom">
                  <!-- 依條件判斷，只會出現其中一個 badge -->
                  <span
                    class="badge float-right badge-danger"
                    v-if="item.category == '熱銷商品'"
                  >{{ item.category }}</span>
                  <span
                    class="badge float-right badge-moderate"
                    v-if="item.category == '最新商品'"
                  >{{ item.category }}</span>
                  <span
                    class="badge float-right badge-maple"
                    v-if="item.category=='楓葉武器' || item.category =='楓葉防具'"
                  >{{ item.category }}</span>
                  <span
                    class="badge float-right badge-dark"
                    v-if="item.category == '不速之客'"
                  >{{ item.category }}</span>
                  <figure
                    class="mt-4 mb-4 item-image"
                    :style="{backgroundImage: `url(${item.imageUrl})`}"
                  ></figure>
                </div>
                <div class="card-body">
                  <h5 class="card-title text-center">
                    <a href="#" class="text-dark font-weight-bold">{{ item.title }}</a>
                  </h5>
                  <p class="card-text text-secondary text-center">{{ item.content }}</p>
                  <div class="d-flex justify-content-center align-items-end">
                    <!-- 前者顯示僅有原價的 -->
                    <div class="h5" v-if="!item.price">{{ item.origin_price | currency }}</div>
                    <!-- 後者顯示有原價 + 優惠價的 -->
                    <del
                      class="h6 text-secondary pr-2"
                      v-if="item.price"
                    >{{ item.origin_price | currency }}</del>
                    <div class="h5 text-maple" v-if="item.price">{{ item.price | currency }}</div>
                  </div>
                </div>
                <div class="card-footer d-flex bg-white border-0 pt-0 flex-lg-column flex-xl-row">
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-xl-sm w-100 mr-2"
                    @click="getProduct(item.id)"
                  >
                    <!-- 假設是 status.loadingItem 與目前的 item 的 id 相同，就顯示轉圈 -->
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    查看更多
                  </button>
                  <!-- 直接點加入購物車，就是 + 預設值 1 (後面沒寫第二個參數) -->
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-xl-sm ml-auto w-100 mt-lg-2 mt-xl-0"
                    @click="addToCart(item.id)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    加入購物車
                  </button>
                </div>
              </div>
            </article>
          </div>
          <!-- productModal -->
          <div
            class="modal fade"
            id="productModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <!-- 這個 imageUrl 已有雙向綁定 -->
                  <img :src="product.imageUrl" class="img-fluid" alt />
                  <blockquote class="blockquote mt-3">
                    <p class="mb-0">{{ product.content }}</p>
                    <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                  </blockquote>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h4" v-if="!product.price">{{ product.origin_price | currency }} 元</div>
                    <del class="h6" v-if="product.price">原價 {{ product.origin_price | currency }} 元</del>
                    <div class="h4" v-if="product.price">現在只要 {{ product.price | currency }} 元</div>
                  </div>
                  <select name class="form-control mt-3" v-model="product.num">
                    <!-- v-for：可選擇 1 ~ 10 筆 -->
                    <!-- :value="num"：把 num 動態綁定成 value 的值 -->
                    <!-- 單位使用 product.unit (可在產品後台設定) -->
                    <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
                  </select>
                </div>
                <div class="modal-footer">
                  <div class="text-muted text-nowrap mr-3">
                    小計
                    <strong>{{ product.num * product.price | currency }}</strong> 元
                  </div>
                  <!-- 加入購物車 (要帶數量 product.num) -->
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="addToCart(product.id, product.num)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ""
      },
      isLoading: false,
      tempCategory: ""
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      // API 要用 Shopping 那段，不是用 admin 的
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`; // 取得商品列表_all
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id; // 判斷目前畫面上是哪一個元素正在讀取中
      this.$http.get(url).then(response => {
        vm.product = response.data.product; // 載入並讀取資料
        $("#productModal").modal("show"); // AJAX 結束之後將 Modal 打開
        console.log(response);
        vm.status.loadingItem = ""; // 讀取完，將這個值改回空值
      });
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        console.log(response);
        vm.status.loadingItem = "";
        // vm.getCart(); // 加入後刷新購物車
        $("#productModal").modal("hide");
      });
    }
  },
  computed: {
    activeProducts() {
      const vm = this;
      // 所有商品
      if (vm.tempCategory == "") {
        return vm.products;
      } else {
        // 有分類
        return vm.products.filter(function(item) {
          if (item.category == vm.tempCategory) {
            return item;
          }
        });
      }
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style scoped lang="scss">
.loading-image {
  background-image: url(../../assets/images/gif/slime.gif);
  background-size: cover;
  width: 76.5957446809px;
  height: 100px;
}
.banner {
  background-image: url(../../assets/images/mobs.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  height: 640px;
}
.category {
  .sticky-list {
    @media (min-width: 992px) {
      position: sticky !important;
      top: 93px;
    }
  }
  .category-btn {
    border-radius: 5px;
    border: 0.5px solid #ccc;
    margin-bottom: 2%;
    transition: all 0.5s;
    @media (max-width: 366px) {
      width: 49%; // 兩欄
    }
    @media (min-width: 367px) and (max-width: 991px) {
      width: 32%; // 三欄
    }
    p {
      margin: 0;
      font-weight: bold;
      @media (min-width: 767px) {
        padding-left: 20px;
      }
    }
    &:hover {
      border: 0.5px solid #c1170c;
      box-shadow: 0 1px 5px #c1170c;
    }
    &.active {
      border: 0.5px solid #c1170c;
      box-shadow: 0 2px 10px #c1170c;
    }
  }
  .card {
    transition: all 0.5s;
    box-shadow: 0 1px 5px #000;
    &:hover {
      box-shadow: 0 2px 10px #000;
    }
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
</style>
