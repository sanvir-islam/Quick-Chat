import { useEffect, useState } from "react";
import HomeSkeleton from "../components/landing/HomeSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../firebase/services/authService";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Sidebar from "../components/landing/Sidebar";
import { logout } from "../slice/userSlice";
import useAuthObserver from "../hooks/useAuthObserver";
import UserList from "../components/UserList/UserList";
import FriendList from "../components/FriendList/FriendList";
import FriendRequest from "../components/FriendRequest/FriendRequest";
import GroupList from "../components/GroupList/GroupList";
import SearchBar from "../components/SearchBar/SearchBar";
import MyGroups from "../components/MyGroups/MyGroups";
import BlockedUsers from "../components/BlockedUsers/BlockedUsers";

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
      dispatch(logout());
      navigate("/login");
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await logoutUser();
      dispatch(logout()); //clear the store
      navigate("/login");
      toast.success("You have been logged out successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      {verify ? (
        <div className="flex justify-center h-screen p-[35px] gap-[20px]">
          <div className="w-[186px] h-full mr-[23px]">
            <Sidebar handleSignOut={handleSignOut} activeSection="home" />
          </div>
          <div className="relative flex justify-center h-full gap-[20px]">
            <div className="w-[427px]">
              <SearchBar />
              <GroupList />
              <FriendRequest />
            </div>
            <div className="w-[344px]">
              <FriendList />
              <MyGroups />
            </div>
            <div className="w-[344px]">
              <UserList />
              <BlockedUsers />
            </div>
          </div>
        </div>
      ) : (
        <HomeSkeleton />
      )}
    </div>
  );
}

export default Home;
