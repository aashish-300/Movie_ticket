window.onload = async () => {
  ReservedSeat.forEach((e, index) => {
    let seatReserved = e.getAttribute("data-value");
    if (bookedSeatNum.includes(Number(seatReserved))) {
      e.classList.remove("selected");
      e.classList.add("reserved");
      console.log("booked");
    }
  });
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
  movieName = movie.value;
  const { data } = await axios.post("http://localhost:8000/movies/ticket", {
    movieName,
    totalPrice,
    ticketPrice,
    totalSeatCount,
    seatSelectedNumber,
  });

  console.log(data);
  buyTicket.href("/");
};
