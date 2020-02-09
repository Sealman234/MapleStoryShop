<template>
  <div>
    <!-- Loading -->
    <loading :active.sync="isLoading">
      <template slot="default">
        <div class="loading-image"></div>
      </template>
    </loading>

    <!-- Cart -->
    <div class="container pt-5 pb-4 cart">
      <div class="text-center">
        <h2 class="font-weight-bold mb-4 pb-2">購物車內容</h2>
      </div>
      <div class="row d-flex justify-content-center" v-if="cart.carts.length !== 0">
        <div class="col-lg-10">
          <table class="table">
            <thead class="thead-light">
              <th></th>
              <th>商品名稱</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-maple btn-sm"
                    @click="removeCartItem(item.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td
                  class="align-middle text-right"
                  :class="{'text-success': item.coupon}"
                >{{ item.final_total | currency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總金額</td>
                <td class="text-right">{{ cart.total | currency }}</td>
              </tr>
              <!-- 如果沒套用折扣，就不用顯示折扣價 -->
              <tr v-if="cart.total !== cart.final_total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{ cart.final_total | currency }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group input-group-sm">
            <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code" />
            <div class="input-group-append">
              <button class="btn btn-outline-maple" type="button" @click="addCouponCode">套用優惠碼</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row d-flex justify-content-center">
        <div class="col-lg-10 empty-cart text-center">購物車沒有東西哦！</div>
      </div>
    </div>

    <!-- 購物車表單 -->
    <div class="container cart-form pb-5">
      <div class="text-center">
        <h2 class="font-weight-bold mb-4 pb-2">購買資訊</h2>
      </div>
      <div class="row justify-content-center">
        <!-- 清除表單送出後的預設行為 -->
        <form class="col-lg-10" @submit.prevent="createOrder">
          <div class="form-group">
            <label for="useremail">
              <i class="fas fa-envelope"></i>
              Email (*)
            </label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="useremail"
              v-model="form.user.email"
              placeholder="請輸入 Email"
              v-validate="'required|email'"
              :class="{'is-invalid': errors.has('email')}"
            />
            <!-- errors.first('email') 會告知 email 輸入的錯誤為何 -->
            <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
          </div>

          <div class="form-group">
            <label for="username">
              <i class="fas fa-user"></i>
              收件人姓名 (*)
            </label>
            <!-- 用is-invalid (Bootstrap 4 的驗證效果) 代表驗證是錯誤的，套用條件為 errors.has('name') 時 -->
            <input
              type="text"
              class="form-control"
              name="name"
              id="username"
              v-model="form.user.name"
              placeholder="輸入姓名"
              v-validate="'required'"
              :class="{'is-invalid': errors.has('name')}"
            />
            <!-- 對應上方 name 屬性的值，觸發後如果 name 不存在 (沒有輸入內容) 的話，就會跳出這個錯誤 (false -> true) -->
            <span class="text-danger" v-if="errors.has('name')">必須輸入姓名</span>
          </div>

          <div class="form-group">
            <label for="usertel">
              <i class="fas fa-phone"></i>
              收件人電話 (*)
            </label>
            <input
              type="tel"
              class="form-control"
              id="usertel"
              v-model="form.user.tel"
              placeholder="請輸入電話"
              name="userTel"
              v-validate="'required'"
              :class="{'is-invalid': errors.has('userTel')}"
            />
            <span class="text-danger" v-if="errors.has('userTel')">電話欄位不得留空</span>
          </div>

          <div class="form-group">
            <label for="useraddress">
              <i class="fas fa-map-marker-alt"></i>
              收件人地址 (*)
            </label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="useraddress"
              v-model="form.user.address"
              placeholder="請輸入地址"
              v-validate="'required'"
              :class="{'is-invalid': errors.has('address')}"
            />
            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
          </div>

          <div class="form-group">
            <label for="comment">
              <i class="fas fa-comment-dots"></i>
              留言
            </label>
            <textarea
              name
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-maple btn-lg">送出訂單</button>
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
      products: [],
      product: {},
      status: {
        loadingItem: ""
      },
      isLoading: false,
      cart: {
        carts: []
      },
      coupon_code: "",
      form: {
        // 預定義資料
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then(response => {
        vm.cart = response.data.data;
        console.log(response);
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(url).then(response => {
        if (response.data.success) {
          vm.$bus.$emit("message:push", "產品刪除成功", "success");
          vm.isLoading = false;
          vm.getCart(); // 刪除後，重新取得購物車內容
          vm.$bus.$emit("cartCreate:push");
        } else {
          vm.isLoading = false;
          vm.$bus.$emit("message:push", "Oops！出現錯誤了！", "danger");
        }
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      vm.isLoading = true;
      const coupon = {
        code: vm.coupon_code // 用戶輸入的優惠碼
      };
      vm.$http.post(url, { data: coupon }).then(response => {
        console.log(response);
        console.log(response.data.message); // 回應是否套用成功
        if (response.data.success) {
          vm.isLoading = false;
          vm.$bus.$emit("message:push", "優惠碼套用成功", "success");
          vm.getCart(); // 套用後價格會調整，所以要重新取得購物車
          vm.$bus.$emit("cartCreate:push");
        } else if (response.data.message === "找不到優惠券!") {
          vm.isLoading = false;
          this.$bus.$emit("message:push", "沒有這張優惠卷", "danger");
        } else if (response.data.message === "優惠券無法無法使用或已過期") {
          vm.isLoading = false;
          vm.$bus.$emit("message:push", "優惠券無法無法使用或已過期", "danger");
        }
      });
    },
    createOrder() {
      // 結帳頁面
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      // vm.isLoading = true;
      // 表單完成前不能送出
      vm.$validator.validate().then(result => {
        if (result) {
          // do stuff if not valid.
          vm.$http.post(url, { data: order }).then(response => {
            console.log("訂單已建立", response);
            // 判斷式，確定訂單建立完成，即轉換頁面
            if (response.data.success) {
              vm.$router.push(`/customerCheckout/${response.data.orderId}`); // 有變數，要使用反引號
            }
            // this.getCart();
            vm.isLoading = false;
          });
        } else {
          console.log("欄位不完整");
        }
      });
    }
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.$bus.$on("cartCreate:push", () => {
      vm.getCart();
    });
  }
};
</script>

<style scope lang="scss">
// Loading
.loading-image {
  background-image: url(../../assets/images/GIFs/KingSlime.gif);
  background-size: cover;
  width: 219px;
  height: 230px;
}

.cart {
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
  }
  .empty-cart {
    background-color: #ededed;
    border-radius: 10px;
    padding: 30px 0px;
  }
}

.cart-form {
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
  }
}
</style>
