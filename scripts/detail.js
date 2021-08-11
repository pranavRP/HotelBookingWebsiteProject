
let hotelItem = window.location.href.split("?")[1].split("=")[1];
console.log(hotelItem)

let detailRequest = new XMLHttpRequest();
let detailUrl = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelItem}`

detailRequest.open("GET", detailUrl );
detailRequest.setRequestHeader("x-rapidapi-key", "363d392d78msh20026b413316ea3p17ba45jsn1dd4c8599979");
detailRequest.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");

let hotelDetails
detailRequest.onreadystatechange = () => {
  if(detailRequest.readyState == 4){
    if(detailRequest.status == 200){
      hotelDetails = JSON.parse(detailRequest.responseText);
      console.log(hotelDetails);
      updateHotelDetails(hotelDetails);
      updateCarousal(hotelDetails);
    }
  }
}
detailRequest.send()

function updateHotelDetails(hotel){
  let hotelName = document.getElementById("description");
  let amenities = "";
  for(let i = 0; i < 8; i++){
    amenities += 
    `<li>${hotel.data[0].amenities[i].name}</li>`
  }
  hotelName.innerHTML = 
  `<h3 id="desc-name">${hotel.data[0].name}</h3>
  <h4 id="desc-rating">Rating : ${hotel.data[0].rating}</h4>
  <h4 id="desc-amenities">Amenities</h4>
  <ul>
    ${amenities}
  </ul>
  <h4 id="desc-description">Description</h4>
  <p>${hotel.data[0].description}</p>`;
}

function updateCarousal(hotel){
  let carousalRequest = new XMLHttpRequest();
  let carousalUrl = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${hotel.data[0].location_id}&limit=10`
  carousalRequest.open("GET", carousalUrl);
  carousalRequest.setRequestHeader("x-rapidapi-key", "363d392d78msh20026b413316ea3p17ba45jsn1dd4c8599979");
  carousalRequest.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
  carousalRequest.onreadystatechange = () =>{
    if(carousalRequest.readyState == 4){
      if(carousalRequest.status == 200){
        let carousalOutput = JSON.parse(carousalRequest.responseText);
        console.log(carousalOutput);
        let carousalDiv = document.getElementsByClassName("carousel-inner")[0];
        let carousalContent = "";
        for(let j = 0; j < carousalOutput.data.length; j++){
          console.log(carousalOutput.data[j].images.large)
          if(j === 0){
            carousalContent += 
              `<div class="carousel-item active">
              <img class="d-block detail-img" src=${carousalOutput.data[j].images.large.url}>
              </div>`
          } else{
            carousalContent += 
              `<div class="carousel-item">
              <img class="d-block detail-img" src=${carousalOutput.data[j].images.large.url}>
              </div>`
          }
        }
        carousalDiv.innerHTML = carousalContent;
      }
    }
  }
  carousalRequest.send();
}


const bookBtn = document.getElementById("book");
bookBtn.addEventListener("click", ()=> {
  sessionStorage.setItem("adults", document.getElementById("number-adults").value)
  sessionStorage.setItem("name", document.getElementById("name-book").value)
  sessionStorage.setItem("checkin", document.getElementById("checkin-date").value)
  sessionStorage.setItem("checkout", document.getElementById("checkout-date").value)
  sessionStorage.setItem("total", document.getElementById("total").value)
  sessionStorage.setItem("hotelId", hotelItem)
})


// <--------------------------------------------------->


const NoOfAdults = document.getElementById("number-adults");
const checkInDate = document.getElementById("checkin-date");
const checkOutDate = document.getElementById("checkout-date");
const totalField = document.getElementById("total");

const calculateTotal = (adults, start , end, cost = 1000) => {
  let startDate = start.value.split("-");
  let endDate = end.value.split("-");
  let days = parseInt(endDate[2] - startDate[2]);
  let months = parseInt(endDate[1] - startDate[1]);
  let years = parseInt(endDate[0] - startDate[0]);
  let date = new Date(parseInt(startDate[0]), parseInt(startDate[1]) - 1, parseInt(startDate[2]));
  date.setDate(date.getDate() + 1);
  if((date.getMonth() + 1) < 10 ){
    checkOutDate.min = date.getFullYear() + "-" + "0" + (date.getMonth() + 1) + "-" + date.getDate();
  }else{
    checkOutDate.min = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
  sessionStorage.setItem("nights", days + (months*30) + (years)*365);
  return cost * parseInt(adults.value) * (days + (months*30) + (years)*365);
}

const formEl = document.getElementById("detail-form");

formEl.addEventListener("input", () => {
  let totalCost = calculateTotal(NoOfAdults, checkInDate, checkOutDate);
  if(!isNaN(totalCost)){
    totalField.value = "Rs. " + totalCost;
  }
});
