<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <!-- 若 pagination.has_pre 是 false 就加上 disabled -->
        <li class="page-item" :class="{'disabled': !childPaginations.has_pre}">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getCurrentPage(childPaginations.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 若 pagination.current_page === page 就加上 active -->
        <li
          class="page-item"
          v-for="page in childPaginations.total_pages"
          :key="page"
          :class="{'active': childPaginations.current_page === page}"
        >
          <!-- 點擊切換至指定的 page 數 -->
          <a class="page-link" href="#" @click.prevent="getCurrentPage(page)">{{ page }}</a>
        </li>
        <!-- 若 pagination.has_next 是 false 就加上 disabled -->
        <li class="page-item" :class="{'disabled': !childPaginations.has_next}">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getCurrentPage(childPaginations.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Product",
  // 接受外部傳入之資料 (pagination)
  // 利用 props 將資料傳給 Components 使用 (父元件 → 子元件)
  props:{
    childPaginations:{
      type: Object,
    }
  },
  methods:{
    getCurrentPage(page){
      // 利用 emit 將 Components 的資料回傳 (子元件 → 父元件)
      //                事件名稱    , 傳出去的參數
      this.$emit("changeCurrentPage", page);
    }
  }
};
</script>
