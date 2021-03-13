import moment from "moment";

const dateShaper = (date, duration) => {
  return `${moment(date).format("HH:MM")} - ${moment(date)
    .add(duration, "m")
    .format("HH:MM")}`;
};

const durationShaper = duration => {
  let hours = duration / 60;
  let rhours = Math.floor(hours);
  let rminutes = Math.round((hours - rhours) * 60);
  return rhours + "ч " + rminutes + "м";
};

const numberOfTransfers = number => {
  if (!number) {
    return "Без пересадок";
  }

  const forms = ["Пересадка", "Пересадки", "Пересадок"];
  const n = Math.abs(number) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) {
    return `${number} ${forms[2]}`;
  }

  if (n1 > 1 && n1 < 5) {
    return `${number} ${forms[1]}`;
  }

  if (n1 === 1) {
    return `${number} ${forms[0]}`;
  }

  return `${number} ${forms[2]}`;
};

export default class Ticket {
  constructor({ price, carrier, segments }) {
    this.price = price;
    this.carrier = carrier;
    this.stops = segments[0].stops.length + segments[1].stops.length;
    this.duration = segments[0].duration + segments[1].duration;
    this.optimal = (segments[0].duration + segments[1].duration) / price;
    this.to = {
      destination: {
        top: `${segments[0].origin} - ${segments[0].destination}`,
        bott: dateShaper(segments[0].date, segments[0].duration)
      },
      duration: {
        top: "В пути",
        bott: durationShaper(segments[0].duration)
      },
      stops: {
        top: numberOfTransfers(segments[0].stops.length),
        bott: segments[0].stops.join(", ")
      }
    };
    this.from = {
      destination: {
        top: `${segments[1].origin} - ${segments[1].destination}`,
        bott: dateShaper(segments[1].date, segments[1].duration)
      },
      duration: {
        top: "В пути",
        bott: durationShaper(segments[1].duration)
      },
      stops: {
        top: numberOfTransfers(segments[1].stops.length),
        bott: segments[1].stops.join(", ")
      }
    };
  }
}
