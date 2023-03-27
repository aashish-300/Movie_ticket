const movieDate = document.getElementById("movieDate");
const bookTicket = document.getElementById("BookTicket");

let date;
console.log(movieDate);
movieDate.addEventListener("change", () => {
  console.log(movieDate);
  date = movieDate.value;
  let currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate);
  if (currentDate > date) {
    alert("invalid movie date");
  }
});

const BookTicketfunc = () => {
    console.log("inside bok tickt");
    console.log(date);
    const { data } =  axios.post("localhost:8000/movie/ticket/date", {
      date});
    console.log(data);
};
