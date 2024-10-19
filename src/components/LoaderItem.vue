<template>
  <div class="loader">
    <img src="@/assets/images/loader.gif" alt="Загрузка" />
  </div>
</template>
<script>
export default {
  name: "LoaderItem",
};
</script>
<style scoped lang="scss">
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
