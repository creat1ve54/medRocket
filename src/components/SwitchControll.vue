<template>
  <div class="switch">
    <label v-for="(item, index) in source" :key="index">
      <input
        type="radio"
        :value="item.name"
        name="switch"
        :checked="item.checked"
        @change="() => changeSwitchFunc(item)"
      />
      <span>{{ item.name }}</span>
    </label>
  </div>
</template>
<script>
export default {
  name: "SwitchControll",
  props: {
    source: {
      type: Array,
    },
  },
  methods: {
    changeSwitchFunc(item) {
      this.$emit("changeSwitch", item);
    },
  },
};
</script>
<style scoped lang="scss">
.switch {
  display: flex;
  width: 100%;

  label {
    width: 100%;
  }

  span {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  input {
    position: absolute;
    opacity: 0;
    visibility: hidden;

    &:checked {
      & ~ span {
        background-color: $Hover;
        border-radius: 16px;
        color: $Six;
      }
    }
  }
}
</style>
