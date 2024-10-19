<template>
  <div class="error" :class="{ 'error--row': rightText }">
    <img src="@/assets/images/error.png" alt="Ошибка" />
    <div>
      <h2 class="error__title">Сервер не отвечает</h2>
      <p class="error__text">Уже работаем над этим</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rightText: Boolean,
  },
};
</script>
<style scoped lang="scss">
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;

  img {
    width: max-content;
    margin-bottom: 32px;
  }

  &--row {
    flex-direction: row;
    gap: 24px;

    img {
      margin-bottom: 0;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 8px;
  }

  &__text {
    text-align: center;
    font-size: 18px;
    line-height: 130%;
    color: $Three;
  }
}
</style>
