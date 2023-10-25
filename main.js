// console.log("Script baglandi")

const container = document.querySelector(".container");
//console.log(container)

const infoText = document.querySelector(".infoText");
//console.log(infoText)

const movie = document.getElementById("movie");
//console.log(movie)

const seats = document.querySelectorAll(".seat:not(.reserved)");
//console.log(seats)

const getSeatsDataFromDatabase = () => {
  const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
  //console.log(dbSelectedMovie)

  if (dbSelectedMovie) {
    movie.selectedIndex = dbSelectedMovie;
  }

  const dbSelectSeats = JSON.parse(localStorage.getItem("selectedIndex"));

  //console.log(dbSelectSeats)
  if (dbSelectSeats !== null && dbSelectSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
};

const saveToDatabase = (seatIndexData) => {
  localStorage.setItem("selectedIndex", JSON.stringify(seatIndexData));
  localStorage.setItem("movieIndex", JSON.stringify(movie.selectedIndex));
};

getSeatsDataFromDatabase();

const calculateTotal = () => {
  const selectedSeats = container.querySelectorAll(".seat.selected");
  //console.log(selectedSeats)

  const allSeatsArray = [];
  const allSelectedSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });

  //console.log(allSeatsArray)

  selectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });

  //console.log(allSelectedSeatsArray)

  let selectedIndexs = allSelectedSeatsArray.map((allSelectedSeat) => {
    return allSeatsArray.indexOf(allSelectedSeat);
  });
  //console.log(selectedIndexs)

  //console.log(movie.value)

  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
  //console.log(selectedSeatsCount)

  if (selectedSeatsCount > 0) {
    infoText.style.display = "block";
  } else {
    infoText.style.display = "none";
  }

  let price = movie.value;
  //console.log(price)

  let total = price * selectedSeatsCount;
  //console.log(total)

  infoText.innerHTML = `
   <span>${selectedSeatsCount}</span> Total Price<span>${total}</span>TL
   `;

  saveToDatabase(selectedIndexs);
};
calculateTotal();

container.addEventListener("click", (mouseEvent) => {
  if (
    mouseEvent.target.offsetParent.classList.contains("seat") &&
    !mouseEvent.target.offsetParent.classList.contains("reserved")
  ) {
    mouseEvent.target.offsetParent.classList.toggle("selected");

    calculateTotal();
  }
});

movie.addEventListener("change", () => {
  calculateTotal();
});

