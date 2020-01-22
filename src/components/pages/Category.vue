<template>
  <div>
    <!-- 讀取效果 -->
    <loading :active.sync="isLoading"></loading>
    <!-- 產品卡片列表 -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <!-- 動態綁定 (:style) backgroundImage -->
          <!-- 用 ES6 反引號製作 url 連結，變數用 ${} -->
          <div
            style="height: 150px; background-size: contain; background-repeat: no-repeat; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- 前者顯示僅有原價的 -->
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <!-- 後者顯示有原價 + 優惠價的 -->
              <del class="h6" v-if="item.price">原價 {{ item.origin_price | currency }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price | currency }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <!-- 假設是 status.loadingItem 與目前的 item 的 id 相同，就顯示轉圈 -->
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <!-- 直接點加入購物車，就是 + 預設值 1 (後面沒寫第二個參數) -->
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
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
      isLoading: false
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      // API 要用 Shopping 那段，不是用 admin 的
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
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
  created() {
    this.getProducts();
  }
};
</script>
