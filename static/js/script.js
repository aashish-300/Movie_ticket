window.onload = async () => {
  ReservedSeat.forEach((e, index) => {
    let seatReserved = e.getAttribute("data-value");
    if (bookedSeatNum.includes(Number(seatReserved))) {
      e.classList.remove("selected");
      e.classList.add("reserved");
      console.log("booked");
    }
  });

  // var btn = document.getElementById("bookTicket");
  // btn.onclick = function () {
  //   // minimum transaction amount must be 10, i.e 1000 in paisa.
  //   checkout.show({ amount: 1000 });
  // };
  // const seats = document.querySelectorAll(".seat:not(.reserved)");
};
const ReservedSeat = document.querySelectorAll(".seat");
const seats = document.querySelectorAll(".seat:not(.reserved)");
const movie = document.getElementById("movie");
const bookTicket = document.getElementById("bookTicket");
const buyTicket = document.getElementById("buyTicket");

let bookedSeatNum = [1, 2, 3];
let bookedSeat = [];

const ticketPrice = 100;
let movieName;
let seatSelectedNumber = [];
let totalPrice;
let totalSeatCount;
let seatSelected;
let seatNumber;

seats.forEach((e) => {
  e.addEventListener("click", (event) => {
    if (!e.classList.contains("reserved")) {
      console.log(e);
      e.classList.toggle("selected");
      seatNumber = e.getAttribute("data-value");

      seatSelectedNumber.push(Number(seatNumber));
      seatSelected = document.querySelectorAll(".selected");
      totalSeatCount = seatSelected.length;
      totalPrice = ticketPrice * totalSeatCount;
      document.getElementById("count").innerHTML = totalSeatCount;
      document.getElementById("amount").innerHTML = totalPrice;
    }
  });
});

movie.addEventListener("change", (e) => {
  console.log("changed");
  console.log(movie.value);
  movieName = movie.value;
  console.log(movieName);
});

const postSeat = async () => {
  let config = {
    // replace the publicKey with yours
    publicKey: "test_public_key_324aa259e74742f496ae5c707c388b98",
    productIdentity: "1234567890",
    productName: "Dragon",
    productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
  };

  movieName = movie.value;
  var checkout = new KhaltiCheckout(config);
  console.log("checkout");
  console.log(checkout);
  checkout.show({ amount: 1000 });
  const { data } = await axios.post("http://localhost:8000/movies/ticket", {
    movieName,
    totalPrice,
    ticketPrice,
    totalSeatCount,
    seatSelectedNumber,
  });

  console.log(data);
  // buyTicket.href("/");
};
