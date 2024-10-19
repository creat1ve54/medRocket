<template>
  <div class="accordion">
    <slot name="header"></slot>
    <div class="accordion__container">
      <div class="accordion__container-animation">
        <div class="accordion__container-animation-wrapper">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AccordionItem",
};
</script>
<style scoped lang="scss">
.accordion {
  &__title {
    cursor: pointer;

    &:has(.accordion__checkbox:checked) ~ .accordion__container {
      grid-template-rows: 1fr;
    }

    &:has(.accordion__checkbox:checked)
      ~ .accordion__container
      .accordion__container-animation-wrapper {
      transform: translateY(0);
      visibility: visible;
      transition: all 0.3s ease-in-out;
    }

    span {
      display: flex;
      align-items: center;
      gap: 24px;
    }
  }

  &__checkbox {
    display: none;
  }

  &__container {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &-animation {
      min-height: 0;

      &-wrapper {
        transform: translateY(-100%);
        visibility: hidden;
        transition: all 0.3s ease-in-out;
      }
    }
  }

  &--active {
    .accordion {
      &__container {
        transition: all 0.3s ease-in-out;
      }
    }
  }
}
</style>
