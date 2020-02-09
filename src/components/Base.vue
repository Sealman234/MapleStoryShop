<template>
  <div>
    <!-- Header -->
    <Header></Header>

    <!-- Alert Message -->
    <Alert></Alert>

    <!-- 各頁面內容 -->
    <main>
      <router-view></router-view>
    </main>

    <!-- 懸浮購物車 -->
    <Cart class="d-none d-sm-block"></Cart>

    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart";
import Alert from "./shared/AlertMessage";

export default {
  components: {
    Header,
    Footer,
    Cart,
    Alert
  },
};
</script>

<style scoped lang="scss">
main {
  margin-top: 78px;
}
</style>
