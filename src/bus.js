import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// this.$bus.$emit("message:push", response.data.message, "danger");

// 將 Event Bus 掛載在 Vue 的原型下，所以可以直接對 Event Bus 做呼叫 (Vue.prototype.$bus)。

// 因為 Event Bus 可以做到跨元件溝通，所以建議將 Event Bus 可以使用的方法 (包含使用的方法、傳遞的參數等等) 寫個註解在這個 bus.js 檔案內。
// 如果沒有標示，可能會忘記或不清楚有哪些方法可以使用喔
