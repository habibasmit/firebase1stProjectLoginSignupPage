import { auth, getAuth, signInWithEmailAndPassword } from "/FIREBASE/fireBase.js";

let signInEmail = document.querySelector("#signInEmail");
let signInPassword = document.querySelector("#signInPassword");
let signInButton = document.querySelector("#signInButton");

signInButton.addEventListener("click", async () => {
  let auth = getAuth();
  
  let email = signInEmail.value;
  let password = signInPassword.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed in:", user);
    
    // Show success alert and wait for the user to click "Ok"
    await Swal.fire({
      icon: 'success',
      title: 'Sign In Successful',
      text: 'You have successfully signed in!',
    });

    // Redirect after the user clicks "OK"
    location.href = "/kanban.html"; 
  } catch (error) {
    const errorCode = error.code;

    // Show SweetAlert based on the error
    if (errorCode === "auth/invalid-credential") {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Credentials',
        text: 'There is no account with this email or the password is incorrect. Please try again.'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Sign In Failed',
        text: 'An unexpected error occurred. Please try again.'
      });
    }
  }
});
