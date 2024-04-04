contactApplication.directive('contactCard', function() {
    return {
        restrict: 'E',
        scope: {
            contact: '=' // Two-way binding to the contact object
        },
        template: `
                        <div class="contact-card" ng-dblclick="openPopup(contact)">
                            <img ng-src="{{ contact.image }}" alt="Contact Image" />
                            <p>Name: {{ contact.name }}</p>
                            <p>Email: {{ contact.email }}</p>
                            <p>Phone: {{ contact.phone }}</p>
                            <button class="btn btn-primary" ng-click="openEditModal(contact)">
                                 Edit
                             </button>
                             <button class="btn btn-danger" ng-click="deleteContact(contact)">
                                 Delete
                             </button>    
                        </div>
                    `,
        link: function(scope, element, attrs) {
            scope.openPopup = function(contact) {
                // Emit an event to notify the controller that popup should be opened
                scope.$emit('openPopup', contact);
            };
            scope.openEditModal = function(contact) {
                // Emit an event to notify the controller that edit modal should be opened
                scope.$emit('openEditModal', contact);
            };

            scope.deleteContact = function(contact) {
                // Emit an event to notify the controller that contact should be deleted
                scope.$emit('deleteContact', contact);
            };
        }
    };
});

contactApplication.controller('crudController', function($scope, $window) {
        // Initialize or retrieve contacts associated with the current user
         var usersData = JSON.parse(localStorage.getItem('usersData')) || {};
         // Retrieve or initialize contacts for the current user
         var currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;
        var currentUser = usersData[currentUserEmail] || { contacts: [] };
        $scope.contacts = currentUser.contacts;

        function saveUserData() {
                    usersData[currentUserEmail] = currentUser;
                    localStorage.setItem('usersData', JSON.stringify(usersData));
                }

                function saveContacts() {
                    saveUserData();
                }
        // Function to generate unique IDs for contacts
        function generateUniqueId() {
            return '_' + Math.random().toString(36).substr(2, 9);
        } 
            $scope.addContact = function() {
            // Initialize newContact object
            $scope.newContact = $scope.newContact || {};

            // Handle image data
            if ($scope.newContact.imageData) {
                $scope.newContact.image = $scope.newContact.imageData; // Assign image data to 'image' property
            }
            // Generate a unique ID for the new contact
            $scope.newContact.id = generateUniqueId();
            // Push the new contact to the contacts array and save to localStorage
            $scope.contacts.push($scope.newContact);
            saveContacts();
            // Clear the newContact object and hide the modal
            $scope.newContact = {};
            $('#addEmployeeModal').modal('hide');
        };

        // Function to handle updating a contact
        $scope.updateContact = function() {
            // Check if the selected contact is defined and has image data
            if ($scope.selectedContact && $scope.selectedContact.imageData) {
                // Update the image with the new image data
                $scope.selectedContact.image = $scope.selectedContact.imageData;
                // Remove the image data property as it's no longer needed
                delete $scope.selectedContact.imageData;
            }
            var index = $scope.contacts.findIndex(function(contact) {
                return contact.id === $scope.selectedContact.id;
            });
            if (index !== -1) {
                // Update contact details
                $scope.contacts[index] = $scope.selectedContact;
                saveContacts();
                $('#editEmployeeModal').modal('hide');
               // $('#contactPopup').modal('hide'); 
            }
        };

    
    //  Function to handle deleting a contact
        $scope.deleteContact = function(contact) {
            var index = $scope.contacts.indexOf(contact);
            if (index !== -1) {
                $scope.contacts.splice(index, 1);
                saveContacts();
                $('#deleteEmployeeModal').modal('hide');
            }
        };
    
        // Function to open the edit modal and prepare the selected contact
        $scope.openEditModal = function(contact) {
            $scope.selectedContact = angular.copy(contact);
            $('#editEmployeeModal').modal('show');
        };
    
        // Function to open the delete modal and prepare the selected contact
        $scope.openDeleteModal = function(contact) {
            $scope.selectedContact = contact;
            $('#deleteEmployeeModal').modal('show');
        };
    
        $scope.$on('openEditModal', function(event, contact) {
            $scope.openEditModal(contact);
        });
    
        // Listen for the event to delete contact
        $scope.$on('deleteContact', function(event, contact) {
            $scope.deleteContact(contact);
        });

        $scope.$on('openPopup', function(event, contact) {
            $scope.selectedContact = contact; // Store the selected contact
            $('#contactPopup').modal('show'); // Show the popup
        });

        // Function to handle setting file for image upload
        $scope.setFile = function(element) {
            $scope.currentFile = element.files[0];
            console.log("File selected:", $scope.currentFile);
    
            var reader = new FileReader();
            reader.onload = function(event) {
                if ($scope.selectedContact) {
                    // Ensure that $scope.selectedContact is initialized
                    $scope.selectedContact = $scope.selectedContact || {};
                    // Set the image data property on the selected contact
                    $scope.selectedContact.imageData = event.target.result;
                } else {
                    // Set the image data property on the new contact
                    $scope.newContact.imageData = event.target.result;
                }
                $scope.$apply();
            };
            reader.readAsDataURL(element.files[0]);
        };

        $scope.importData = function() {
            var fileInput = document.getElementById('importFile');
            var file = fileInput.files[0];
            var reader = new FileReader();
        
            reader.onload = function(event) {
                var data = event.target.result;
                var workbook = XLSX.read(data, { type: 'binary' });
                var sheetName = workbook.SheetNames[0];
                var sheet = workbook.Sheets[sheetName];
                var importedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                importedData.forEach(function(contactArray) {
                    var newContact = {
                        name: contactArray[0],
                        email: contactArray[1],
                        phone: contactArray[2],
                    };
                    // Add the new contact to the contacts array
                    $scope.contacts.push(newContact);
                });
                // Save the updated data to localStorage
                saveContacts();
                // Refresh the view
                $scope.$apply();
            };
           reader.readAsBinaryString(file);
        };

        $scope.exportData = function() {
            var data = [];
            var headers = ['Name', 'Email', 'Phone']; 
            data.push(headers);
            $scope.contacts.forEach(function(contact) {
                var contactData = [
                    contact.name,
                    contact.email,
                    contact.phone
                ];
                data.push(contactData);
            });
            var ws = XLSX.utils.aoa_to_sheet(data);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Contacts');
            var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
            saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'contacts.xlsx');
        };  
    });

    