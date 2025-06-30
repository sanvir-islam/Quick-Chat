import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";
import { toast } from "react-toastify";

const errorMessages = {
  // Sign-Up Errors
  "auth/email-already-in-use": "The email address is already in use by another account.",
  "auth/user-disabled": "This user account has been disabled.",
  "auth/too-many-requests": "Too many unsuccessful attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Please check your internet connection.",

  // Sign-In Errors
  "auth/user-not-found": "No user found with this email address.",
  "auth/invalid-credential": "The provided credential is invalid.",
};
export async function signUpUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(errorMessages[error.code] || "An unexpected error occurred. Please try again later.");
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
    throw new Error(error.message || "An error occurred while sending the verification email.");
  }
}

export async function signInUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error(errorMessages[error.code] || "An unexpected error occurred. Please try again later.");
  }
}
