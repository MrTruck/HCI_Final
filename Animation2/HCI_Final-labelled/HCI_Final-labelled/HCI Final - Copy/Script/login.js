import { auth, database } from 'Script/firebase.js'; // Correct path
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

function register() {
    // Get all input fields
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let full_name = document.getElementById('full_name').value; // Assuming there's a full name input field

    // Validate fields
    if (!validate_field(email) || !validate_field(password)) {
        alert('Please fill out all fields.');
        return;
    }

    if (!validate_email(email)) {
        alert('Invalid email format.');
        return;
    }

    if (!validate_password(password)) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then(function (userCredential) {
            var user = userCredential.user; // Get the user object

            // Add this user to Firebase Realtime Database
            var database_ref = database.ref();
            var user_data = {
                email: email,
                full_name: full_name,
                last_login: Date.now()
            };

            // Save user data to database under the user's UID
            database_ref.child('users/' + user.uid).set(user_data)
                .then(() => {
                    console.log('User data saved successfully');
                })
                .catch((error) => {
                    console.error('Error saving user data: ', error);
                });
            
            alert('user created')
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Error creating user: ', errorCode, errorMessage);
            alert('Error creating user: ' + errorMessage);
        });
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field != null && field !== '';
}

function validate_email(email) {
    const expression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return expression.test(email);
}
