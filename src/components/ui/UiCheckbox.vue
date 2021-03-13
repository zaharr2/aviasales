<template>
  <div @click="$emit('change', item)" class="checkbox">
    <div
      class="checkbox__checkmark-wrap"
      :class="{ 'checkbox__checkmark-wrap--checked': item.checked }"
    >
      <svg
        v-if="item.checked"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z"
          fill="#2196F3"
        />
      </svg>
    </div>
    <span class="checkbox__label">{{ item.label }}</span>
  </div>
</template>

<script>
export default {
  name: "UiCheckbox",
  props: {
    item: {
      type: Object,
      default: () => ({
        label: "",
        value: null,
        checked: false
      })
    }
  }
};
</script>

<style scoped lang="scss">
.checkbox {
  height: 40px;
  width: 232px;
  display: flex;
  align-items: center;
  padding-left: 20px;

  &:hover {
    background: #f1fcff;
    cursor: pointer;
  }

  &__checkmark-wrap {
    width: 20px;
    height: 20px;
    border: 1px solid #9abbce;
    box-sizing: border-box;
    border-radius: 2px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &--checked {
      border-color: #2196f3;
    }
  }

  &__label {
    font-size: 13px;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: #4a4a4a;
  }
}
</style>
