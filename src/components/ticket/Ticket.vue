<template>
  <div class="ticket">
    <div class="ticket__info-wrap">
      <div class="ticket__price">{{ ticket.price | addSpaces }} P</div>
      <div class="ticket__img-wrap">
        <img
          class="ticket__img"
          :src="`https://pics.avs.io/99/36/${ticket.carrier}.png`"
          :alt="ticket.carrier"
        />
      </div>
    </div>
    <div class="ticket__info-wrap">
      <TicketInfo :data="ticket.to.destination" />
      <TicketInfo :data="ticket.to.duration" />
      <TicketInfo :data="ticket.to.stops" />
    </div>
    <div class="ticket__info-wrap">
      <TicketInfo :data="ticket.from.destination" />
      <TicketInfo :data="ticket.from.duration" />
      <TicketInfo :data="ticket.from.stops" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Ticket",
  components: {
    TicketInfo: () => import("@/components/ticket/TicketInfo")
  },
  props: {
    ticket: {
      type: Object,
      default: () => ({})
    }
  },
  filters: {
    addSpaces(value) {
      if (!value) return "";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }
};
</script>

<style scoped lang="scss">
.ticket {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 502px;
  height: 184px;
  padding: 20px;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }

  &__info-wrap {
    display: flex;
    align-items: center;

    &:first-of-type {
      justify-content: space-between;
      margin-bottom: 20px;
    }

    &:last-of-type {
      margin-top: 10px;
    }
  }

  &__price {
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #2196f3;
  }
}
</style>
