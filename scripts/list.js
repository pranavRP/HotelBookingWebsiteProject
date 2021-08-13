// Getting the search item from the url
let searchItem = window.location.href.split("?")[1].split("=")[1];

const listViewContent = document.getElementById("list-view");

const request = new XMLHttpRequest();
let url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${searchItem}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`;
request.open("GET", url);
request.setRequestHeader("x-rapidapi-key", "4b17b0ece2mshac4301c5936bacfp1c8494jsnb8ddc6ca0beb");
request.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");

let hotelOutput; // Hotel list returned by the Travel Advisor API
let locationId;
let hotelData;
request.onreadystatechange = () =>{
	if(request.readyState == 4){
		if(request.status == 200){
			hotelOutput = JSON.parse(request.responseText);
			for(let i = 1; i < hotelOutput.data.length; i++){
				if(hotelOutput.data[i].result_type ==="lodging"){
					locationId = hotelOutput.data[i].result_object.location_id;
					hotelData = hotelOutput.data[i];
					getHotels(hotelData, locationId);
				}
			}
			hotelClick();
		}
	}
}
request.send();

// Populating the list-view with hotels
function getHotels(hotel, location){
	if(hotel.result_object.hasOwnProperty("photo") && hotel.result_object.hasOwnProperty("rating")) {
		listViewContent.innerHTML += 
			`<div class="hotel-card" id = "${location}-card">
			<div>
				<img src = ${hotel.result_object.photo.images.large.url} alt = ${hotel.result_object.name}>
			</div>
			<div class="hotel-desc">
				<h3>${hotel.result_object.name}</h3>
				<p>Rating : ${hotel.result_object.rating}</p>
				<p>${hotel.result_object.address}</p>
			</div>
			</div>`;
	}
}

// To direct the user to the hotel details by clicking on the hotel card
function hotelClick(){	
	let hotelCards = document.getElementsByClassName("hotel-card");
	for(let j = 0; j < hotelCards.length; j++){
		hotelCards[j].style.cursor = "pointer";
		hotelCards[j].addEventListener("click", ()=>{
			let hotelId = hotelCards[j].id.split("-")[0];
			window.location.href = `detail.html?id=${hotelId}`;
		})
	}
}
