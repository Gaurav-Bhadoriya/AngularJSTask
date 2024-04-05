function showSignUpForm() {
    console.log("Sign Up")
    document.querySelector(".login-form-container").style.cssText = "display: none;";
    document.querySelector(".signup-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    document.querySelector("#registrationLink").style.display = "none";
    document.querySelector("#loginLink").style.display = "block";
}

function showSignInForm() {
    document.querySelector(".signup-form-container").style.cssText = "display: none;";
    document.querySelector(".login-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
    document.querySelector("#loginLink").style.display = "none";
    document.querySelector("#registrationLink").style.display = "block";
}

// Determine which link to display based on initial form visibility
if (document.querySelector(".signup-form-container").style.display === "block") {
    document.querySelector("#loginLink").style.display = "block"; // Show login link
}


function showSignUpForm() {
    console.log("Sign Up")
    document.querySelector(".login-form-container").style.cssText = "display: none;";
    document.querySelector(".signup-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    document.querySelector("#registrationLink").style.display = "none";
    document.querySelector("#loginLink").style.display = "block";
}

function showSignInForm() {
    document.querySelector(".signup-form-container").style.cssText = "display: none;";
    document.querySelector(".login-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
    document.querySelector("#loginLink").style.display = "none";
    document.querySelector("#registrationLink").style.display = "block";
}


// Determine which link to display based on initial form visibility
if (document.querySelector(".signup-form-container").style.display === "block") {
    document.querySelector("#loginLink").style.display = "block"; // Show login link
} else {
   
}
