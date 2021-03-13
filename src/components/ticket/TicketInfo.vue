<template>
  <div class="ticket-info">
    <div class="ticket-info__top">{{ data.top }}</div>
    <div class="ticket-info__bott">{{ data.bott }}</div>
  </div>
</template>

<script>
export default {
  name: "TicketInfo",
  props: {
    data: {
      type: Object,
      default: () => ({
        top: "MOW - HKT",
        bott: "10:45 - 00:50"
      })
    }
  }
};
</script>

<style scoped lang="scss">
.ticket-info {
  width: 33.3333%;
  text-align: left;
  font-weight: 600;

  &__top {
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #a0b0b9;
  }

  &__bott {
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;
    color: #4a4a4a;
  }
}
</style>
