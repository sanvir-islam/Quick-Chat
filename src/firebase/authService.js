import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "./firebase.config";
import { toast } from "react-toastify";

export async function signUpUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the user object
  } catch (error) {
    //*Locally handles email and password validation
    const errorMessages = {
      "auth/email-already-in-use": "The email address is already in use by another account.",
      //   "auth/invalid-email": "The email address is not valid.",
      //   "auth/weak-password": "Password should be at least 6 characters long.",
    };

    const errorMessage = errorMessages[error.code] || "An unexpected error occurred. Please try again later.";

    throw new Error(errorMessage); // Propagate the error using throw
  }
}

export async function emailVerification() {
  try {
    if (!auth.currentUser) throw new Error("No user is currently authenticated.");
    await sendEmailVerification(auth.currentUser);

    setTimeout(() => {
      toast.info("Verification email sent to:  " + auth.currentUser.email);
    }, 1000);
  } catch (error) {
    // Throwing a more descriptive error message
    throw new Error(error.message || "An error occurred while sending the verification email.");
  }
}
