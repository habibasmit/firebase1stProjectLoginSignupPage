import {
  getAuth,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "./FIREBASE/fireBase.js";

const auth = getAuth();
const logOutBtn = document.querySelector("#logOutBtn");
const profilePage = document.querySelector("#profile-page");
const sendVerificationBtn = document.querySelector("#sendVerificationBtn"); 
const deleteProfileBtn = document.querySelector("#deleteProfileBtn"); // Button for deleting profile

// Log Out Functionality
logOutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have successfully logged out.",
      }).then(() => {
        location.href = "./Sign In/signIn.html";
      });
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred while logging out. Please try again.",
      });
    });
});

// Check if user is logged in when the auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    updateAndShowProfile(user);
  } else {
    profilePage.innerHTML = `<p style="color: gray;">You are not logged in.</p>`;
  }
});

// Function to update the profile and display it in the #profile-page div
function updateAndShowProfile(user) {
  const newName = "User Name"; 
  const newPhotoURL = ""; 

  updateProfile(user, {
    displayName: newName,
    photoURL: newPhotoURL,
  })
    .then(() => {
      profilePage.innerHTML = `
          <h2>Profile Updated</h2>
           <img src="${user.photoURL ? user.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Z25aOD1KWgPXJyUdl0BTf_3du8oqoe0FOw&s'}" alt="Profile Picture"/>
          <p><strong>Name:</strong> ${user.displayName}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Email Verification </strong>: <span id="verification-status">No</span></p>
        `;

      // Attach event listener for send verification button
      sendVerificationBtn.addEventListener("click", () => {
        sendEmailVerification(user)
          .then(() => {
            document.getElementById("verification-status").innerText = "Yes"; 

            Swal.fire({
              icon: "info",
              title: "Verification Email Sent",
              text: "Please check your email to verify your account.",
            });
          })
          .catch(() => {
            document.getElementById("verification-status").innerText = "No"; 
          });
      });

      // Attach event listener for delete profile button
      deleteProfileBtn.addEventListener("click", () => {
        Swal.fire({
          title: 'Confirm Profile Deletion',
          text: "Please enter your password to confirm deletion:",
          input: 'password',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          inputValidator: (value) => {
            return !value && 'You need to enter your password!';
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const userPassword = result.value; 

            const credential = EmailAuthProvider.credential(user.email, userPassword);
            reauthenticateWithCredential(user, credential)
              .then(() => {
                
                deleteUser(user)
                  .then(() => {
                    Swal.fire({
                      icon: "success",
                      title: "Profile Deleted",
                      text: "Your profile has been successfully deleted.",
                    }).then(() => {
                      signOut(auth); // Sign out after deletion
                      location.href = "./Sign In/signIn.html"; // Redirect to sign-in page
                    });
                  })
                  .catch((error) => {
                    Swal.fire({
                      icon: "error",
                      title: "Deletion Failed",
                      text: `An error occurred: ${error.message}`,
                    });
                  });
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Reauthentication Failed",
                  text: `Please check your password and try again: ${error.message}`,
                });
              });
          } else if (result.isDismissed) {
            Swal.fire({
              icon: "info",
              title: "Operation Cancelled",
              text: "Profile deletion cancelled.",
            });
          }
        });
      });
    })
    .catch((error) => {
      profilePage.innerHTML = `<p style="color: red;">Failed to update profile: ${error.message}</p>`;
      console.error("Error updating profile:", error);
    });
}
