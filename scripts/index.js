// debugger;
const viewMoreBtn = document.getElementById("view-more").children[0];
const extraCards = document.getElementsByClassName("card-set-2");

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

const cardSet = document.getElementsByClassName("card-set");
console.log(cardSet);
for(let i=0; i < 8; i++){
  let query = cardSet[i].id.split("-")[0];
  console.log(query);
  cardSet[i].onclick = () => {
    window.location.href = `list.html?city=${query}`;
  }
  cardSet[i].style.cursor = "pointer";
}

