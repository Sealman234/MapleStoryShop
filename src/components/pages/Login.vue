<template>
  <div>
    <Header></Header>
    <section class="bg-login">
      <div class="py-5">
        <form class="form-signin" @submit.prevent="signin">
          <div class="ms-logo mb-2">
            <h1 class="m-0 navbar-brand mx-auto" href="#">MapleStory</h1>
          </div>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control mb-2"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
          />
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control mb-2"
            placeholder="Password"
            required
            v-model="user.password"
          />
          <button class="btn btn-maple btn-block" type="submit">管理員登入</button>
          <button class="btn btn-maple btn-block" type="submit">回到首頁</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "../Header";
export default {
  name: "Login",
  components: {
    Header
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    signin() {
      const api = `${process.env.APIPATH}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/admin/products");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
section.bg-login {
  background-image: url(../../assets/images/hana.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  margin-top: 78px;
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
    .ms-logo .navbar-brand {
      display: block;
      background-image: url(../../assets/images/MapleStory.svg);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      height: 120px;
      text-indent: 101%;
      overflow: hidden;
      white-space: nowrap;
    }
    .form-control {
      position: relative;
      box-sizing: border-box;
      height: auto;
      padding: 10px;
      font-size: 16px;
      &:focus {
        z-index: 2;
      }
    }
  }
}
</style>
