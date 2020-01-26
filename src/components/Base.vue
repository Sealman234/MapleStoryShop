<template>
  <div>
    <!-- Header -->
    <header class="fixed-top">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-white"
        style="border-bottom: 4px solid #D3D3D3; box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);"
      >
        <div class="container-lg">
          <div class="ms-logo">
            <h1 class="m-0">
              <router-link to="/index" class="navbar-brand mr-auto" href="#">MapleStory</router-link>
            </h1>
          </div>
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
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <span></span>
                <router-link to="/index" class="nav-link p-3">
                  <i class="fas fa-home"></i>
                  首頁
                </router-link>
              </li>
              <li class="nav-item">
                <span></span>
                <router-link to="/category" class="nav-link p-3">
                  <i class="fas fa-box-open"></i>
                  所有商品
                </router-link>
              </li>
              <li class="nav-item">
                <span></span>
                <router-link to="/aboutMS" class="nav-link p-3">
                  <i class="fas fa-book"></i>
                  關於楓之谷
                </router-link>
              </li>
              <li class="nav-item">
                <span></span>
                <router-link to="/customerOrder" class="nav-link p-3">
                  <i class="fas fa-shopping-cart"></i>
                  購物車
                </router-link>
              </li>
              <li class="nav-item">
                <span></span>
                <a class="nav-link p-3" href="https://github.com/Sealman234">
                  <i class="fab fa-github"></i>
                  關於作者
                </a>
              </li>
              <li class="nav-item">
                <span></span>
                <router-link to="/login" class="nav-link p-3">
                  <i class="fas fa-user-cog"></i>
                  登入
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!-- 各頁面內容 -->
    <main style="margin-top: 78px;">
      <router-view></router-view>
    </main>
    <!-- Footer -->
    <footer class="bg-white pt-5">
      <!-- <div class="tiles"></div> -->
      <div class="container pt-5">
        <div class="position-relative pt-1">
          <img
            src="../assets/images/gif/gugu2.gif"
            height="50px"
            class="position-absolute"
            style="bottom: 0px; right: 160px;"
          />
          <img
            src="../assets/images/gif/gugu2.gif"
            height="100px"
            class="position-absolute"
            style="bottom: 0px; right: 60px;"
          />
          <img
            src="../assets/images/gif/gugu2.gif"
            height="50px"
            class="position-absolute"
            style="bottom: 0px; right: 0px;"
          />
          <img
            src="../assets/images/gif/hello2.gif"
            height="100px"
            class="position-absolute"
            style="bottom: 0px; left: 0px;"
          />
        </div>
      </div>
      <Tiles></Tiles>
    </footer>
  </div>
</template>

<script>
import Tiles from "./Tiles";

export default {
  components: {
    Tiles
  }
};
</script>

<style scoped>
/* header */
.ms-logo .navbar-brand {
  background-image: url(../assets/images/MapleStory.svg);
  width: 150px;
  height: 57.79px;
  display: block;
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
}
.navbar li {
  float: left;
  position: relative;
}
.navbar .nav-link {
  display: block;
  background: transparent;
  /* color: #000; */
  font-weight: bold;
  text-decoration: none;
  padding: 20px;
  position: relative;
}
.navbar li:hover span {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -35%;
  width: 70%;
  height: 0px;
  box-shadow: 0 0 20px 12px rgba(150, 180, 200, 0.6);
  border-radius: 10px 6px;
}
@media screen and (max-width: 991px) {
  .navbar li:hover span {
    left: 2%;
    top: 50%;
    margin-left: 0;
    width: 95%;
  }
}
.navbar .nav-link.active,
.navbar .nav-link:hover {
  color: #c1170c;
}
.bg-blue-dark {
  background-color: #274878;
}
</style>
