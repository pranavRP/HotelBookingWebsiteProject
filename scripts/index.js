const viewMoreBtn = document.getElementById("view-more").children[0]; //View more button
const extraCards = document.getElementsByClassName("card-set-2"); // City card set in the second row

//Function when the "View more" button is clicked
viewMoreBtn.addEventListener("click", () => {
  if(viewMoreBtn.value == "1"){
    viewMoreBtn.value = "0";
    viewMoreBtn.innerText = "View less >>";
    cardsToggle(viewMoreBtn.value);
  } else{
    viewMoreBtn.value = "1";
    viewMoreBtn.innerText = "View more >>";
    cardsToggle(viewMoreBtn.value);
  }
});

// Function to toggle display of cards
const cardsToggle = (value) => {
  if(value === "1"){
    for(let i = 0; i < extraCards.length; i++){
      extraCards[i].style.display="none";
    }
  } else{
    for(let i = 0; i < extraCards.length; i++){
      extraCards[i].style.display="block";
    }
  }
}

// To make all the city cards clickable
const cardSet = document.getElementsByClassName("card-set");
for(let i=0; i < 8; i++){
  let query = cardSet[i].id.split("-")[0];
  cardSet[i].onclick = () => {
    window.location.href = `list.html?city=${query}`;
  }
  cardSet[i].style.cursor = "pointer";
}

let searchQuery; // City inputted by the user to be searched
let searchCityOutputs; // City suggestion from the Travel Advisor API

const cityInput = document.getElementById("city");
const searchbarEl = document.getElementById("search-bar");
const searchOptionsList = document.getElementById("search-options-list");

// When the user enter more than three characters of a city to be searched
cityInput.addEventListener("input", () => {
  if(cityInput.value.length >=3){
    searchQuery = cityInput.value.toLowerCase();
    let searchCityRequest = new XMLHttpRequest();
    let searchCityUrl = `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${searchQuery}`;
    searchCityRequest.open("GET", searchCityUrl);
    searchCityRequest.setRequestHeader("x-rapidapi-key", "4b17b0ece2mshac4301c5936bacfp1c8494jsnb8ddc6ca0beb");
    searchCityRequest.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    searchCityRequest.onreadystatechange = () => {
      if(searchCityRequest.readyState == 4) {
        if(searchCityRequest.status == 200){
          searchCityOutputs = JSON.parse(searchCityRequest.responseText);
          showOptions(searchCityOutputs.data)
        }
      }
    }
    searchCityRequest.send();
  }
})

// To show city suggestions
function showOptions(cityCode){
  searchOptionsList.innerHTML = "";
  for(let i = 0; i < cityCode.length; i++){
    if(cityCode[i].result_type === "geos"){
      let tempurl = `list.html?city=${cityCode[i].result_object.name}`;
      searchOptionsList.innerHTML += 
        `<a href=${tempurl}><div class="search-options">${cityCode[i].result_object.name}</div><a>`;
    }
  }
}

// To remove city suggestions when user clicks outside
window.addEventListener("click", () => {
  searchOptionsList.innerHTML = "";
})