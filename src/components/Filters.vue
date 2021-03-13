<template>
  <div class="filters">
    <div class="filters__title">
      <span>Количество пересадок</span>
    </div>
    <UiCheckbox
      v-for="(filter, index) in filters"
      :key="filter.label"
      :item="filter"
      @change="applyFilters(index)"
    />
  </div>
</template>

<script>
import UiCheckbox from "@/components/ui/UiCheckbox";

export default {
  name: "Filters",
  components: {
    UiCheckbox
  },
  data: () => ({
    filters: [
      {
        label: "Все",
        value: null,
        checked: false
      },
      {
        label: "Без пересадок",
        value: 0,
        checked: false
      },
      {
        label: "1 пересадка",
        value: 1,
        checked: false
      },
      {
        label: "2 пересадки",
        value: 2,
        checked: false
      },
      {
        label: "3 пересадки",
        value: 3,
        checked: false
      }
    ]
  }),
  methods: {
    applyFilters(index) {
      if (index) {
        this.filters[index].checked = !this.filters[index].checked;

        if (
          this.filters[0].checked &&
          this.filters.some(({ checked }) => !checked)
        ) {
          this.filters[0].checked = false;
        }

        if (this.filters.slice(1).every(({ checked }) => checked)) {
          this.filters[0].checked = true;
        }
      } else {
        if (this.filters[0].checked) {
          this.filters.forEach(filter => {
            filter.checked = false;
          });
        } else {
          this.filters.forEach(filter => {
            filter.checked = true;
          });
        }
      }

      this.$emit(
        "applyFilters",
        this.filters.filter(({ checked }) => checked).map(({ value }) => value)
      );
    }
  }
};
</script>

<style scoped lang="scss">
.filters {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px 0 10px;
  margin-right: 20px;
  width: 232px;
  height: fit-content;

  &__title {
    padding-left: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
}
</style>
