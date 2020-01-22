<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <!-- Button trigger modal -->
      <button class="btn btn-primary" @click="openModal(true)">建立新優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date | date}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-sm btn-outline-primary" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-sm btn-outline-danger" @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <Pagination v-bind:childPaginations="pagination" @changeCurrentPage="getCoupons"></Pagination>
    <!-- 新增/修改 Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">優惠券名稱</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入優惠券名稱"
              />
            </div>
            <div class="form-group">
              <label for="couponCode">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="couponCode"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="dueDate">到期日</label>
              <input type="date" class="form-control" id="dueDate" v-model="due_date" />
            </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="percent"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除 Modal" -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券？（刪除後將無法恢復）
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination";

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      pagination: {},
      // 如果沒有指定參數，物件預設值為產生物件的日期與本地時間
      // 本地時間是指執行 JavaScript new Date() 的用戶電腦時間
      due_date: new Date(), // Wed Jan 15 2020 16:01:52 GMT+0800 (台北標準時間)
    };
  },
  components: {
    Pagination
  },
  watch: {
    due_date() {
      const vm = this;
      // 選擇日期後，vm.due_date 會變成 "2020-01-15" 的這種格式
      // 而 new Date("2020-01-15") 等於 1579046400000 (毫秒)
      // 所以透過 Math.floor(new Date("2020-01-15") / 1000) 可以得到時間戳 (秒)
      const timestamp = Math.floor(new Date(vm.due_date) / 1000); // 1579046400
      vm.tempCoupon.due_date = timestamp; // 再把 timestamp 存給 tempCoupon.due_date
    }
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        console.log(response.data);
      });
    },
    openModal(isNew, item) {
      const vm = this;
      if (isNew) {
        vm.due_date = new Date(); // 修正「點過其他優惠券的編輯 Modal 後，點擊建立優惠券會自動帶入上個優惠券日期」的 bug
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item); // 把點選的優惠券資訊 assign 給 tempCoupon
        this.isNew = false;
        // new Date(timestamp*1000) : 將取得的 timestamp 轉成可讀的時間
        // 2011-10-05T14:48:00.000Z => 以字母 "T" 區分開後，取前面 [0] 的部分
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000)
          .toISOString()
          .split("T");
        vm.due_date = dateAndTime[0];
      }
      $("#couponModal").modal("show");
    },
    updateCoupon() {
      // 新增 Coupon
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      const vm = this;
      // 編輯 Coupon
      let httpMethod = "post";
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
        // 編輯完成後，將 vm.due_date 轉回 "Wed Jan 15 2020 16:01:52 GMT+0800 (台北標準時間)" 的格式
        // vm.due_date = new Date(vm.tempCoupon.due_date * 1000); // 好像可有可無
      }
      // 共同程式碼
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#couponModal").modal("hide");
          vm.getCoupons();
        } else {
          $("#couponModal").modal("hide");
          vm.getCoupons();
          console.log("新增失敗");
        }
      });
    },
    openDelModal(item) {
      this.tempCoupon = item;
      $("#delCouponModal").modal("show");
    },
    deleteCoupon() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http.delete(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#delCouponModal").modal("hide");
          vm.getCoupons();
        } else {
          $("#delCouponModal").modal("hide");
          vm.getCoupons();
          console.log("刪除失敗");
        }
      });
    }
  },
  created() {
    this.getCoupons(); // init
  }
};
</script>
