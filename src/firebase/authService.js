import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase.config";
import { toast } from "react-toastify";
import authErrorMessage from "../utils/authErrorMessages";

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
    return userCredential.user;
  } catch (error) {
    throw new Error(authErrorMessage(error.code));
  }
}

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
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
    throw new Error(authErrorMessage(error.code) || "An error occurred while sending the verification email.");
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

// export function authObserver(callback) {
//   return onAuthStateChanged(auth, (user) => {
//     if (user) {
//       callback(null, user);
//     } else {
//       callback("No user is signed in.", null);
//     }
//   });
// }

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(
      authErrorMessage(error.code) || "An error occurred while sending the reset password email. Try again later"
    );
  }
}
