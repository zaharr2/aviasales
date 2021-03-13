<template>
  <div id="app">
    <div class="logo-wrap">
      <img class="logo" alt="Vue logo" src="./assets/logo.svg" />
    </div>
    <main class="container">
      <Filters @applyFilters="filters = $event" />
      <div class="column">
        <Sorting @applySort="sortBy = $event" />
        <div class="tickets">
          <Ticket
            v-for="(ticket, index) in filteredTickets.slice(
              0,
              this.ticketsPerPage
            )"
            :key="`ticket-${index}`"
            :ticket="ticket"
          />
        </div>
        <button @click="showMore" class="show-more-btn">
          Показать еще 5 билетов!
        </button>
      </div>
      <transition name="visibility">
        <div
          class="error-msg"
          v-show="httpErrorMessage"
          v-html="httpErrorMessage"
        ></div>
      </transition>
    </main>
  </div>
</template>

<script>
import Ticket from "@/utils/ticket";
import sortby from "lodash.sortby";

export default {
  name: "App",
  components: {
    Filters: () => import("@/components/Filters"),
    Sorting: () => import("@/components/Sorting"),
    Ticket: () => import("@/components/ticket/Ticket")
  },
  data: () => ({
    isAllTicketsLoaded: false,
    isLoading: false,
    httpErrorMessage: "",
    ticketsPerPage: 5,
    searchId: null,
    sortBy: null,
    tickets: [],
    filters: []
  }),
  computed: {
    filteredTickets() {
      let filteredTickets;

      if (this.filters.length && Number.isInteger(this.filters[0])) {
        filteredTickets = this.tickets.filter(({ stops }) => {
          return this.filters.includes(stops);
        });
      } else {
        filteredTickets = this.tickets;
      }

      if (this.sortBy) {
        let sortByArg;

        switch (this.sortBy) {
          case "price":
            sortByArg = "price";
            break;
          case "duration":
            sortByArg = "duration";
            break;
          case "optimal":
            sortByArg = "optimal";
            break;
        }

        filteredTickets = sortby(filteredTickets, sortByArg);
      }

      return filteredTickets;
    }
  },
  async beforeMount() {
    await this.getSearchId();
    if (!this.isAllTicketsLoaded) await this.getTickets();
  },
  methods: {
    showMore() {
      this.ticketsPerPage += 5;

      if (
        !this.isAllTicketsLoaded &&
        this.ticketsPerPage >= this.tickets.length
      ) {
        this.getTickets();
      }
    },
    async getSearchId() {
      try {
        this.isLoading = true;
        const response = await fetch(
          "https://front-test.beta.aviasales.ru/search"
        );

        if (response.status === 200) {
          const { searchId } = await response.json();
          this.searchId = searchId;
        } else {
          throw new Error(
            `${response.status}<br/>SERVER ERROR<br/>Something went wrong`
          );
        }
      } catch (error) {
        this.httpErrorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async getTickets() {
      try {
        this.isLoading = true;
        const response = await fetch(
          `https://front-test.beta.aviasales.ru/tickets?searchId=${this.searchId}`
        );

        if (response.status === 200) {
          const { tickets, stop } = await response.json();
          this.tickets = tickets.map(ticket => new Ticket(ticket));
          this.isAllTicketsLoaded = stop;
        } else {
          throw new Error(
            `${response.status}<br/>SERVER ERROR<br/>Something went wrong`
          );
        }
      } catch (error) {
        this.httpErrorMessage = error.message;

        setTimeout(() => {
          this.httpErrorMessage = "";
        }, 5000);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "styles/main";

#app {
  background: #f3f7fa;
  font-family: Open Sans;
  min-height: 100vh;
  padding-bottom: 50px;
}

.logo-wrap {
  padding: 50px 0 40px;
}

.logo {
  margin: 0 auto;
}

.container {
  display: flex;
  width: 100%;
  max-width: 754px;
  margin: 0 auto;
}

.tickets {
  min-width: 502px;
}

.error-msg {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 200px;
  height: 100px;
  color: white;
  background: red;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.show-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background: #2196f3;
  margin-top: 20px;
  border-radius: 5px;
  outline: none;
  border: 0;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffffff;
}
</style>
