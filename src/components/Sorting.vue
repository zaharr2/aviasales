<template>
  <div class="sorting">
    <div
      v-for="(sort, index) in sorting"
      :key="sort.value"
      @click="selectSorting(index)"
      :class="{ 'sorting__item--checked': sort.checked }"
      class="sorting__item"
    >
      {{ sort.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Sorting",
  data: () => ({
    sorting: [
      {
        label: "Самый дешевый",
        value: "price",
        checked: false
      },
      {
        label: "Самый быстрый",
        value: "duration",
        checked: false
      },
      {
        label: "Оптимальный",
        value: "optimal",
        checked: false
      }
    ],
    activeIndex: null
  }),
  methods: {
    selectSorting(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
        this.sorting[index].checked = false;

        this.$emit("applySort", null);
      } else {
        this.activeIndex = index;
        this.sorting.forEach(sort => (sort.checked = false));
        this.sorting[index].checked = true;

        this.$emit("applySort", this.sorting[index].value);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.sorting {
  background: #ffffff;
  height: 50px;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  &__item {
    width: 33.333%;
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.5px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dfe5ec;
    box-sizing: border-box;

    &:first-of-type {
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    &:last-of-type {
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    }

    &:not(:first-of-type) {
      border-left-width: 0;
    }

    &--checked,
    &:hover {
      background: #2196f3;
      border-color: #2196f3;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
