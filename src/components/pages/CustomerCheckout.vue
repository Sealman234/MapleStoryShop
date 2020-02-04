<template>
  <div class="container conform-cart py-5">
    <!-- 購買完成後改字 -->
    <div class="text-center">
      <h2 class="font-weight-bold mb-4 pb-2" v-if="!order.is_paid">確認訂單</h2>
      <h2 class="font-weight-bold mb-4 pb-2" v-else>付款完成，感謝購買！</h2>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <!-- 購買完成後出現 -->
        <div class="banner"></div>
        <form class="mt-4" @submit.prevent="payOrder">
          <!-- 購買完成後隱藏 -->
          <table class="table" v-if="!order.is_paid">
            <thead class="thead-light">
              <th>商品名稱</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total | currency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total | currency }}</td>
              </tr>
            </tfoot>
          </table>
          <!-- 訂單資訊 -->
          <!-- 購買完成後隱藏 -->
          <div class="text-center" v-if="!order.is_paid">
            <h2 class="font-weight-bold mb-4 pb-2">訂單資訊</h2>
          </div>
          <table class="table">
            <tbody>
              <tr>
                <th>Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-outline-maple">取消購買</button>
            <button class="btn btn-maple">確認付款</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      orderId: "",
      order: {
        user: {} // 第二層的資料要預定義
      },
      step: 1
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.order = response.data.order;
        console.log(response);
        vm.isLoading = false;
      });
    },
    payOrder() {
      // 確認付款去
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(url).then(response => {
        console.log(response);
        if (response.data.success) {
          this.getOrder(); // 重新取得一次訂單資料，把"尚未付款"轉換成"付款完成"，並且拿掉付款按鈕
        }
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId; // 可讀取到 path: 'customerCheckout/:orderId' 用冒號帶入的參數 (orderId)
    console.log(this.orderId);
    this.getOrder(); // 有 orderId 就能把資料內容取回來呈現了
  }
};
</script>

<style scoped lang="scss">
.conform-cart {
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
  }
}

.banner {
  background-image: url(../../assets/images/thanks.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left center;
  height: 300px;
  @media (min-width: 992px) {
    height: 500px;
    background-position: center center;
  }
}
</style>
