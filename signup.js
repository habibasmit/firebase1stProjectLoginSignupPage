// Import Firebase authentication functions
import {
  auth,
  getAuth,
  createUserWithEmailAndPassword,
} from "./FIREBASE/fireBase.js";

// Select email, password inputs, and sign-up button
let email = document.querySelector("#SignUpEmail");
let password = document.querySelector("#signUpPassword");
let signUpBtn = document.querySelector("#signUpBtn");

// Add click event to sign-up button
signUpBtn.addEventListener("click", () => {
  // Get values from email and password fields
  let emailValue = email.value;
  let passwordValue = password.value;

  // Check if email format is valid
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailValue)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.'
    });
    return; // Stop if email is invalid
  }

  // Check if password has minimum 6 characters
  if (passwordValue.length < 6) {
    Swal.fire({
      icon: "error",
      title: "Weak Password",
      text: "Password should be at least 6 characters long."
    });
    return; // Stop if password is weak
  }

  // Create user in Firebase with email and password
  createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      // Show success alert if sign-up is successful
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User signed up successfully!'
      });
      // Clear input fields
      email.value = "";
      password.value = "";
    })
    .catch((error) => {
      const errorCode = error.code;

      // Show specific alerts for Firebase errors
      if (errorCode === "auth/email-already-in-use") {
        Swal.fire({
          icon: 'error',
          title: 'Email In Use',
          text: 'This email is already in use. Please use a different email.'
        });
      } else if (errorCode === "auth/invalid-email") {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Email',
          text: 'The email address is not valid. Please enter a valid email.'
        });
      } else if (errorCode === "auth/weak-password") {
        Swal.fire({
          icon: 'error',
          title: 'Weak Password',
          text: 'The password is too weak. Please choose a stronger password.'
        });
      } else {
        // error for other issues
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      }
    });
});
