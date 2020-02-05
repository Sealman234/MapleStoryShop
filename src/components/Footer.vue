<template>
  <div>
    <!-- Footer -->
    <footer class="bg-white pt-5">
      <div class="container pt-5">
        <div class="position-relative pt-1">
          <img
            src="../assets/images/roger.png"
            width="70px"
            class="position-absolute"
            style="bottom: -2px; right: 0px;"
          />
          <img
            src="../assets/images/gif/mushroom.gif"
            width="50px"
            class="position-absolute big-mushroom"
            style="bottom: -2px; right: 75px;"
          />
          <img
            src="../assets/images/gif/mushroom.gif"
            width="70px"
            class="position-absolute d-none d-sm-block"
            style="bottom: -2px; right: 125px;"
          />
          <img
            src="../assets/images/gif/mushroom.gif"
            width="50px"
            class="position-absolute d-none d-sm-block"
            style="bottom: -2px; right: 195px;"
          />
          <img
            src="../assets/images/gif/mushroom2.gif"
            width="70px"
            class="position-absolute"
            style="bottom: -2px; left: 75px;"
          />
          <img
            src="../assets/images/mary.png"
            width="70px"
            class="position-absolute"
            style="bottom: -2px; left: 0px;"
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
  name: "Footer",
  components: {
    Tiles
  }
};
</script>

<style scoped lang="scss">
footer {
  .big-mushroom {
    @media (max-width: 576px) {
      width: 70px;
    }
  }
}
</style>
