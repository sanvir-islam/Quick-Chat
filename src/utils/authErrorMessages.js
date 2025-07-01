export default function authErrorMessage(errorCode) {
  const errorMessages = {
    // Sign-Up Errors
    "auth/email-already-in-use": "This email is already registered. Use a different one.",
    "auth/user-disabled": "Your account is disabled. Contact support.",
    "auth/too-many-requests": "Too many attempts. Try again in a few minutes.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",

    // Sign-In Errors
    "auth/user-not-found": "No account with this email. Check or sign up.",
    "auth/invalid-credential": "Invalid credentials. Please check your details.",

    // Google Popup Errors
    "auth/cancelled-popup-request": "Sign-in was cancelled. Please try again.",
    "auth/popup-closed-by-user": "Popup closed before sign-in completed.",
    "auth/timeout": "Sign-in timed out. Try again.",
    "auth/internal-error": "Internal error. Please try again later.",

    //signout
    "auth/no-current-user": "No user is currently signed in.",
  };

  return errorMessages[errorCode] || "An unexpected error occurred. Please try again later.";
}
