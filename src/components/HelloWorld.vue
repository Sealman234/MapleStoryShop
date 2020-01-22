<template>
  <div class="hello">
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    signout() {
      // 登出的事件
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      // 不需要傳入任何參數，只要觸發這個 API 就會直接登出
      this.$http.post(api).then(response => {
        console.log(response.data);
        // 如果成功登出，就回到 Login 頁面
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* scoped : 以下樣式只適用於此元件內 */
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
