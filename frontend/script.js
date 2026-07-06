// Open Login Popup
function openLogin() {
    document.getElementById("loginPopup").style.display = "flex";
}

// Close Login Popup
function closeLogin() {
    document.getElementById("loginPopup").style.display = "none";
}

// Login Function
async function loginUser() {

    const username = document.querySelector(".login-box input[type='text']").value;
    const password = document.querySelector(".login-box input[type='password']").value;

    const response = await fetch("http://13.126.10.22:5001/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            password
        })

    });

    const data = await response.json();

    if (data.success) {

        alert(data.message);

        closeLogin();

        document.getElementById("loginBtn").innerHTML = "Welcome, " + username;

        document.getElementById("loginBtn").disabled = true;

    } else {

        alert(data.message);

    }

}
// Explore Movies
function scrollMovies(){

document.getElementById("movies").scrollIntoView({
behavior:"smooth"
});

}

// Book Movie
function bookMovie(movie){

alert("Ticket Booked Successfully for "+movie);

}

// Book Event
function bookEvent(eventName){

alert("Event Booked Successfully : "+eventName);

}

// Search Movies
const searchBox=document.getElementById("searchBox");

searchBox.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

let cards=document.querySelectorAll(".movie-card");

cards.forEach(card=>{

let movie=card.querySelector("h3").innerText.toLowerCase();

if(movie.includes(value))
card.style.display="block";
else
card.style.display="none";

});

});
// Load Movies from Movie Service

async function loadMovies() {

    const response = await fetch("http:13.126.10.22:5002/movies");

    const movies = await response.json();

    const container = document.getElementById("movieContainer");

    container.innerHTML = "";

    movies.forEach(movie => {

        container.innerHTML += `

        <div class="movie-card">

            <img src="${movie.image}">

            <h3>${movie.name}</h3>

            <p>${movie.language}</p>

            <h4>⭐ ${movie.rating}</h4>

            <button onclick="bookMovie('${movie.name}')">
                Book Ticket
            </button>

        </div>

        `;

    });

}

loadMovies();

async function bookMovie(movieName) {

    const username = prompt("Enter your username");

    if (!username) {
        return;
    }

    const confirmPayment = confirm(
        `Movie: ${movieName}\nTicket Price: ₹250\n\nProceed to Payment?`
    );

    if (!confirmPayment) {
        return;
    }

    // Booking Request
    await fetch("http://13.126.10.22:5003/book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            movie: movieName
        })
    });

    // Payment Request
    const payment = await fetch("http://13.126.10.22:5004/pay", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            movie: movieName,
            amount: 250
        })
    });

    const data = await payment.json();

    if (data.success) {

        alert("🎉 Ticket Booked Successfully!\n\nPayment Successful!");

    } else {

        alert("Payment Failed");

    }

}
