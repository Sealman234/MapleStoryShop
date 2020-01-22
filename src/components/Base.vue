<template>
  <div>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="../assets/MapleStory.svg" width="100px" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link to="/index" class="nav-link">
                <i class="fas fa-box-open"></i>
                首頁
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/category" class="nav-link">
                <i class="fas fa-box-open"></i>
                所有商品
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/aboutMS" class="nav-link">
                <i class="fas fa-box-open"></i>
                關於楓之谷
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/customerOrder" class="nav-link">
                <i class="fas fa-box-open"></i>
                購物車
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">關於作者</a>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <i class="fas fa-box-open"></i>
                登入
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- 各頁面內容 -->
    <div class="container-fluid">
      <div>
        <router-view></router-view>
      </div>
    </div>
    <!-- Footer -->
    <footer class="text-muted">
      <div class="container">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga veniam sit necessitatibus voluptatum illo magnam exercitationem delectus nisi assumenda saepe, pariatur esse similique, nihil maxime omnis eligendi, iste rem odio!
      </div>
    </footer>
  </div>
</template>

<style scoped>
.navbar .nav-link.active {
  color: #c1170c;
}
</style>
