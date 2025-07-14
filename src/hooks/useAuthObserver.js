import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setUserInfo } from "../slice/userSlice";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const useAuthObserver = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload(); // Ensure we get the most up-to-date user data
        dispatch(setUserInfo(user)); // Dispatch updated user info to Redux
      } else {
        dispatch(logout()); // Clear user data from Redux if not authenticated
      }
    });

    return () => unsubscribe(); // Clean up observer on component unmount
  }, [dispatch]); // Runs once on component mount
};

export default useAuthObserver;
