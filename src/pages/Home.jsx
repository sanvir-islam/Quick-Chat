import { useEffect, useState } from "react";
import HomeSkeleton from "../components/landing/HomeSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../firebase/authService";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Sidebar from "../components/landing/Sidebar";
import { logout } from "../slice/userSlice";
import useAuthObserver from "../hooks/useAuthObserver";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.value);

  const [verify, setVerify] = useState(false);

  useAuthObserver();
  useEffect(() => {
    if (userInfo) {
      if (userInfo.emailVerified) {
        setVerify(true);
      } else navigate("/emailVerification");
    } else {
      navigate("/login");
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await logoutUser();
      dispatch(logout()); //clear the store
      toast.success("You have been logged out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      {verify ? (
        <div className="flex justify-center h-screen p-[35px]">
          <div className="w-[186px] h-full ">
            <Sidebar handleSignOut={handleSignOut} />
          </div>
          <div className="w-[427px]" onClick={() => setVerify(false)}>
            adsgfasdf
          </div>
          <div className="w-[344px]">adsgfasdf</div>
          <div className="w-[344px]">adsgfasdf</div>
        </div>
      ) : (
        <HomeSkeleton />
      )}
    </div>
  );
}

export default Home;
