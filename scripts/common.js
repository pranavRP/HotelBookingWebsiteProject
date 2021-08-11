// debugger;
const headerEl = document.getElementsByTagName('header')[0];
const footerEl = document.getElementsByTagName('footer')[0];


headerEl.innerHTML = 
`<a id="logo-link" href="index.html">
  <img id= "logo" src = "assests/images/logo.png" alt = "logo" height = "100" width = "150">
</a>
<button id="login" class="btn btn-light" data-toggle="modal" data-target="#loginModal">Login</button>`

footerEl.innerHTML = 
`<button id="contact" class="btn btn-info" data-toggle="modal" data-target="#contactModal">Contact us</button>
<div id="social">
  <a href = "https://www.facebook.com"><img src = "assests/images/facebook.png" alt="facebook" height = "20px" width = "20px"></a>
  <a href = "https://www.instagram.com"><img src = "assests/images/instagram.png" alt="instagram" height = "20px" width = "20px"></a>
  <a href = "https://twitter.com"><img src = "assests/images/twitter.png" alt="twitter" height = "20px" width = "20px"></a>
</div>
<div id="copyright">
  <p>&copy; 2021 HOTEL BOOKING PVT LTD</p>
</div>`

const loginEl = document.getElementById("loginModal");
loginEl.innerHTML = 
`  <div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title w-100 text-center">Login</h5>
    <buttom type="button" class="close" data-dismiss="modal" aria-label="close">
      <span aria-hidden="true">&times;</span>
    </buttom>
  </div>
  <div class="modal-body">
    <form id="login-form" action = "index.html">
      <div class="form-group">
        <label for ="email">Email Address</label>
          <input id="email" name="email" type="email" class="form-control" required placeholder="yourname@email.com" autocomplete="off">
      </div>
      <div class="form-group">
        <label for ="password" >Password</label>
        <input id="password" name="password" type="password" class="form-control" required  placeholder="*******" autocomplete="off">
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="remember">
        <label class="form-check-label" for="remember">Remember me</label>
      </div>
      <button id="login-btn" class="btn btn-primary btn-block rounded-pill" type="submit" name="submit" >Login</button>
    </form>
  </div>
</div>
</div>`;

const contactEl = document.getElementById("contactModal");
contactEl.innerHTML =
`<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title w-100 text-center">&#9993; Contact us &#9993;</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body border-bottom-0">
      <div class="text-center">
        <p>Thank you for reaching out to us!</p>
        <p>Our team will get in touch with you soon &#128515;</p>
      </div>
      <form id = "contact-form" action = "index.html">
        <div class="form-group">
          <label for = "name">Name</label>
          <input id ="name" class="form-control" type = "text" name = "name" required placeholder="Jose Markose">
        </div>
        <div class="form-group">
          <label for = "email-contact">Email</label>
          <input id ="email-contact" class="form-control" type = "email" name = "email" required placeholder="yourname@email.com">
        </div>
        <div class="form-group">
          <label for = "phone">Mobile</label>
          <input id ="phone" class="form-control" type ="text" name = "phone" required placeholder="(+91)__________">
        </div>
        <div class="text-center">
          <button class="btn btn-primary rounded-pill ml-auto mr-auto" type="submit" id="contact-btn" name="submit-contact">
            <span>Contact me</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>`;

const headerLogin = document.getElementById("login");
const loginEmail = document.getElementById("email");
const loginPass = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
let isLoggedIn = false;

loginBtn.addEventListener("click", ()=> {
  localStorage.setItem("Email", loginEmail.value);
  localStorage.setItem("Password", window.btoa(loginPass.value));
  isLoggedIn = true;
  localStorage.setItem("Login", "true");
  alert("Logged in");
  // confirm("Hello?")
  headerLogin.innerText = "Logout";


})

headerLogin.addEventListener("click", (event) => {
  // debugger;
  if(localStorage.getItem("Login") === "true"){
    headerLogin.innerText = "Login";
    // headerLogin.
    isLoggedIn = false;
    alert("Logged out")
    headerLogin.dataset.target = "";
    console.log(event)
    localStorage.removeItem("Email");
    localStorage.removeItem("Password");
    localStorage.setItem("Login", "false");
    location.reload()
  } else {
    headerLogin.dataset.target = "#loginModal";
    
  }
})

if(localStorage.getItem("Login") === "true"){
  headerLogin.innerText = "Logout";
  isLoggedIn = true;
  headerLogin.dataset.target = "";
} else {
  headerLogin.innerText = "Login";
  headerLogin.dataset.target = "#loginModal";
}