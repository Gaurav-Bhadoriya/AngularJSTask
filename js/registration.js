var contactApplication = angular.module("contactApplication", ["ngRoute"]);
// Configure routing
contactApplication.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider) {
    var onlyLoggedIn = function ($location, $q) {
      var deferred = $q.defer();
      console.log(
        "localStorage.getItem('loggedInUser') ",
        localStorage.getItem("loggedInUser")
      );
      if (localStorage.getItem("loggedInUser") === "true") {
        deferred.resolve();
      } else {
        deferred.reject();
        $location.url("/home"); // Redirect to login page
      }
      return deferred.promise;
    };

    var alreadyLoggedIn = function ($location, $q) {
      var deferred = $q.defer();
      console.log(
        "localStorage.getItem('loggedInUser') ",
        localStorage.getItem("loggedInUser")
      );
      if (localStorage.getItem("loggedInUser") === "true") {
        deferred.reject();
        $location.url("/listing");
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    };
    $routeProvider
      .when("/index", {
        templateUrl: "home.html",
        controller: "authController",
        resolve: { loggnUser: alreadyLoggedIn },
      })
      .when("/listing", {
        templateUrl: "listing.html",
        controller: "crudController",
        resolve: {
          loggnUser: onlyLoggedIn, // Resolve function to check if user is logged in
        },
      })
      .otherwise({
        redirectTo: "/index", // Redirect to login page if route not found
      });
  },
]);

contactApplication.run([
  "$rootScope",
  function ($rootScope) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      console.log("Route change detected:");
      console.log("From:", current);
      console.log("To:", next);
    });
  },
]);

// Authentication Controller
contactApplication.controller(
  "authController",
  function ($scope, $window, $location) {
    // Initialize scope variables
    $scope.showLoginForm = true;
    $scope.showSignUpForm = false;
    $scope.users = JSON.parse(localStorage.getItem("users")) || [];
    $scope.loggedInUser = null;

    $scope.isContactsEmpty = function () {
      return $scope.contacts.length === 0;
    };

    // Inside the authController
    $scope.signup = function () {
      var existingUser = $scope.users.find(function (user) {
        return user.email === $scope.signupEmail;
      });

      if (existingUser) {
        $scope.emailExists = true;
        return; // Exit the function if email already exists
      } else {
        $scope.emailExists = false;
      }

      existingUser = $scope.users.find(function (user) {
        return user.username === $scope.signupUsername;
      });

      if (existingUser) {
        $scope.usernameExists = true;
        return; // Exit the function if username already exists
      } else {
        $scope.usernameExists = false;
      }

      var user = {
        username: $scope.signupUsername,
        email: $scope.signupEmail,
        password: $scope.signupPassword,
        contacts: [], // Initialize an empty array for contacts
      };

      $scope.users.push(user);
      localStorage.setItem("users", JSON.stringify($scope.users));

      console.log("Sign Up Success");
      $scope.signupUsername = "";
      $scope.signupEmail = "";
      $scope.signupPassword = "";
      $window.location.href = "index.html"; // Redirect to login page after signup
    };

    // Inside the authController
    $scope.login = function () {
      var email = $scope.loginEmail;
      var password = $scope.loginPassword;

      // Retrieve user data from localStorage
      var users = JSON.parse(localStorage.getItem("users")) || [];
      console.log("Retrieved User Data:", users); // Log retrieved user data
      var authenticatedUser = null;

      // Find user by email and password
      authenticatedUser = users.find(function (user) {
        return user.email === email && user.password === password;
      });

      if (authenticatedUser) {
        console.log("Login successful. Redirecting...");
        $window.localStorage.setItem(
          "currentUser",
          JSON.stringify(authenticatedUser)
        ); // Store current user in local storage

        // Set loggedInUser status to true
        localStorage.setItem("loggedInUser", "true");

        $scope.contacts = authenticatedUser.contacts || []; // Populate contacts list with current user's contacts

        // Display message if there are no contacts
        if ($scope.isContactsEmpty()) {
          $scope.noContactsMessage = "You don't have any contacts yet.";
        } else {
          $scope.noContactsMessage = ""; // Clear the message if contacts exist
        }
        $location.path("/listing"); // Redirect to contact list page
      } else {
        console.log("Login failed. Invalid email or password.");
        // Display an error message to the user
        $scope.loginError = "Invalid email or password. Please try again.";
      }
    };

    $scope.currentUser = JSON.parse(
      $window.localStorage.getItem("currentUser")
    );
    // Ensure currentUser contains contacts array
    if ($scope.currentUser && $scope.currentUser.contacts) {
      $scope.contacts = $scope.currentUser.contacts; // Populate contacts list with current user's contacts
    } else {
      $scope.contacts = []; // If currentUser or contacts array is missing, initialize an empty array
    }

    // Function to show signup form
    $scope.showSignUp = function () {
      $scope.showLoginForm = false;
      $scope.showSignUpForm = true;
    };
    // Function to show login form
    $scope.showSignIn = function () {
      $scope.showSignUpForm = false;
      $scope.showLoginForm = true;
    };
  }
);
