<template>
  <div>
    <loading :active.sync="isLoading">
      <template slot="default">
        <div class="loading-image"></div>
      </template>
    </loading>
    <div class="container py-3">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-white">
          <li class="breadcrumb-item">
            <router-link to="/index" class="text-maple">首頁</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <span>{{ product.title }}</span>
          </li>
        </ol>
      </nav>
      <!-- Main Content -->
      <div class="row">
        <div class="col-md-6 mb-4 mb-md-0">
          <div class="double-border p-4 h-100">
            <figure class="mb-4 item-image" :style="{backgroundImage: `url(${product.imageUrl})`}"></figure>
            <h5 class="pt-4 text-maple border-top">【商品敘述】</h5>
            <p>{{ product.content }}</p>
            <h5 class="pt-4 text-maple border-top">【商品規格】</h5>
            <p class="mb-0">{{ product.description }}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="double-border p-4">
            <!-- 商品類別 -->
            <span
              class="badge float-right badge-danger category-badge"
              v-if="product.category == '熱銷商品'"
            >{{ product.category }}</span>
            <span
              class="badge float-right badge-moderate category-badge"
              v-if="product.category == '最新商品'"
            >{{ product.category }}</span>
            <span
              class="badge float-right badge-maple category-badge"
              v-if="product.category=='楓葉武器' || product.category =='楓葉防具'"
            >{{ product.category }}</span>
            <span
              class="badge float-right badge-dark category-badge"
              v-if="product.category == '不速之客'"
            >{{ product.category }}</span>
            <!-- 商品名稱 -->
            <h2 class="h3 product-title pb-4 border-bottom">
              <span class="pb-4">{{ product.title }}</span>
            </h2>
            <!-- 價格 -->
            <div class="h5 mt-4 mb-3" v-if="!product.price">NT{{ product.origin_price | currency }}</div>
            <div
              class="h6 text-secondary mt-4"
              v-if="product.price"
            >原價 NT{{ product.origin_price | currency }}</div>
            <div
              class="h5 mb-3 text-maple sale-price"
              v-if="product.price"
            >特價 NT{{ product.price | currency }}</div>
            <!-- 選購 -->
            <select name class="form-control my-3" v-model="product.num">
              <option value="0" selected disabled>請選擇數量</option>
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
            <!-- 加到購物車 -->
            <button
              type="button"
              class="btn btn-maple mb-4 w-100"
              @click="addToCart(product.id, product.num)"
            >
              小計
              <strong>{{ product.num * product.price | currency }}</strong>元 /
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
            <h5 class="pt-4 text-maple border-top">【配送及其他說明】</h5>
            <p>為保障會員個資安全，您所訂購的商品之出貨標籤上，我們將會遮蔽部份姓名，如造成您的收貨困擾，請見諒。</p>
            <div class="ship-info">
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td class="font-weight-bold pr-0" width="96px">寄送時間：</td>
                    <td class="pl-0">
                      <span class="text-danger">弓箭手村6h到貨（試營運）</span>
                      <br />全島24h到貨，遲到提供100元現金積點。全年無休，週末假日照常出貨。
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold pr-0" width="96px">送貨方式：</td>
                    <td class="pl-0">
                      透過篤伊宅配公司送達。
                      <br />消費者訂購之商品若經配送兩次無法送達，再經本公司以電話與Email均無法聯繫逾三天者，本公司將取消該筆訂單，並且全額退款。
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold pr-0" width="96px">送貨範圍：</td>
                    <td
                      class="pl-0"
                    >限維多利亞島與離島地區，部分離島地區（包括鯨魚號、黃金海灘、台灣…等）貨件，將送至到岸船公司碼頭，需請收貨人自行至碼頭取貨。注意！收件地址請勿為郵政信箱。</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold pr-0" width="96px">售後服務：</td>
                    <td class="pl-0">新品瑕疵</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../Pagination";
export default {
  data() {
    return {
      id: "",
      product: {
        num: 0
      },
      status: {
        loadingItem: ""
      },
      isLoading: false
    };
  },
  methods: {
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
      });
    }
  },
  created() {
    const id = this.$route.params.id; // 取得路由傳進來的參數 id
    // console.log(id);
    const vm = this;
    const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
    vm.isLoading = true;
    this.$http.get(url).then(response => {
      vm.product = response.data.product; // 透過這個 id 取得該筆資料的內容
      console.log(response);
      this.product.num = 0; // 設置商品數量的預設值
      vm.isLoading = false;
    });
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
// 左邊
figure.item-image {
  height: 220px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.double-border {
  border-width: 4px;
  border-color: #939699;
  border-style: double;
  border-radius: 10px;
}
.ship-info {
  border: 3px solid #ccc;
  border-radius: 10px;
}
// 右邊
.category-badge {
  font-size: 14px;
  padding: 5px 8px;
}
.product-title span {
  font-weight: 600;
  letter-spacing: 3px;
  position: relative;
  &::after {
    background: #adb5bd;
    bottom: 3px;
    content: "";
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
  }
}

.sale-price {
  font-weight: 600;
  font-size: 22px;
}
select.form-control {
  padding: 10px;
  height: 100%;
  border: 1px solid #6c757d;
  font-size: 16px;
  letter-spacing: 2px;
}
select.form-control:hover {
  border: 1px solid #343a40;
  box-shadow: 0 1px 5px #ccc;
  transition: 0.3s all;
}
</style>
