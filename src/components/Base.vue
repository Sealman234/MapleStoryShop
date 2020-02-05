<template>
  <div>
    <!-- Header -->
    <Header></Header>
    <!-- 各頁面內容 -->
    <main>
      <router-view></router-view>
    </main>
    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped lang="scss">
main {
  margin-top: 78px;
}
</style>
