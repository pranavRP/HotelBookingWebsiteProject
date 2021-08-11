const paynowBtn = document.getElementById("paynow-btn");

paynowBtn.onclick = () => {
  location.href = "payment.html";
}

const paynowBtnToggle = () => {
  if(localStorage.getItem("Login") === "true"){
    paynowBtn.disabled = false;
  } else{
    paynowBtn.disabled = true;
  } 
}

paynowBtnToggle();
loginBtn.addEventListener("click", () =>{
  setTimeout(paynowBtnToggle, 1000);
})

headerLogin.addEventListener("click" , ()=> {setTimeout(paynowBtnToggle, 1000)});



// ...........................................

const adultDetail = document.getElementById("adults-detail")
const nameDetail = document.getElementById("name-detail")
const checkinDetail = document.getElementById("checkin-detail")
const checkoutDetail = document.getElementById("checkout-detail")
const tariffDetail = document.getElementById("tariff-detail")
const totalDetail = document.getElementById("total-detail")

adultDetail.innerText = sessionStorage.getItem("adults")
nameDetail.innerText = sessionStorage.getItem("name")
checkinDetail.innerText = sessionStorage.getItem("checkin")
checkoutDetail.innerText = sessionStorage.getItem("checkout")
tariffDetail.innerText = `Rs. 1000 x ${sessionStorage.getItem("adults")} adults x ${sessionStorage.getItem("nights")} nights`;
totalDetail.innerText = sessionStorage.getItem("total")

let paymentItem = sessionStorage.getItem("hotelId");

let paymentRequest = new XMLHttpRequest();
let paymentUrl = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${paymentItem}`;
paymentRequest.open("GET", paymentUrl);
paymentRequest.setRequestHeader("x-rapidapi-key", "363d392d78msh20026b413316ea3p17ba45jsn1dd4c8599979");
paymentRequest.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
paymentRequest.onreadystatechange = () => {
  if(paymentRequest.readyState == 4){
    if(paymentRequest.status == 200){
      let paymentOutput = JSON.parse(paymentRequest.responseText);
      console.log(paymentOutput);
      updatepaymentHotel(paymentOutput);
    }
  }
}
paymentRequest.send();

function updatepaymentHotel(hotel){
  document.getElementById("payment-hotel").innerHTML = 
  `<img class = "payment-img" src = ${hotel.data[0].photo.images.large.url} alt = ${hotel.data[0].name}>
  <div>
    <h2>${hotel.data[0].name}</h2>
    <span>${hotel.data[0].ranking}</span>
    <span>${hotel.data[0].address}</span>
  </div>`
}