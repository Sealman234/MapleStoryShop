<template>
  <div>
    <div class="tiles"></div>
  </div>
</template>

<script>
export default {
  name: "Tiles",
};
</script>

<style scoped>
.tiles {
  height: 85px;
  background-image: url(../assets/images/fulltiles.png);
  background-repeat: repeat-x;
  z-index: 9;
}
</style>
