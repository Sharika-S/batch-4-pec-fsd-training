// Mobile Menu

function toggleMenu() {

    const navLinks = document.querySelector(".nav-links");

    navLinks.classList.toggle("active");

}


// Event Registration Button

function registerEvent(eventName) {

    document.getElementById("event").value = eventName;

    document.getElementById("registration").scrollIntoView({
        behavior: "smooth"
    });

}


// Registration Form

const registrationForm =
    document.getElementById("registrationForm");


registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const selectedEvent =
        document.getElementById("event").value;


    alert(
        "Thank you " +
        name +
        "! Your registration for " +
        selectedEvent +
        " has been submitted successfully."
    );


    registrationForm.reset();

});