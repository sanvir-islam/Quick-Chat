import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  // signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase.config";
import { toast } from "react-toastify";

function authErrorMessage(errorCode) {
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

  return errorMessages[errorCode] || "An unexpected error occurred. Please try again later.";
}

export async function signUpUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(authErrorMessage(error.code));
  }
}
export async function signInUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error(authErrorMessage(error.code));
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
export async function forgotPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(
      authErrorMessage(error.code) || "An error occurred while sending the reset password email. Try again later"
    );
  }
}

// export async function signInWithGoogle() {
//   try {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);

//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     // const token = credential.accessToken;

//     // The signed-in user info.
//     // const user = result.user;

//     return credential;
//   } catch (error) {
//     // Log the error and provide a user-friendly message
//     const errorMessage = authErrorMessage(error.code);
//     console.error("Error during Google sign-in:", error);
//     throw new Error(errorMessage);
//   }
// }
