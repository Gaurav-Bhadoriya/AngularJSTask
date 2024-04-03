var contactApplication = angular.module('contactApplication', []);

// Authentication Controller
contactApplication.controller('authController', function($scope, $window) {
    // Initialize scope variables
    $scope.showLoginForm = true;
    $scope.showSignUpForm = false;
    $scope.users = JSON.parse(localStorage.getItem('users')) || [];
    $scope.loggedInUser = null; // To keep track of the currently logged in user

// Inside the authController
$scope.signup = function() {
    var user = {
        username: $scope.signupUsername,
        email: $scope.signupEmail,
        password: $scope.signupPassword,
        contacts: [] // Initialize an empty array for contacts
    };

    $scope.users.push(user);
    localStorage.setItem('users', JSON.stringify($scope.users));

    console.log('Sign Up Success');
    $scope.signupUsername = '';
    $scope.signupEmail = '';
    $scope.signupPassword = '';
    $window.location.href = 'index.html'; // Redirect to login page after signup
};

// Inside the authController

$scope.login = function() {
    var email = $scope.loginEmail;
    var password = $scope.loginPassword;

    var authenticatedUser = $scope.users.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (authenticatedUser) {
        console.log("Login successful. Redirecting...");
        $window.localStorage.setItem('currentUser', JSON.stringify(authenticatedUser)); // Store current user in local storage
        $window.location.href = 'test.html'; // Redirect to contact list page
    } else {
        console.log("Login failed. Invalid email or password.");
        alert("Invalid email or password");
    }

    $scope.loginEmail = '';
    $scope.loginPassword = '';
};



$scope.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));

// Ensure currentUser contains contacts array
if ($scope.currentUser && $scope.currentUser.contacts) {
    $scope.contacts = $scope.currentUser.contacts; // Populate contacts list with current user's contacts
} else {
    $scope.contacts = []; // If currentUser or contacts array is missing, initialize an empty array
}

// Function to handle user logout
$scope.logout = function() {
    // Clear the currently logged in user
    // $window.localStorage.removeItem('currentUser');
    // Redirect to login page
    $window.location.href = 'index.html';
};


// Logout function
// $scope.logout = function() {
//     $window.localStorage.removeItem('currentUser'); // Remove current user from local storage
//     $window.location.href = 'index.html'; // Redirect to login page after logout
//  };




    // Function to show signup form
    $scope.showSignUp = function() {
        $scope.showLoginForm = false;
        $scope.showSignUpForm = true;
    };

    // Function to show login form
    $scope.showSignIn = function() {
        $scope.showSignUpForm = false;
        $scope.showLoginForm = true;
    };
});


// // Ensure AngularJS is loaded before executing this script

// // Define the contactApplication module
// var contactApplication = angular.module('contactApplication', []);

// // Define the authController controller
// contactApplication.controller('authController', function($scope, $window) {
//     // Initialize scope variables
//     $scope.showLoginForm = true;
//     $scope.showSignUpForm = false;
//     $scope.users = JSON.parse(localStorage.getItem('users')) || [];
//     $scope.loggedInUser = null; // To keep track of the currently logged in user

//     // Function to handle user signup
//     $scope.signup = function() {
//         // Create a new user object
//         var user = {
//             username: $scope.signupUsername,
//             email: $scope.signupEmail,
//             password: $scope.signupPassword,
//             contacts: [] // Initialize an empty array for contacts
//         };

//         // Add the new user to the users array
//         $scope.users.push(user);
//         localStorage.setItem('users', JSON.stringify($scope.users));

//         // Reset signup form fields
//         $scope.signupUsername = '';
//         $scope.signupEmail = '';
//         $scope.signupPassword = '';

//         // Redirect to login page after signup
//         $window.location.href = 'index.html';
//     };

//     // Function to handle user login
//     $scope.login = function() {
//         var email = $scope.loginEmail;
//         var password = $scope.loginPassword;

//         // Find the user in the users array
//         var authenticatedUser = $scope.users.find(function(user) {
//             return user.email === email && user.password === password;
//         });

//         // If user is found, login successful
//         if (authenticatedUser) {
//             console.log("Login successful. Redirecting...");
//             // Store current user in local storage
//             $window.localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
//             // Redirect to contact list page
//             $window.location.href = 'test.html';
//         } else {
//             // If user is not found, login failed
//             console.log("Login failed. Invalid email or password.");
//             alert("Invalid email or password");
//         }

//         // Reset login form fields
//         $scope.loginEmail = '';
//         $scope.loginPassword = '';
//     };

//     // Retrieve current user from local storage
//     $scope.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));

//     // Ensure currentUser contains contacts array
//     if ($scope.currentUser && $scope.currentUser.contacts) {
//         $scope.contacts = $scope.currentUser.contacts; // Populate contacts list with current user's contacts
//     } else {
//         $scope.contacts = []; // If currentUser or contacts array is missing, initialize an empty array
//     }

//     // Function to handle user logout
//     $scope.logout = function() {
//         // Clear the currently logged in user from local storage
//         $window.localStorage.removeItem('currentUser');
//         // Redirect to login page
//         $window.location.href = 'index.html';
//     };

//     // Function to show signup form
//     $scope.showSignUp = function() {
//         $scope.showLoginForm = false;
//         $scope.showSignUpForm = true;
//     };

//     // Function to show login form
//     $scope.showSignIn = function() {
//         $scope.showSignUpForm = false;
//         $scope.showLoginForm = true;
//     };
// });
