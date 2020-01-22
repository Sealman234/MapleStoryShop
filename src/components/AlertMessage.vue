<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      // 一個一個 messages 包著這三項東西
      messages: [
        // {
        //   message: "訊息內容", // 文字內容
        //   status: "danger", // 樣式
        //   timestamp: 123 // ID
        // }
      ]
    };
  },
  methods: {
    // 1. 送一個訊息到 messages 裡面
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp
      });
      // 2. 觸發移除自己的函式
      this.removeMessageWithTiming(timestamp);
    },
    // 4. 按叉叉移除
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    // 3. 五秒後移除自己
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    }
  },
  created() {
    const vm = this;
    vm.$bus.$on("message:push", (message, status = "warning") => {
      vm.updateMessage(message, status);
    });
    // vm.$bus.$emit('message:push');
  }
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
