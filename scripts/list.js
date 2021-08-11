
console.log(window.location.href.split("?")[1].split("=")[1]);
let searchItem = window.location.href.split("?")[1].split("=")[1];

const listViewContent = document.getElementById("list-view");

const request = new XMLHttpRequest();

let url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${searchItem}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`;

request.open("GET", url);
request.setRequestHeader("x-rapidapi-key", "363d392d78msh20026b413316ea3p17ba45jsn1dd4c8599979");
request.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");

let hotelOutput
let hotelArray;
let locationId;
let hotelData;
request.onreadystatechange = () =>{
	if(request.readyState == 4){
		if(request.status == 200){
			hotelOutput = JSON.parse(request.responseText);
			console.log(hotelOutput);
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


function getHotels(hotel, location){
	listViewContent.innerHTML += 
		`<div class="hotel-card" id = "${location}-card">
		<div>
			<img src = ${hotel.result_object.photo.images.large.url} alt = "${hotel.result_object.name}">
		</div>
		<div class="hotel-desc">
			<h3>${hotel.result_object.name}</h3>
			<p>Rating : ${hotel.result_object.rating}</p>
			<p>${hotel.result_object.address}</p>
		</div>
		</div>`;
}


function hotelClick(){	
	let hotelCards = document.getElementsByClassName("hotel-card");
	console.log(hotelCards)
	for(let j = 0; j < hotelCards.length; j++){
		console.log(hotelCards[j])
		hotelCards[j].style.cursor = "pointer";
		hotelCards[j].addEventListener("click", ()=>{
			let hotelId = hotelCards[j].id.split("-")[0];
			console.log(hotelId);
			window.location.href = `detail.html?id=${hotelId}`;
		})
	}
}
