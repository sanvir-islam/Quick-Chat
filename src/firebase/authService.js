import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";

export default async function signUpUser(email, password) {
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
