var contactApplication = angular.module('contactApplication', []);

// Authentication Controller
contactApplication.controller('authController', function($scope, $window) {
    // Initialize scope variables
    $scope.showLoginForm = true;
    $scope.showSignUpForm = false;
    $scope.users = JSON.parse(localStorage.getItem('users')) || [];
    $scope.loggedInUser = null;

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
    $window.location.href = 'index.html';
};
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
